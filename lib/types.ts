export type ListingCategory =
  | "Tees"
  | "Hoodies"
  | "Bottoms"
  | "Leggings"
  | "Outerwear"
  | "Accessories";
export type ListingAudience = "Men" | "Women" | "Unisex";

export type Listing = {
  id: string;
  slug: string;
  title: string;
  line: string;
  fit: string;
  category: ListingCategory;
  audience: ListingAudience;
  price: number;
  tags: string[];
  images: Array<{
    src: string;
    alt: string;
  }>;
  description: string;
  specs: string[];
  isFeatured: boolean;
};

export type SearchFilters = {
  query?: string;
  line?: string;
  category?: ListingCategory | "All";
  audience?: ListingAudience | "All";
  maxPrice?: number;
  sort?: "recommended" | "price-asc" | "price-desc";
};
