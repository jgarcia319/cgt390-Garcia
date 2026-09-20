import type { Listing, ListingCategory, SearchFilters } from "./types";

export const listingCategories: Array<ListingCategory | "All"> = [
  "All",
  "Tees",
  "Hoodies",
  "Bottoms",
  "Leggings",
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
    audience: "Unisex",
    price: 44,
    tags: ["Heavyweight", "Screen Print", "Relaxed"],
    images: [
      {
        src: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85",
        alt: "Washed charcoal oversized tee with a front chest graphic"
      },
      {
        src: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=85",
        alt: "Close-up of soft cotton tee fabric and relaxed sleeve"
      }
    ],
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
    audience: "Men",
    price: 78,
    tags: ["Fleece", "Drop Shoulder", "Street Fit"],
    images: [
      {
        src: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=85",
        alt: "Charcoal boxy fleece hoodie with a minimal chest logo"
      },
      {
        src: "https://images.unsplash.com/photo-1578681994506-b8f463449011?auto=format&fit=crop&w=900&q=85",
        alt: "Close-up of a double-layer hoodie hood and drawcords"
      }
    ],
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
    audience: "Unisex",
    price: 84,
    tags: ["Utility", "Stretch", "Street Tech"],
    images: [
      {
        src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85",
        alt: "Tapered black cargo pants with utility pockets"
      },
      {
        src: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=85",
        alt: "Close-up of cargo pant cuff and ankle zip"
      }
    ],
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
    audience: "Unisex",
    price: 92,
    tags: ["Contrast Piping", "Full Zip", "Breathable"],
    images: [
      {
        src: "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=900&q=85",
        alt: "Midnight track jacket with contrast reflective piping"
      },
      {
        src: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=900&q=85",
        alt: "High-collar zip finish on a lightweight track jacket"
      }
    ],
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
    audience: "Women",
    price: 88,
    tags: ["Layering", "Multi-pocket", "Water Resistant"],
    images: [
      {
        src: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=900&q=85",
        alt: "Black utility vest with layered front pockets"
      },
      {
        src: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=85",
        alt: "Reflective detail on the back of a utility vest"
      }
    ],
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
    audience: "Unisex",
    price: 32,
    tags: ["Structured Crown", "Flat Brim", "Embroidered"],
    images: [
      {
        src: "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=900&q=85",
        alt: "Black structured snapback with raised NOVA-style embroidery"
      },
      {
        src: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=900&q=85",
        alt: "Close-up of a snapback cap with a contrasting underbill"
      }
    ],
    description:
      "Classic snapback with a structured crown and bold embroidery to finish every fit cleanly.",
    specs: ["Cotton Twill", "Adjustable Snap", "6 Panel Build", "Moisture Band"],
    isFeatured: false
  },
  {
    id: "nova-007",
    slug: "motion-sculpt-legging",
    title: "Motion Sculpt Legging",
    line: "Velocity Series",
    fit: "High-rise",
    category: "Leggings",
    audience: "Women",
    price: 64,
    tags: ["Four-way Stretch", "Sculpting", "Reflective"],
    images: [
      {
        src: "https://images.unsplash.com/photo-1506629905607-d9c297d3d3e1?auto=format&fit=crop&w=900&q=85",
        alt: "Black high-rise sculpting leggings with reflective side seams"
      },
      {
        src: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=85",
        alt: "Close-up of a supportive high-rise activewear waistband"
      }
    ],
    description:
      "A supportive, flexible legging with a clean sculpted fit for training, travel, and everyday movement.",
    specs: ["Nylon Blend", "Four-way Stretch", "High-rise Waist", "Moisture Wicking"],
    isFeatured: true
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
  const { query, line, category, audience, maxPrice, sort = "recommended" } = filters;

  const filtered = listings.filter((listing) => {
    const lineMatch = line
      ? listing.line.toLowerCase().includes(line.trim().toLowerCase())
      : true;
    const categoryMatch = category && category !== "All" ? listing.category === category : true;
    const audienceMatch =
      audience && audience !== "All"
        ? listing.audience === audience || listing.audience === "Unisex"
        : true;
    const priceMatch = typeof maxPrice === "number" ? listing.price <= maxPrice : true;

    return lineMatch && categoryMatch && audienceMatch && priceMatch && matchesQuery(listing, query ?? "");
  });

  if (sort === "price-asc") {
    return [...filtered].sort((a, b) => a.price - b.price);
  }
  if (sort === "price-desc") {
    return [...filtered].sort((a, b) => b.price - a.price);
  }
  return [...filtered].sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured));
}
