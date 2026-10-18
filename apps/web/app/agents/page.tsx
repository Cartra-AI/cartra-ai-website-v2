import type { Metadata } from 'next';
import ProductPage from '../components/landing/ProductPage';
import { PRODUCTS } from '../content/products';
import { createPageMetadata } from '../lib/seo';

const product = PRODUCTS.agents;

export const metadata: Metadata = createPageMetadata({
  title: product.seoTitle,
  description: product.seoDescription,
  path: product.path,
});

export default function Page() {
  return <ProductPage product={product} />;
}
