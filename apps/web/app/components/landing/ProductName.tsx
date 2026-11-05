/*
 * A product's name as a wordmark: "Cartra" in the display face and the product
 * in a bordered mono chip, so Voice, Agents and Brain read as products of
 * Cartra (same treatment as logistics.cartra.ai). Colors follow currentColor.
 * Running text just says "Cartra Voice".
 */
export default function ProductName({ name, className = '' }: { name: string; className?: string }) {
  return (
    <span className={`lp-product-name ${className}`.trim()}>
      <span className="lp-product-name__brand">Cartra</span>{' '}
      <span className="lp-product-name__chip">{name.replace('Cartra ', '')}</span>
    </span>
  );
}
