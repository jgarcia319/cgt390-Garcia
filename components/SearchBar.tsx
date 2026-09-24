"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { listingCategories } from "@/lib/listings";
import type { ListingAudience, SearchFilters } from "@/lib/types";

type SearchBarProps = {
  initialValues?: SearchFilters;
  compact?: boolean;
};

type CategoryOption = (typeof listingCategories)[number];
type SortOption = NonNullable<SearchFilters["sort"]>;

function isCategoryOption(value: string): value is CategoryOption {
  return listingCategories.some((item) => item === value);
}

function isSortOption(value: string): value is SortOption {
  return value === "recommended" || value === "price-asc" || value === "price-desc";
}

export default function SearchBar({ initialValues, compact = false }: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialValues?.query ?? "");
  const [line, setLine] = useState(initialValues?.line ?? "");
  const [category, setCategory] = useState(initialValues?.category ?? "All");
  const [audience, setAudience] = useState(initialValues?.audience ?? "All");
  const [maxPrice, setMaxPrice] = useState(initialValues?.maxPrice?.toString() ?? "");
  const [sort, setSort] = useState(initialValues?.sort ?? "recommended");

  const submitSearch = (event: FormEvent) => {
    event.preventDefault();
    const searchTerm = query.trim();

    const params = new URLSearchParams();

    if (searchTerm) {
      params.set("query", searchTerm);
    }
    if (line.trim()) {
      params.set("line", line.trim());
    }
    if (category !== "All") {
      params.set("category", category);
    }
    if (audience !== "All") {
      params.set("audience", audience);
    }
    if (maxPrice.trim()) {
      params.set("maxPrice", maxPrice.trim());
    }
    if (sort !== "recommended") {
      params.set("sort", sort);
    }

    const search = params.toString();
    router.push(search ? `/results?${search}` : "/results");
  };

  return (
    <form className={compact ? "search-form compact" : "search-form"} onSubmit={submitSearch}>
      <label className="field">
        <span>Shop for</span>
        <select
          value={audience}
          onChange={(event) => setAudience(event.target.value as ListingAudience | "All")}
        >
          <option value="All">Everyone</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
        </select>
      </label>

      <label className="field">
        <span>Search</span>
        <input
          type="text"
          placeholder="Hoodie, cargo, oversized..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </label>

      <label className="field">
        <span>Drop</span>
        <input
          type="text"
          placeholder="After Hours Drop"
          value={line}
          onChange={(event) => setLine(event.target.value)}
        />
      </label>

      <label className="field">
        <span>Category</span>
        <select
          value={category}
          onChange={(event) => {
            const nextValue = event.target.value;
            if (isCategoryOption(nextValue)) {
              setCategory(nextValue);
            }
          }}
        >
          {listingCategories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>

      <label className="field">
        <span>Max Price</span>
        <input
          type="number"
          min={0}
          placeholder="100"
          value={maxPrice}
          onChange={(event) => setMaxPrice(event.target.value)}
        />
      </label>

      <label className="field">
        <span>Sort</span>
        <select
          value={sort}
          onChange={(event) => {
            const nextValue = event.target.value;
            if (isSortOption(nextValue)) {
              setSort(nextValue);
            }
          }}
        >
          <option value="recommended">Recommended</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </label>

      <button type="submit" className="button primary">
        Find Fits
      </button>
    </form>
  );
}
