import type { Metadata } from "next";
import ListingCard from "@/components/ListingCard";
import { filterListings } from "@/lib/listings";

export const metadata: Metadata = {
  title: "Men’s Hoodies",
  description: "Shop NOVA STREET men's hoodies, from boxy fleece layers to everyday streetwear essentials.",
  alternates: { canonical: "/men/hoodies" }
};

export default function MenHoodiesPage() {
  const products = filterListings({
    audience: "Men",
    category: "Hoodies",
    sort: "recommended"
  });

  return (
    <main>
      <section className="audience-hero audience-hero-men">
        <p className="eyebrow">NOVA STREET · Men&apos;s collection</p>
        <h1>Men&apos;s Hoodies</h1>
        <p>Explore every men&apos;s hoodie in the catalog, from boxy fleece layers to everyday essentials.</p>
      </section>
      <section className="section-block" aria-labelledby="mens-hoodies-heading">
        <div className="section-heading">
          <h2 id="mens-hoodies-heading">
            {products.length} hoodie{products.length === 1 ? "" : "s"}
          </h2>
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
