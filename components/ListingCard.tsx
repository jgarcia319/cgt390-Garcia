import Link from "next/link";
import Image from "next/image";
import type { Listing } from "@/lib/types";
import SaveButton from "./SaveButton";

type ListingCardProps = {
  listing: Listing;
};

export default function ListingCard({ listing }: ListingCardProps) {
  return (
    <article className="listing-card">
      <div className="listing-image">
        <Image
          src={listing.images[0].src}
          alt={listing.images[0].alt}
          fill
          sizes="(max-width: 760px) 92vw, (max-width: 1100px) 45vw, 232px"
        />
      </div>
      <div className="listing-content">
        <div className="listing-topline">
          <p>
            {listing.line} · {listing.fit} fit
          </p>
          <SaveButton listingId={listing.id} />
        </div>
        <h3>
          <Link href={`/listing/${listing.id}`}>{listing.title}</Link>
        </h3>
        <p className="listing-meta">
          {listing.category} · ${listing.price}
        </p>
        <div className="tag-row">
          {listing.tags.map((tag) => (
            <span className="tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
