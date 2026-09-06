import Link from "next/link";
import ListingCard from "@/components/ListingCard";
import SearchBar from "@/components/SearchBar";
import { listings } from "@/lib/listings";

export default function Home() {
  const featured = listings.filter((listing) => listing.isFeatured).slice(0, 3);
  const categoryLinks = ["Tees", "Hoodies", "Bottoms", "Outerwear", "Accessories"];

  return (
    <main>
      <section className="hero">
        <p className="eyebrow">New drop · After hours</p>
        <h1>Street uniforms made for loud days and late nights.</h1>
        <p>
          Explore the latest release, shop by your edit, or browse every NOVA STREET piece in one
          catalog.
        </p>
        <div className="hero-actions">
          <Link href="#shop-him" className="button primary">
            Shop for him
          </Link>
          <Link href="#shop-her" className="button ghost">
            Shop for her
          </Link>
          <Link href="/results" className="text-link hero-catalog-link">
            View all products
          </Link>
        </div>
      </section>

      <section className="shop-edits" aria-label="Shop by edit">
        <article className="edit-panel" id="shop-him">
          <p className="eyebrow">For him</p>
          <h2>Core layers. Loud details.</h2>
          <p>Start with category, then move through fresh drops, best sellers, and sale.</p>
          <div className="edit-links">
            {categoryLinks.map((category) => (
              <Link key={category} href={`/results?category=${category}`} className="tag">
                {category}
              </Link>
            ))}
          </div>
          <Link href="/results" className="text-link">
            Shop the him edit
          </Link>
        </article>

        <article className="edit-panel edit-panel-alt" id="shop-her">
          <p className="eyebrow">For her</p>
          <h2>Built to make the fit yours.</h2>
          <p>Browse the newest pieces by category, then save the ones you want to revisit.</p>
          <div className="edit-links">
            {categoryLinks.map((category) => (
              <Link key={category} href={`/results?category=${category}`} className="tag">
                {category}
              </Link>
            ))}
          </div>
          <Link href="/results" className="text-link">
            Shop the her edit
          </Link>
        </article>
      </section>

      <section className="section-block collection-strip" id="collabs">
        <div>
          <p className="eyebrow">Limited capsule</p>
          <h2>Collabs and capsule energy.</h2>
          <p>Explore small-run graphics and crossover pieces alongside the main collection.</p>
        </div>
        <Link href="/results?line=Voltage%20Pack" className="button ghost">
          Explore collabs
        </Link>
      </section>

      <section className="section-block" aria-labelledby="featured-heading">
        <div className="section-heading">
          <h2 id="featured-heading">New drop</h2>
          <Link href="/results" className="text-link">
            All products
          </Link>
        </div>
        <div className="listing-grid">
          {featured.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </section>

      <section className="section-block" aria-labelledby="find-fit-heading">
        <div className="section-heading">
          <h2 id="find-fit-heading">Find your next fit</h2>
        </div>
        <SearchBar />
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
