"use client";

import Link from "next/link";
import EmptyState from "@/components/EmptyState";
import ListingCard from "@/components/ListingCard";
import { useAppState } from "@/context/AppStateContext";
import { listings } from "@/lib/listings";

export default function SavedPage() {
  const { savedIds, user } = useAppState();
  const savedListings = listings.filter((listing) => savedIds.includes(listing.id));

  return (
    <main>
      <section className="section-block">
        <p className="eyebrow">Your picks</p>
        <h1 className="page-title">Wishlist</h1>
        {user ? (
          <p>Signed in as {user.email}.</p>
        ) : (
          <p>
            You are viewing your wishlist as a guest.{" "}
            <Link href="/login" className="text-link">
              Log in
            </Link>{" "}
            to keep your picks tied to an account on this device.
          </p>
        )}
      </section>

      <section className="section-block">
        {savedListings.length ? (
          <div className="listing-grid">
            {savedListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No wishlist items yet"
            body="Browse products and tap save to build your lineup."
            ctaLabel="Explore catalog"
            ctaHref="/results"
          />
        )}
      </section>
    </main>
  );
}
