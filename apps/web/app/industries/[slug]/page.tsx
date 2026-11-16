import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import IndustryPage from '../../components/landing/IndustryPage';
import { INDUSTRIES, INDUSTRY_PATH, getIndustry } from '../../content/industries';
import { createPageMetadata } from '../../lib/seo';

/* /industries/[slug]: one statically generated page per industry. */

export const dynamicParams = false;

export function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return {};
  return createPageMetadata({
    title: `${industry.seoTitle} | Cartra`,
    description: industry.seoDescription,
    path: INDUSTRY_PATH(industry.slug),
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();
  return <IndustryPage industry={industry} />;
}
