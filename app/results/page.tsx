import EmptyState from "@/components/EmptyState";
import ListingCard from "@/components/ListingCard";
import SearchBar from "@/components/SearchBar";
import { filterListings } from "@/lib/listings";
import type { ListingCategory, SearchFilters } from "@/lib/types";

type SearchParams = Record<string, string | string[] | undefined>;

type ResultsPageProps = {
  searchParams: Promise<SearchParams>;
};

function pickSingle(value: string | string[] | undefined) {
  if (Array.isArray(value)) {
    return value[0];
  }
  return value;
}

function readFilters(searchParams: SearchParams | undefined): SearchFilters {
  const query = pickSingle(searchParams?.query);
  const line = pickSingle(searchParams?.line);
  const category = pickSingle(searchParams?.category) as ListingCategory | "All" | undefined;
  const maxPriceRaw = pickSingle(searchParams?.maxPrice);
  const sortRaw = pickSingle(searchParams?.sort);

  const parsedMaxPrice =
    maxPriceRaw && !Number.isNaN(Number(maxPriceRaw)) ? Number(maxPriceRaw) : undefined;

  const sort = sortRaw === "price-asc" || sortRaw === "price-desc" ? sortRaw : "recommended";

  return {
    query,
    line,
    category,
    maxPrice: parsedMaxPrice,
    sort
  };
}

export default async function ResultsPage({ searchParams }: ResultsPageProps) {
  const resolvedSearchParams = await searchParams;
  const filters = readFilters(resolvedSearchParams);
  const results = filterListings(filters);

  return (
    <main>
      <section className="section-block">
        <p className="eyebrow">Catalog</p>
        <h1 className="page-title">Shop all products</h1>
        <SearchBar initialValues={filters} compact />
      </section>

      <section className="section-block">
        <div className="section-heading">
          <h2>{results.length} match{results.length === 1 ? "" : "es"}</h2>
        </div>
        {results.length ? (
          <div className="listing-grid">
            {results.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No products found"
            body="Try a broader keyword, higher max price, or a different category."
            ctaLabel="Back to home"
            ctaHref="/"
          />
        )}
      </section>
    </main>
  );
}
