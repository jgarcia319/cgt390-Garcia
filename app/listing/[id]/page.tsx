import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import SaveButton from "@/components/SaveButton";
import { getListingById } from "@/lib/listings";

type ListingDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({ params }: ListingDetailPageProps): Promise<Metadata> {
  const listing = getListingById((await params).id);
  return listing
    ? {
        title: listing.title,
        description: listing.description,
        alternates: { canonical: `/listing/${listing.id}` }
      }
    : {};
}

export default async function ListingDetailPage({ params }: ListingDetailPageProps) {
  const resolvedParams = await params;
  const listing = getListingById(resolvedParams.id);

  if (!listing) {
    notFound();
  }

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: listing.title,
    description: listing.description,
    category: listing.category,
    image: listing.images.map((image) => image.src),
    brand: { "@type": "Brand", name: "NOVA STREET" },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: listing.price.toFixed(2),
      availability: "https://schema.org/InStock",
      url: `/listing/${listing.id}`
    }
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
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
        {listing.images.map((image) => (
          <div key={image.src} className="detail-image">
            <Image src={image.src} alt={image.alt} fill sizes="(max-width: 760px) 92vw, 50vw" />
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
