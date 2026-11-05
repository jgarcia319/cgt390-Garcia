import type { Listing, ListingAudience, ListingCategory } from "@/lib/types";

export type SearchProductsInput = {
  query?: string;
  line?: string;
  category?: ListingCategory;
  audience?: ListingAudience;
  maxPrice?: number;
  sort?: "recommended" | "price-asc" | "price-desc";
};

export type SearchProductsResult = {
  items: Listing[];
  count: number;
};

export const searchProductsTool = {
  name: "search_products",
  description:
    "Search the public product catalog. All filters are optional and can be combined; matching products must satisfy every provided filter. Use query for product names or keywords, line for a clothing line, category for an exact catalog category, audience for the intended audience, maxPrice for a nonnegative maximum price in USD, and sort for result ordering. Returns matching product information as JSON. This is read-only and never modifies the catalog.",
  inputSchema: {
    type: "object",
    properties: {
      query: {
        type: "string",
        minLength: 1,
        description: "Optional product name or keyword search. Do not send an empty string."
      },
      line: {
        type: "string",
        enum: ["After Hours Drop", "Voltage Pack", "Transit Uniform", "Velocity Series"],
        description: "Optional clothing line. Use one of the catalog's exact line names."
      },
      category: {
        type: "string",
        enum: ["Tees", "Hoodies", "Bottoms", "Leggings", "Outerwear", "Accessories"],
        description: "Optional exact product category."
      },
      audience: {
        type: "string",
        enum: ["Men", "Women", "Unisex"],
        description: "Optional intended audience. Men and Women searches also include Unisex products."
      },
      maxPrice: {
        type: "number",
        minimum: 0,
        description: "Optional nonnegative maximum price in USD; results cost at or below this amount."
      },
      sort: {
        type: "string",
        enum: ["recommended", "price-asc", "price-desc"],
        default: "recommended",
        description: "Optional result order. Defaults to recommended."
      }
    },
    additionalProperties: false
  },
  async handler(input: SearchProductsInput): Promise<SearchProductsResult> {
    const baseUrl = process.env.PRODUCT_API_BASE_URL ?? "http://localhost:3000";
    const url = new URL("/api/listings", baseUrl);

    for (const [key, value] of Object.entries(input)) {
      if (value !== undefined) {
        url.searchParams.set(key, String(value));
      }
    }

    console.error("API Request Reached");

    const response = await fetch(url, { method: "GET" });
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`search_products request failed (${response.status}): ${error}`);
    }

    return (await response.json()) as SearchProductsResult;
  }
} as const;
