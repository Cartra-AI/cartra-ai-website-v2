import { DATA_OWNERSHIP, type ProductLogo } from './products';
import {
  FREIGHT_QUOTING,
  FREIGHT_TRIAGE,
  INSURANCE_AGENCY,
  KOREAN_SPA,
  MED_SPA,
  SUPPLEMENT_MAKER,
  type CaseStudy,
} from './case-studies';

/*
 * Industry landing pages (/industries/[slug]) and the homepage industry cards.
 *
 * One template, one record per industry. Use cases describe workflows only,
 * with no figures; `caseStudies` only ever lists real Cartra clients
 * (case-studies.ts), and industries without a client yet (real estate) show
 * no case studies section.
 */

export type IndustryUseCase = {
  /** Small label above the title: the team or workflow area. */
  area: string;
  title: string;
  body: string;
  /** Three short lines on what the agent does. */
  does: [string, string, string];
};

export type Industry = {
  slug: string;
  name: string;
  /** Homepage card and hero photo in public/industries/. */
  photo: string;
  /** CSS object-position for the photo crop. */
  focus?: string;
  seoTitle: string;
  seoDescription: string;
  /** Rendered two-tone: [ink, muted]. */
  headline: [string, string];
  lede: string;
  useCases: IndustryUseCase[];
  systems: ProductLogo[];
  /** Real client case studies only (case-studies.ts). */
  caseStudies: CaseStudy[];
  faqs: Array<{ q: string; a: string }>;
};

const L = {
  booker: { slug: 'booker', name: 'Booker', wordmark: true },
  box: { slug: 'box', name: 'Box', wordmark: true },
  caldotcom: { slug: 'caldotcom', name: 'Cal.com', ext: 'png' },
  calendly: { slug: 'calendly', name: 'Calendly' },
  cargowise: { slug: 'cargowise', name: 'CargoWise', wordmark: true },
  descartes: { slug: 'descartes', name: 'Descartes', ext: 'png', wordmark: true },
  confluence: { slug: 'confluence', name: 'Confluence' },
  dialpad: { slug: 'dialpad', name: 'Dialpad', wordmark: true },
  efreight: { slug: 'efreight', name: 'E-Freight', ext: 'png' },
  gmail: { slug: 'gmail', name: 'Gmail' },
  googlecalendar: { slug: 'googlecalendar', name: 'Google Calendar' },
  googledrive: { slug: 'googledrive', name: 'Google Drive' },
  hawksoft: { slug: 'hawksoft', name: 'HawkSoft' },
  hubspot: { slug: 'hubspot', name: 'HubSpot' },
  magaya: { slug: 'magaya', name: 'Magaya', ext: 'png', wordmark: true },
  mcleod: { slug: 'mcleod', name: 'McLeod', ext: 'png' },
  outlook: { slug: 'microsoftoutlook', name: 'Microsoft Outlook' },
  sharepoint: { slug: 'microsoftsharepoint', name: 'Microsoft SharePoint' },
  teams: { slug: 'microsoftteams', name: 'Microsoft Teams' },
  mindbody: { slug: 'mindbody', name: 'Mindbody', wordmark: true },
  netsuite: { slug: 'netsuite', name: 'Oracle NetSuite', wordmark: true },
  notion: { slug: 'notion', name: 'Notion' },
  quickbooks: { slug: 'quickbooks', name: 'QuickBooks' },
  ringcentral: { slug: 'ringcentral', name: 'RingCentral' },
  salesforce: { slug: 'salesforce', name: 'Salesforce', wordmark: true },
  slack: { slug: 'slack', name: 'Slack' },
  square: { slug: 'square', name: 'Square' },
  twilio: { slug: 'twilio', name: 'Twilio' },
  wechat: { slug: 'wechat', name: 'WeChat' },
  whatsapp: { slug: 'whatsapp', name: 'WhatsApp' },
  zendesk: { slug: 'zendesk', name: 'Zendesk' },
  zoom: { slug: 'zoom', name: 'Zoom' },
} satisfies Record<string, ProductLogo>;

