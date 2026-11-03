import { filterListings } from "@/lib/listings";
import type {
  ListingAudience,
  ListingCategory,
  SearchFilters
} from "@/lib/types";

const categories: ReadonlySet<ListingCategory | "All"> = new Set([
  "All",
  "Tees",
  "Hoodies",
  "Bottoms",
  "Leggings",
  "Outerwear",
  "Accessories"
]);

const audiences: ReadonlySet<ListingAudience | "All"> = new Set([
  "All",
  "Men",
  "Women",
  "Unisex"
]);

const sortOptions: ReadonlySet<NonNullable<SearchFilters["sort"]>> = new Set([
  "recommended",
  "price-asc",
  "price-desc"
]);

function getSingleParam(params: URLSearchParams, name: string) {
  const value = params.get(name)?.trim();
  return value || undefined;
}

function invalidParameter(name: string, value: string): Response {
  return Response.json(
    { error: `Invalid ${name}: "${value}".` },
    { status: 400 }
  );
}

export function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const query = getSingleParam(params, "query");
  const line = getSingleParam(params, "line");
  const category = getSingleParam(params, "category");
  const audience = getSingleParam(params, "audience");
  const maxPriceRaw = getSingleParam(params, "maxPrice");
  const sort = getSingleParam(params, "sort") ?? "recommended";

  if (category && !categories.has(category as ListingCategory | "All")) {
    return invalidParameter("category", category);
  }
  if (audience && !audiences.has(audience as ListingAudience | "All")) {
    return invalidParameter("audience", audience);
  }
  if (!sortOptions.has(sort as NonNullable<SearchFilters["sort"]>)) {
    return invalidParameter("sort", sort);
  }

  let maxPrice: number | undefined;
  if (maxPriceRaw) {
    maxPrice = Number(maxPriceRaw);
    if (!Number.isFinite(maxPrice) || maxPrice < 0) {
      return invalidParameter("maxPrice", maxPriceRaw);
    }
  }

  const filters: SearchFilters = {
    query,
    line,
    category: category as ListingCategory | "All" | undefined,
    audience: audience as ListingAudience | "All" | undefined,
    maxPrice,
    sort: sort as SearchFilters["sort"]
  };
  const items = filterListings(filters);

  return Response.json(
    { items, count: items.length },
    {
      headers: {
        "Cache-Control": "public, max-age=60, s-maxage=300"
      }
    }
  );
}
