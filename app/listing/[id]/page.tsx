import { notFound } from "next/navigation";
import SaveButton from "@/components/SaveButton";
import { getListingById } from "@/lib/listings";

type ListingDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ListingDetailPage({ params }: ListingDetailPageProps) {
  const resolvedParams = await params;
  const listing = getListingById(resolvedParams.id);

  if (!listing) {
    notFound();
  }

  return (
    <main>
      <section className="section-block">
        <p className="eyebrow">
          {listing.line} · {listing.fit} fit
        </p>
        <div className="detail-heading">
          <h1 className="page-title">{listing.title}</h1>
          <SaveButton listingId={listing.id} />
        </div>
        <p className="listing-meta large">
          {listing.category} · ${listing.price}
        </p>
      </section>

      <section className="detail-gallery">
        {listing.images.map((description) => (
          <div key={description} className="detail-image" aria-hidden="true">
            <span>{description}</span>
          </div>
        ))}
      </section>

      <section className="section-block detail-body">
        <article className="detail-card">
          <h2>Overview</h2>
          <p>{listing.description}</p>
        </article>

        <article className="detail-card">
          <h2>Specs</h2>
          <ul className="bullet-list">
            {listing.specs.map((spec) => (
              <li key={spec}>{spec}</li>
            ))}
          </ul>
        </article>

        <article className="detail-card">
          <h2>Style Tags</h2>
          <div className="tag-row">
            {listing.tags.map((tag) => (
              <span className="tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}
