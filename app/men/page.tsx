import type { Metadata } from "next";
import Link from "next/link";
import ListingCard from "@/components/ListingCard";
import { filterListings } from "@/lib/listings";

export const metadata: Metadata = {
  title: "For Him",
  description:
    "Shop NOVA STREET men's hoodies, tees, outerwear, and utility layers built for everyday movement.",
  alternates: { canonical: "/men" }
};

export default function MenPage() {
  const products = filterListings({ audience: "Men", sort: "recommended" }).slice(0, 4);
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "NOVA STREET For Him",
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `/listing/${product.id}`,
      name: product.title
    }))
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <section className="audience-hero audience-hero-men">
        <p className="eyebrow">NOVA STREET · For him</p>
        <h1>Core layers. Loud details.</h1>
        <p>Boxy fleece, graphic essentials, and utility pieces for the everyday rotation.</p>
        <Link href="/results?audience=Men" className="button primary">
          Shop all men&apos;s
        </Link>
      </section>
      <section className="section-block" aria-labelledby="men-featured-heading">
        <div className="section-heading">
          <h2 id="men-featured-heading">Featured for him</h2>
          <Link href="/results?audience=Men" className="text-link">
            View all
          </Link>
        </div>
        <div className="listing-grid">
          {products.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </section>
    </main>
  );
}
