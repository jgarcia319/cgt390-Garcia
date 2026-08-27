import type { Listing, ListingCategory, SearchFilters } from "./types";

export const listingCategories: Array<ListingCategory | "All"> = [
  "All",
  "Tees",
  "Hoodies",
  "Bottoms",
  "Outerwear",
  "Accessories"
];

export const listings: Listing[] = [
  {
    id: "nova-001",
    slug: "after-hours-oversize-tee",
    title: "After Hours Oversize Tee",
    line: "After Hours Drop",
    fit: "Oversized",
    category: "Tees",
    price: 44,
    tags: ["Heavyweight", "Screen Print", "Relaxed"],
    images: ["Front chest print graphic", "Washed charcoal fabric detail"],
    description:
      "A heavyweight cotton tee with a soft washed finish and bold front graphic built for all-day wear.",
    specs: ["100% Cotton", "240 GSM", "Ribbed Collar", "Pre-shrunk"],
    isFeatured: true
  },
  {
    id: "nova-002",
    slug: "gridline-core-hoodie",
    title: "Gridline Core Hoodie",
    line: "Voltage Pack",
    fit: "Boxy",
    category: "Hoodies",
    price: 78,
    tags: ["Fleece", "Drop Shoulder", "Street Fit"],
    images: ["Minimal chest logo", "Double-layer hood structure"],
    description:
      "A midweight fleece hoodie with clean paneling and a boxy silhouette for effortless layering.",
    specs: ["Cotton Blend", "Brushed Interior", "Kangaroo Pocket", "Metal Tip Drawcords"],
    isFeatured: true
  },
  {
    id: "nova-003",
    slug: "signal-cargo-pant",
    title: "Signal Cargo Pant",
    line: "Transit Uniform",
    fit: "Tapered",
    category: "Bottoms",
    price: 84,
    tags: ["Utility", "Stretch", "Street Tech"],
    images: ["Cargo pocket profile", "Cuffed hem and ankle zip"],
    description:
      "Technical cargo pant with utility pockets, stretch comfort, and a tapered leg built for motion.",
    specs: ["Nylon Blend", "Elastic Waist", "YKK Zippers", "Adjustable Cuff"],
    isFeatured: false
  },
  {
    id: "nova-004",
    slug: "midnight-track-jacket",
    title: "Midnight Track Jacket",
    line: "Velocity Series",
    fit: "Athletic",
    category: "Outerwear",
    price: 92,
    tags: ["Contrast Piping", "Full Zip", "Breathable"],
    images: ["Reflective piping lines", "High-collar zip finish"],
    description:
      "A lightweight track jacket with contrast piping and breathable fabric for everyday movement.",
    specs: ["Poly Tricot", "Mesh Lining", "Zip Pockets", "Elastic Cuffs"],
    isFeatured: false
  },
  {
    id: "nova-005",
    slug: "flashpoint-utility-vest",
    title: "Flashpoint Utility Vest",
    line: "After Hours Drop",
    fit: "Regular",
    category: "Outerwear",
    price: 88,
    tags: ["Layering", "Multi-pocket", "Water Resistant"],
    images: ["Front utility pockets", "Back reflective detail"],
    description:
      "A tactical-inspired utility vest designed for layered fits and statement street style.",
    specs: ["Ripstop Shell", "Snap + Zip Closure", "4 Front Pockets", "Adjustable Hem"],
    isFeatured: true
  },
  {
    id: "nova-006",
    slug: "chromatic-snapback",
    title: "Chromatic Snapback",
    line: "Voltage Pack",
    fit: "One Size",
    category: "Accessories",
    price: 32,
    tags: ["Structured Crown", "Flat Brim", "Embroidered"],
    images: ["Raised logo embroidery", "Contrast underbill"],
    description:
      "Classic snapback with a structured crown and bold embroidery to finish every fit cleanly.",
    specs: ["Cotton Twill", "Adjustable Snap", "6 Panel Build", "Moisture Band"],
    isFeatured: false
  }
];

export function getListingById(id: string) {
  return listings.find((listing) => listing.id === id);
}

function matchesQuery(listing: Listing, query: string) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return true;
  }
  return (
    listing.title.toLowerCase().includes(normalized) ||
    listing.line.toLowerCase().includes(normalized) ||
    listing.fit.toLowerCase().includes(normalized) ||
    listing.tags.some((tag) => tag.toLowerCase().includes(normalized))
  );
}

export function filterListings(filters: SearchFilters): Listing[] {
  const { query, line, category, maxPrice, sort = "recommended" } = filters;

  const filtered = listings.filter((listing) => {
    const lineMatch = line
      ? listing.line.toLowerCase().includes(line.trim().toLowerCase())
      : true;
    const categoryMatch = category && category !== "All" ? listing.category === category : true;
    const priceMatch = typeof maxPrice === "number" ? listing.price <= maxPrice : true;

    return lineMatch && categoryMatch && priceMatch && matchesQuery(listing, query ?? "");
  });

  if (sort === "price-asc") {
    return [...filtered].sort((a, b) => a.price - b.price);
  }
  if (sort === "price-desc") {
    return [...filtered].sort((a, b) => b.price - a.price);
  }
  return [...filtered].sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured));
}
