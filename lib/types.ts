export type ListingCategory = "Tees" | "Hoodies" | "Bottoms" | "Outerwear" | "Accessories";

export type Listing = {
  id: string;
  slug: string;
  title: string;
  line: string;
  fit: string;
  category: ListingCategory;
  price: number;
  tags: string[];
  images: string[];
  description: string;
  specs: string[];
  isFeatured: boolean;
};

export type SearchFilters = {
  query?: string;
  line?: string;
  category?: ListingCategory | "All";
  maxPrice?: number;
  sort?: "recommended" | "price-asc" | "price-desc";
};
