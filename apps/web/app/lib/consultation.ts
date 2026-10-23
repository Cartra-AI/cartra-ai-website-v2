export const REVENUE_OPTIONS = [
  "Under $1M",
  "$1M–$5M",
  "$5M–$20M",
  "$20M–$100M",
  "$100M–$200M",
  "$200M–$500M",
  "$500M–$1B",
  "$1B+",
] as const;

export const ROLE_OPTIONS = [
  "Owner / Founder",
  "CEO",
  "Other C-suite executive",
  "Vice President",
  "Director",
  "Manager",
  "Individual contributor",
  "Other",
] as const;

export const NEEDS_MAX_LENGTH = 2000;

export const CONSULTATION_FIELDS = [
  { name: "name", label: "Your name", autoComplete: "name", maxLength: 100 },
  { name: "email", label: "Email", autoComplete: "email", maxLength: 254 },
  {
    name: "role",
    label: "Your role",
    autoComplete: "organization-title",
    maxLength: 150,
  },
  {
    name: "company",
    label: "Company name",
    autoComplete: "organization",
    maxLength: 200,
  },
] as const;

export function validEmail(value: string) {
  if (value.length > 254 || value !== value.trim()) return false;
  const parts = value.split("@");
  if (parts.length !== 2) return false;
  const [local, domain] = parts as [string, string];
  if (
    !local ||
    local.length > 64 ||
    !/^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+$/i.test(local) ||
    local.startsWith(".") ||
    local.endsWith(".") ||
    local.includes("..")
  )
    return false;
  const labels = domain.split(".");
  return (
    labels.length >= 2 &&
    labels.every((label) =>
      /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/i.test(label),
    ) &&
    /^[a-z]{2,63}$/i.test(labels.at(-1)!)
  );
}

// Personal addresses (Gmail, Yahoo, iCloud...) are welcome: many owners of
// smaller businesses use one. This is a syntax check, not mailbox verification.
export function emailAddressError(value: string) {
  const email = value.trim();
  if (!email) return "Enter your email.";
  if (!validEmail(email))
    return "Enter a valid email address, such as you@company.com.";
  return "";
}

/** Page a request was sent from (e.g. "/agent-systems"), for lead attribution. Anything unexpected is dropped. */
export function parseSourcePage(value: unknown) {
  return typeof value === "string" && /^\/[A-Za-z0-9/_-]{0,80}$/.test(value)
    ? value
    : "";
}

export function parseConsultation(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const input = value as Record<string, unknown>;
  const needs = input.needs ?? "";
  if (
    typeof needs !== "string" ||
    needs.length > NEEDS_MAX_LENGTH ||
    Array.from(needs).some((char) => {
      const code = char.charCodeAt(0);
      return (code < 32 && ![9, 10, 13].includes(code)) || code === 127;
    })
  )
    return null;
  const fields: Record<string, string> = {};
  for (const { name, maxLength } of CONSULTATION_FIELDS) {
    const field = input[name];
    if (
      typeof field !== "string" ||
      !field.trim() ||
      field.length > maxLength ||
      Array.from(field).some(
        (char) => char.charCodeAt(0) < 32 || char.charCodeAt(0) === 127,
      )
    )
      return null;
    fields[name] = field.trim();
  }
  if (
    emailAddressError(fields.email!) ||
    !ROLE_OPTIONS.includes(fields.role as (typeof ROLE_OPTIONS)[number]) ||
    !REVENUE_OPTIONS.includes(input.revenue as (typeof REVENUE_OPTIONS)[number])
  )
    return null;
  return {
    name: fields.name!,
    email: fields.email!,
    role: fields.role!,
    company: fields.company!,
    revenue: input.revenue as string,
    needs: needs.trim(),
  };
}
