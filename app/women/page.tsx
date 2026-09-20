import type { Metadata } from "next";
import Link from "next/link";
import ListingCard from "@/components/ListingCard";
import { filterListings } from "@/lib/listings";

export const metadata: Metadata = {
  title: "For Her",
  description:
    "Shop NOVA STREET women's leggings, outerwear, tees, and movement-ready essentials made for your own fit.",
  alternates: { canonical: "/women" }
};

export default function WomenPage() {
  const products = filterListings({ audience: "Women", sort: "recommended" }).slice(0, 4);
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "NOVA STREET For Her",
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
      <section className="audience-hero audience-hero-women">
        <p className="eyebrow">NOVA STREET · For her</p>
        <h1>Built to make the fit yours.</h1>
        <p>Stretch essentials, sharp layers, and statement pieces made for your next move.</p>
        <Link href="/results?audience=Women" className="button primary">
          Shop all women&apos;s
        </Link>
      </section>
      <section className="section-block" aria-labelledby="women-featured-heading">
        <div className="section-heading">
          <h2 id="women-featured-heading">Featured for her</h2>
          <Link href="/results?audience=Women" className="text-link">
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
