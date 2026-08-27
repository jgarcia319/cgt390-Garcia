import Link from "next/link";
import ListingCard from "@/components/ListingCard";
import SearchBar from "@/components/SearchBar";
import { listings } from "@/lib/listings";

export default function Home() {
  const featured = listings.filter((listing) => listing.isFeatured).slice(0, 3);

  return (
    <main>
      <section className="hero">
        <p className="eyebrow">New season live</p>
        <h1>Street uniforms made for loud days and late nights.</h1>
        <p>
          NOVA STREET is a fictional storefront built with a bold, high-energy aesthetic inspired
          by modern performance streetwear.
        </p>
        <SearchBar />
      </section>

      <section className="section-block" aria-labelledby="featured-heading">
        <div className="section-heading">
          <h2 id="featured-heading">Featured Drop</h2>
          <Link href="/results" className="text-link">
            Shop all
          </Link>
        </div>
        <div className="listing-grid">
          {featured.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </section>

      <section className="section-block highlight">
        <div>
          <p className="eyebrow">Members only</p>
          <h2>Get first access to limited capsule drops.</h2>
          <p>Create an account to build your wishlist and unlock early launch reminders.</p>
        </div>
        <div className="hero-actions">
          <Link href="/signup" className="button primary">
            Join now
          </Link>
          <Link href="/saved" className="button ghost">
            View wishlist
          </Link>
        </div>
      </section>
    </main>
  );
}