const OWNERSHIP_FAQ = { q: 'Who owns our data?', a: DATA_OWNERSHIP };

/* Shared answers. Security and mistakes only restate confirmed practices:
   isolated environment per customer, every action logged, never used to
   train models, corrections remembered. No prices are published. */
const COST_FAQ = {
  q: 'What does it cost?',
  a: 'It depends on the workflows and the volume. We scope it with you on a short call, agree on what success looks like, and give you a clear price before any build starts.',
};

const MISTAKES_FAQ = {
  q: 'What happens if an agent gets something wrong?',
  a: 'You set what an agent may do on its own, and anything outside those rules goes to a person. Every action is logged, and agents remember each correction, so the same mistake does not repeat.',
};

const SECURITY_FAQ = {
  q: 'How is our data kept secure?',
  a: 'Each customer runs in its own isolated environment, every action is logged, and your data is never used to train models. You decide which systems and data each agent can reach.',
};

export const INDUSTRIES: Industry[] = [
  {
    slug: 'logistics',
    name: 'Logistics & Freight',
    photo: 'logistics-port-ship.webp',
    seoTitle: 'AI Agents for Logistics and Freight Forwarding',
    seoDescription:
      'Custom AI agents for freight forwarders and logistics teams: quote rate requests by email, triage inboxes, keep shipments current in your TMS, and answer status calls.',
    headline: ['Quote faster, track every shipment,', 'and win more freight.'],
    lede: 'Freight runs on email, phone calls, and a dozen systems that never quite agree. We build AI agents that quote, triage, and update shipments inside the tools your team already uses, so your people spend their day on customers and carriers.',
    useCases: [
      {
        area: 'Sales',
        title: 'Rate requests quoted by email',
        body: 'Every quote request read, priced on your own rates and rules, and answered while the customer is still shopping.',
        does: ['Reads requests for ocean, air, and drayage', 'Prices on your rate sheets and margins', 'Replies to the customer automatically'],
      },
      {
        area: 'Operations',
        title: 'Shipments kept current in your TMS',
        body: 'Bookings, milestones, and changes from email and tracking data land in the TMS without anyone retyping them.',
        does: ['Creates shipments from booking emails', 'Updates milestones from tracking events', 'Flags exceptions to the right person'],
      },
      {
        area: 'Every team',
        title: 'Inboxes triaged against your SOPs',
        body: 'The messages that matter reach the right person first, sorted by the rules your company already follows.',
        does: ['Prioritizes every employee inbox', 'Routes by customer, lane, and urgency', 'Surfaces what needs a reply today'],
      },
      {
        area: 'Customer service',
        title: 'Status calls answered',
        body: 'Customers call to ask where their freight is. A voice agent checks the shipment and answers on the spot, day or night.',
        does: ['Looks up the shipment by reference', 'Gives ETAs and milestone updates', 'Hands off exceptions with a summary'],
      },
      {
        area: 'Operations',
        title: 'Carrier and driver follow-ups',
        body: 'Pickup confirmations, PODs, and delivery appointments chased by email and message until they come back.',
        does: ['Chases confirmations and PODs', 'Works over email, WhatsApp, and WeChat', 'Logs every reply on the shipment'],
      },
      {
        area: 'Every team',
        title: 'Rates, lanes, and SOPs on tap',
        body: 'New and senior staff get the same answer about rates, carrier rules, and procedures, with a link to the source.',
        does: ['Answers from your SOPs and rate files', 'Cites the document behind each answer', 'Stays current as files change'],
      },
    ],
    systems: [L.cargowise, L.magaya, L.descartes, L.mcleod, L.efreight, L.netsuite, L.quickbooks, L.outlook, L.gmail, L.teams, L.whatsapp, L.wechat],
    caseStudies: [FREIGHT_QUOTING, FREIGHT_TRIAGE],
    faqs: [
      {
        q: 'Does it work with our TMS?',
        a: 'Yes. We connect through its API where one exists, and where it does not, agents work in the system the way your team does, through the screens they already use.',
      },
      {
        q: 'Will customers know they are getting an automated quote?',
        a: 'You decide. Quotes go out in your format and voice, from your inbox, and anything outside your rules is held for a person to review before it is sent.',
      },
      {
        q: 'How fast can we start?',
        a: 'Most first workflows go live in about four weeks: we map how the work runs, build around it, test it on your real requests, then switch it on.',
      },
      {
        q: 'Can it handle messages from overseas partners on WhatsApp and WeChat?',
        a: 'Yes. Agents work across email, WhatsApp, and WeChat, so carrier and partner follow-ups happen in the channels your partners already use, and every reply is logged on the shipment.',
      },
      {
        q: 'Do we need to change how our team works?',
        a: 'No. We build around how your team already quotes, books, and tracks freight, inside the inbox and systems they use today.',
      },
      MISTAKES_FAQ,
      SECURITY_FAQ,
      COST_FAQ,
      OWNERSHIP_FAQ,
    ],
  },
  {
    slug: 'insurance-legal',
    name: 'Insurance & Legal',
    photo: 'insurance-facade.webp',
    seoTitle: 'AI Agents for Insurance Agencies and Law Firms',
    seoDescription:
      'Custom AI voice agents and AI teammates for insurance agencies and law firms: policy service calls, new-business quotes, certificate requests, intake, and firm knowledge.',
    headline: ['Every policy and client call answered,', 'with your people in the loop.'],
    lede: 'Agencies and firms live on the phone and in the inbox. We build agents that handle routine service, quoting, and intake the way your team does, and hand anything that needs a licensed professional to one, with a summary.',
    useCases: [
      {
        area: 'Policy service',
        title: 'Vehicle and driver changes by phone',
        body: 'Callers update vehicles and drivers on existing policies right on the call, and the change lands in your system.',
        does: ['Verifies the caller and policy', 'Makes the update in your system', 'Hands off to a CSR when needed'],
      },
      {
        area: 'New business',
        title: 'Quotes for new customers',
        body: 'New callers get quoted on the first call instead of waiting for a callback, with a licensed agent looped in to bind.',
        does: ['Collects underwriting details', 'Quotes on your carriers and rules', 'Books the follow-up with an agent'],
      },
      {
        area: 'Service',
        title: 'Certificate requests handled',
        body: 'Certificate of insurance requests from email and phone answered the same day, with the right holder details.',
        does: ['Finds the policy and coverage', 'Prepares the certificate', 'Sends it and logs the request'],
      },
      {
        area: 'Renewals',
        title: 'Renewal follow-ups that do not slip',
        body: 'Missing documents and signatures chased well before the renewal date, so nothing lapses for paperwork.',
        does: ['Tracks what each renewal still needs', 'Follows up by email and text', 'Escalates anything at risk'],
      },
      {
        area: 'Legal intake',
        title: 'New matter intake around the clock',
        body: 'Prospective clients reach someone at any hour. The agent gathers the details your intake team asks for and books the consultation.',
        does: ['Collects matter and party details', 'Screens against your intake criteria', 'Books the consultation'],
      },
      {
        area: 'Every team',
        title: 'Firm and agency knowledge on tap',
        body: 'Procedures, carrier guidelines, and past work answered in seconds, with a link to the document behind each answer.',
        does: ['Answers from your documents', 'Cites its sources', 'Respects who can see what'],
      },
    ],
    systems: [L.hawksoft, L.salesforce, L.ringcentral, L.dialpad, L.outlook, L.teams, L.sharepoint, L.box],
    caseStudies: [INSURANCE_AGENCY],
    faqs: [
      {
        q: 'Do licensed staff stay in control?',
        a: 'Yes. Anything that needs a licensed professional is handed to one with a full summary, and you set exactly which requests the agent may complete on its own.',
      },
      {
        q: 'Does it work with our agency management system?',
        a: 'We connect through its API where one exists, and otherwise agents work in it the way your CSRs do. HawkSoft and Salesforce are common starting points.',
      },
      {
        q: 'How fast can we start?',
        a: 'We usually start with one department. The agency above went live there, then expanded to three departments within two months.',
      },
      {
        q: 'Can callers always reach a person?',
        a: 'Yes. A caller can ask for a person at any point, and the agent hands the call over with a summary so your team does not start from scratch.',
      },
      {
        q: 'Does it work for law firms as well as agencies?',
        a: 'Yes. For firms we usually start with intake calls and firm knowledge; for agencies, with policy service and new-business calls. Either way we start with one workflow and expand from there.',
      },
      MISTAKES_FAQ,
      SECURITY_FAQ,
      COST_FAQ,
      OWNERSHIP_FAQ,
    ],
  },
  {
    slug: 'real-estate-construction',
    name: 'Real Estate & Construction',
    photo: 'real-estate-office.webp',
    seoTitle: 'AI Agents for Real Estate and Construction',
    seoDescription:
      'Custom AI agents for property managers, developers, and contractors: leasing calls, maintenance requests, lease questions, subcontractor paperwork, invoices, and project updates.',
    headline: ['Leasing, maintenance, and paperwork,', 'handled around the clock.'],
    lede: 'Properties and projects generate a constant stream of calls, requests, and documents. We build agents that answer, file, and follow up inside your systems, so your team can focus on tenants, owners, and the work on site.',
    useCases: [
      {
        area: 'Leasing',
        title: 'Prospect calls answered and tours booked',
        body: 'Every leasing call answered, questions about units and pricing handled, and tours booked straight into the calendar.',
        does: ['Answers unit and pricing questions', 'Qualifies on your criteria', 'Books the tour'],
      },
      {
        area: 'Property management',
        title: 'Maintenance requests turned into work orders',
        body: 'Tenants report issues by phone or email at any hour, and a work order is created with the details your team needs.',
        does: ['Takes the request and details', 'Creates the work order', 'Keeps the tenant updated'],
      },
      {
        area: 'Every team',
        title: 'Lease and policy questions answered',
        body: 'Staff ask about terms, clauses, and policies and get the answer with the document it came from.',
        does: ['Answers from leases and policies', 'Cites the clause it used', 'Stays current as documents change'],
      },
      {
        area: 'Construction',
        title: 'Subcontractor paperwork collected',
        body: 'Insurance certificates, licenses, and W-9s requested, checked, and chased before anyone sets foot on site.',
        does: ['Requests missing documents', 'Checks dates and limits', 'Flags expirations early'],
      },
      {
        area: 'Finance',
        title: 'Invoices matched to contracts',
        body: 'Vendor and subcontractor invoices checked against contracts and purchase orders before they reach approval.',
        does: ['Reads each invoice', 'Matches it to the contract or PO', 'Routes exceptions for review'],
      },
      {
        area: 'Projects',
        title: 'Owner updates written for you',
        body: 'Updates from email, chat, and site reports pulled into a clear weekly summary for owners and stakeholders.',
        does: ['Gathers updates across channels', 'Drafts the weekly report', 'Highlights risks and decisions'],
      },
    ],
    systems: [L.salesforce, L.hubspot, L.quickbooks, L.sharepoint, L.box, L.googledrive, L.outlook, L.teams],
    caseStudies: [],
    faqs: [
      {
        q: 'Does it work with our property management or project software?',
        a: 'We connect through its API where one exists, and otherwise agents work in it the way your team does, through the screens they already use.',
      },
      {
        q: 'Can tenants and prospects reach it after hours?',
        a: 'Yes. Voice agents answer 24/7, and anything urgent, like a burst pipe, is routed to your on-call person right away.',
      },
      {
        q: 'How fast can we start?',
        a: 'Most first workflows go live in about four weeks: we map how the work runs, build around it, test it on real requests, then switch it on.',
      },
      {
        q: 'Can it handle multiple properties or projects?',
        a: 'Yes. Agents are set up with each property’s or project’s details and policies, so callers and staff get the right answer for the right site.',
      },
      {
        q: 'Can it speak with tenants in other languages?',
        a: 'Yes. Voice agents speak 90+ languages, so tenants and prospects can call in the language they are most comfortable with.',
      },
      MISTAKES_FAQ,
      SECURITY_FAQ,
      COST_FAQ,
      OWNERSHIP_FAQ,
    ],
  },
  {
    slug: 'consumer-ecommerce',
    name: 'Consumer & E-Commerce',
    photo: 'consumer-checkout.webp',
    focus: 'center 52%',
    seoTitle: 'AI Agents for Consumer Brands and E-Commerce',
    seoDescription:
      'Custom AI agents for consumer brands and online retailers: order status, returns, product questions, wholesale orders, support triage, and on-brand content.',
    headline: ['Every order question answered,', 'every customer kept.'],
    lede: 'Growing brands drown in where-is-my-order emails, returns, and product questions. We build agents that answer from your own systems and knowledge, follow your policies, and leave your team the conversations that build loyalty.',
    useCases: [
      {
        area: 'Customer service',
        title: 'Order status, by phone, email, or chat',
        body: 'Customers asking where their order is get a real answer from your order and shipping data, at any hour.',
        does: ['Looks up the order and tracking', 'Answers in your brand voice', 'Escalates delivery problems'],
      },
      {
        area: 'Customer service',
        title: 'Returns and exchanges on policy',
        body: 'Returns handled the way your policy says, with labels issued and every system updated.',
        does: ['Checks eligibility against policy', 'Issues the label or exchange', 'Updates your systems'],
      },
      {
        area: 'Every team',
        title: 'Product questions answered from your knowledge',
        body: 'Ingredients, specs, sizing, and usage questions answered consistently, from one source of truth every team shares.',
        does: ['Answers from specs and policies', 'Cites the source document', 'Keeps service and marketing aligned'],
      },
      {
        area: 'Wholesale',
        title: 'B2B orders entered from email',
        body: 'Purchase orders from retailers and distributors read and entered into your ERP, with mismatches flagged.',
        does: ['Reads emailed and PDF orders', 'Enters them in your ERP', 'Flags price and quantity mismatches'],
      },
      {
        area: 'Support',
        title: 'Tickets triaged and drafted',
        body: 'Every ticket tagged, prioritized, and drafted with a reply, so your team reviews instead of starting from scratch.',
        does: ['Tags and prioritizes tickets', 'Drafts replies from your knowledge', 'Routes VIP and urgent cases'],
      },
      {
        area: 'Marketing',
        title: 'Content grounded in what you sell',
        body: 'Product copy, FAQs, and campaign research drafted from your actual product knowledge, not generic guesses.',
        does: ['Drafts from approved product facts', 'Keeps claims consistent', 'Cites where each fact came from'],
      },
    ],
    systems: [L.zendesk, L.hubspot, L.salesforce, L.netsuite, L.quickbooks, L.gmail, L.whatsapp, L.slack],
    caseStudies: [SUPPLEMENT_MAKER],
    faqs: [
      {
        q: 'Will it sound like our brand?',
        a: 'Yes. We configure tone, phrasing, and the answers it may give from your own guidelines and past replies, and you approve it before it goes live.',
      },
      {
        q: 'Does it work with our store and help desk?',
        a: 'We connect to your order, shipping, and help desk systems through their APIs, and work in their screens where no API exists.',
      },
      {
        q: 'How fast can we start?',
        a: 'Most first workflows go live in about four weeks: we map how the work runs, build around it, test it on real tickets, then switch it on.',
      },
      {
        q: 'What happens during busy seasons?',
        a: 'Agents answer a holiday rush the same way they answer a quiet Tuesday, so more orders do not have to mean longer waits for your customers.',
      },
      {
        q: 'Can it work across phone, email, and chat?',
        a: 'Yes. The same knowledge and policies power every channel, so customers get consistent answers whether they call, email, or chat.',
      },
      MISTAKES_FAQ,
      SECURITY_FAQ,
      COST_FAQ,
      OWNERSHIP_FAQ,
    ],
  },
  {
    slug: 'manufacturing-distribution',
    name: 'Manufacturing & Distribution',
    photo: 'manufacturing-conveyor.webp',
    seoTitle: 'AI Agents for Manufacturers and Distributors',
    seoDescription:
      'Custom AI agents for manufacturers and distributors: order entry from email, quotes, order status calls, supplier follow-ups, invoice matching, and shared company knowledge.',
    headline: ['Orders entered, quotes sent,', 'and suppliers kept on schedule.'],
    lede: 'Orders arrive as emails and PDFs, customers call for status, and know-how lives in a few people’s heads. We build agents that handle the routine work inside your ERP and inbox, and put your company’s knowledge in everyone’s reach.',
    useCases: [
      {
        area: 'Order desk',
        title: 'Orders entered from email and PDF',
        body: 'Purchase orders read and keyed into your ERP line by line, matched to quotes, with anything unusual sent to a person.',
        does: ['Reads emailed and PDF POs', 'Enters and matches them in your ERP', 'Holds mismatches for review'],
      },
      {
        area: 'Sales',
        title: 'Quote requests answered fast',
        body: 'Requests for quotes priced on your rules and sent back the same day, so you are first to the buyer.',
        does: ['Reads the request', 'Prices on your rules and costs', 'Replies or routes for approval'],
      },
      {
        area: 'Customer service',
        title: 'Order status and lead-time calls',
        body: 'Customers calling for status and lead times get an answer from live order data, without waiting on a rep.',
        does: ['Looks up the order', 'Gives status and ship dates', 'Hands off exceptions'],
      },
      {
        area: 'Purchasing',
        title: 'Supplier follow-ups',
        body: 'Ship-date confirmations and late orders chased automatically, with delays flagged before they hit production.',
        does: ['Requests confirmations', 'Tracks promised dates', 'Flags delays early'],
      },
      {
        area: 'Every team',
        title: 'One source of truth for every team',
        body: 'Service, operations, and marketing work from the same knowledge base, with answers that link back to their sources.',
        does: ['Unifies documents and know-how', 'Answers with citations', 'Keeps teams consistent'],
      },
      {
        area: 'Finance',
        title: 'Invoices matched before approval',
        body: 'Supplier invoices checked against POs and receipts, so only real exceptions reach your AP team.',
        does: ['Reads each invoice', 'Matches to PO and receipt', 'Routes exceptions'],
      },
    ],
    systems: [L.netsuite, L.quickbooks, L.salesforce, L.sharepoint, L.confluence, L.outlook, L.teams, L.googledrive],
    caseStudies: [SUPPLEMENT_MAKER],
    faqs: [
      {
        q: 'Does it work with our ERP?',
        a: 'Yes. We connect through its API where one exists, and where it does not, agents work in it the way your team does, screen by screen.',
      },
      {
        q: 'What happens when an order does not match?',
        a: 'It is held and sent to the right person with the mismatch highlighted. You set the rules for what the agent may enter on its own.',
      },
      {
        q: 'How fast can we start?',
        a: 'Most first workflows go live in about four weeks: we map how the work runs, build around it, test it on your real orders, then switch it on.',
      },
      {
        q: 'Will it learn our part numbers and pricing quirks?',
        a: 'Yes. Agents are set up from your catalogs, price lists, and past orders, and they remember every correction your team makes.',
      },
      {
        q: 'Can it read orders that arrive as PDFs?',
        a: 'Yes. Agents read purchase orders in email bodies and PDF attachments, enter them in your ERP, and send anything that does not match to a person.',
      },
      MISTAKES_FAQ,
      SECURITY_FAQ,
      COST_FAQ,
      OWNERSHIP_FAQ,
    ],
  },
  {
    slug: 'health-wellness',
    name: 'Health & Wellness',
    photo: 'wellness-candles.webp',
    focus: 'center 78%',
    seoTitle: 'AI Agents for Spas, Med Spas, and Wellness Businesses',
    seoDescription:
      'Cartra Voice and AI agents for spas, med spas, and wellness studios: every call answered, appointments booked, cancellations rescheduled, and questions handled 24/7.',
    headline: ['Every call answered.', 'Every appointment booked.'],
    lede: 'Your front desk is busy with the clients in front of them, and the phone keeps ringing. We build voice agents that answer, book into your schedule, and turn cancellations into new appointments, around the clock.',
    useCases: [
      {
        area: 'Front desk',
        title: 'Appointments booked by phone',
        body: 'Callers book straight into your booking system or calendar, any time of day, while staff stay with clients.',
        does: ['Checks real availability', 'Books into your system', 'Sends the confirmation'],
      },
      {
        area: 'Front desk',
        title: 'Cancellations turned into reschedules',
        body: 'Instead of just taking a cancellation, the agent offers another time and fills the slot.',
        does: ['Offers alternative times', 'Rebooks on the spot', 'Updates the schedule'],
      },
      {
        area: 'Front desk',
        title: 'Calls answered while the team is busy',
        body: 'No more voicemail during treatments. Every caller gets an answer, and new clients get booked instead of calling elsewhere.',
        does: ['Answers every call', 'Handles new client inquiries', 'Passes on what needs staff'],
      },
      {
        area: 'Front desk',
        title: 'Recurring questions handled 24/7',
        body: 'Hours, prices, services, and policies answered the way your staff would, day or night.',
        does: ['Answers from your menu and policies', 'Explains services and prep', 'Never puts a caller on hold'],
      },
      {
        area: 'Memberships',
        title: 'Packages and memberships explained',
        body: 'Callers learn what each package includes and how memberships work, and are booked or handed to staff to buy.',
        does: ['Explains packages and benefits', 'Answers membership questions', 'Books or hands off to staff'],
      },
      {
        area: 'Every language',
        title: 'Callers served in their language',
        body: 'Clients who are more comfortable in another language get the same service, in 90+ languages.',
        does: ['Detects the caller’s language', 'Books and answers in it', 'Summarizes in English for staff'],
      },
    ],
    systems: [L.square, L.mindbody, L.booker, L.calendly, L.googlecalendar, L.caldotcom, L.ringcentral, L.twilio],
    caseStudies: [KOREAN_SPA, MED_SPA],
    faqs: [
      {
        q: 'Does it book into our system?',
        a: 'Yes. It books into Square, Mindbody, Booker, and common calendars, checking real availability before it offers a time.',
      },
      {
        q: 'Will it sound robotic?',
        a: 'No. It speaks naturally, uses your spa’s name and services, and hands the call to staff whenever a caller asks or needs a person.',
      },
      {
        q: 'How fast can we start?',
        a: 'Quickly. The Irvine wellness facility above was live in under two weeks: we learn your services and policies, connect your booking system, test real calls, then switch it on.',
      },
      {
        q: 'What happens to calls after hours?',
        a: 'They get answered. The agent books appointments and answers questions around the clock, so the morning starts with a fuller schedule instead of a voicemail backlog.',
      },
      {
        q: 'Can callers still reach our staff?',
        a: 'Yes. Callers can ask for a person at any time, and anything that needs staff is passed on with a summary.',
      },
      {
        q: 'Does it speak other languages?',
        a: 'Yes. It speaks 90+ languages and summarizes each call in English for your team.',
      },
      MISTAKES_FAQ,
      SECURITY_FAQ,
      COST_FAQ,
      OWNERSHIP_FAQ,
    ],
  },
];

export const INDUSTRY_PATH = (slug: string) => `/industries/${slug}`;

export const getIndustry = (slug: string) => INDUSTRIES.find((i) => i.slug === slug);
