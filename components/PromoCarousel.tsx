"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  {
    eyebrow: "New drop",
    title: "After hours, turned all the way up.",
    body: "Heavyweight layers and graphic essentials for the latest NOVA STREET release.",
    href: "/results?line=After%20Hours%20Drop",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1400&q=85",
    alt: "Model wearing a layered streetwear outfit"
  },
  {
    eyebrow: "Newest collab",
    title: "Voltage Pack: light up the lineup.",
    body: "Small-run graphics, high-energy color, and crossover pieces made to stand out.",
    href: "/results?line=Voltage%20Pack",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&q=85",
    alt: "Model posing in a bright fashion look"
  },
  {
    eyebrow: "Restock alert",
    title: "The pieces you saved are back.",
    body: "Refresh your rotation with everyday staples built for repeat wear.",
    href: "/results?category=Hoodies",
    image:
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1400&q=85",
    alt: "Folded neutral clothing arranged together"
  }
];

export default function PromoCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const timer = window.setInterval(
      () => setActiveIndex((index) => (index + 1) % slides.length),
      5000
    );
    return () => window.clearInterval(timer);
  }, [isPaused]);

  const slide = slides[activeIndex];

  return (
    <section
      className="promo-carousel"
      aria-label="NOVA STREET highlights"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsPaused(false);
        }
      }}
    >
      <img className="promo-image" src={slide.image} alt={slide.alt} />
      <div className="promo-overlay" />
      <div className="promo-content">
        <p className="eyebrow">{slide.eyebrow}</p>
        <h2>{slide.title}</h2>
        <p>{slide.body}</p>
        <Link href={slide.href} className="button primary">
          Shop the story
        </Link>
      </div>
      <div className="promo-controls">
        <button
          type="button"
          className="carousel-control"
          aria-label="Previous highlight"
          onClick={() => setActiveIndex((activeIndex - 1 + slides.length) % slides.length)}
        >
          ←
        </button>
        <div className="carousel-dots" aria-label="Choose a highlight">
          {slides.map((item, index) => (
            <button
              key={item.eyebrow}
              type="button"
              className={index === activeIndex ? "carousel-dot active" : "carousel-dot"}
              aria-label={`Show ${item.eyebrow}`}
              aria-current={index === activeIndex ? "true" : undefined}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
        <button
          type="button"
          className="carousel-control"
          aria-label="Next highlight"
          onClick={() => setActiveIndex((activeIndex + 1) % slides.length)}
        >
          →
        </button>
      </div>
    </section>
  );
}
