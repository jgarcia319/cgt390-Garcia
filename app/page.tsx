type DropItem = {
  id: string;
  name: string;
  category: "Outerwear" | "Tops" | "Bottoms" | "Accessories";
  price: string;
  badge?: "Limited" | "New";
};

const dropItems: DropItem[] = [
  {
    id: "ns-001",
    name: "Midnight Utility Jacket",
    category: "Outerwear",
    price: "$128",
    badge: "Limited"
  },
  {
    id: "ns-002",
    name: "Concrete Layer Tee",
    category: "Tops",
    price: "$42",
    badge: "New"
  },
  {
    id: "ns-003",
    name: "District Cargo Pant",
    category: "Bottoms",
    price: "$94"
  },
  {
    id: "ns-004",
    name: "Signal Snapback",
    category: "Accessories",
    price: "$36"
  }
];

const categories = [
  { name: "Outerwear", description: "Statement layers built for everyday movement." },
  { name: "Tops", description: "Oversized cuts and clean graphic-driven silhouettes." },
  { name: "Bottoms", description: "Technical fits with comfort-forward construction." },
  { name: "Accessories", description: "Small details that define the full look." }
];

export default function Home() {
  return (
    <main className="site-shell">
      <header className="topbar">
        <p className="brand">NOVA STREET</p>
        <nav aria-label="Main navigation">
          <ul className="nav-list">
            <li>New</li>
            <li>Shop</li>
            <li>Lookbook</li>
            <li>Journal</li>
          </ul>
        </nav>
        <button className="button ghost" type="button">
          Cart (0)
        </button>
      </header>

      <section className="hero">
        <p className="eyebrow">Fresh collection</p>
        <h1>Streetwear essentials for city rhythm.</h1>
        <p>
          NOVA STREET is an original concept experience featuring modern streetwear-inspired
          layouts, curated drops, and a product-forward shopping flow.
        </p>
        <div className="hero-actions">
          <button className="button primary" type="button">
            Shop Drop
          </button>
          <button className="button ghost" type="button">
            Explore Lookbook
          </button>
        </div>
      </section>

      <section className="section-block" aria-labelledby="categories-heading">
        <div className="section-heading">
          <h2 id="categories-heading">Browse by Category</h2>
        </div>
        <div className="category-grid">
          {categories.map((category) => (
            <article className="card" key={category.name}>
              <h3>{category.name}</h3>
              <p>{category.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block" aria-labelledby="drop-heading">
        <div className="section-heading">
          <h2 id="drop-heading">Current Drop</h2>
          <a href="#" className="text-link">
            View all
          </a>
        </div>
        <div className="product-grid">
          {dropItems.map((item) => (
            <article className="product-card" key={item.id}>
              <div className="placeholder-media" aria-hidden="true" />
              <div className="product-info">
                <p className="category">{item.category}</p>
                <h3>{item.name}</h3>
                <p className="price">{item.price}</p>
              </div>
              {item.badge ? <span className="badge">{item.badge}</span> : null}
            </article>
          ))}
        </div>
      </section>

      <section className="section-block highlight">
        <div>
          <p className="eyebrow">Members only</p>
          <h2>Get early access to upcoming capsule releases.</h2>
          <p>Subscribe for launch reminders, editorial drops, and private offers.</p>
        </div>
        <form className="signup" action="#">
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input id="email" type="email" placeholder="you@example.com" />
          <button className="button primary" type="submit">
            Join
          </button>
        </form>
      </section>

      <footer className="footer">
        <small>© {new Date().getFullYear()} NOVA STREET. Original demo concept.</small>
      </footer>
    </main>
  );
}
