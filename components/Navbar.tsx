"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppState } from "@/context/AppStateContext";
import { trackEvent } from "@/lib/analytics";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/men", label: "For Him" },
  { href: "/women", label: "For Her" },
  { href: "/results?sort=recommended", label: "New Arrivals" },
  { href: "/#collabs", label: "Collabs" },
  { href: "/results", label: "All Products" }
];

export default function Navbar() {
  const pathname = usePathname();
  const { user, savedIds, logout } = useAppState();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="topbar">
      <Link href="/" className="brand-link" aria-label="NOVA STREET home">
        <strong>NOVA STREET</strong>
        <span>Built for motion. Made to stand out.</span>
      </Link>

      <button
        type="button"
        className="nav-toggle"
        aria-controls="main-navigation-links"
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen((open) => !open)}
      >
        {isMenuOpen ? "Close" : "Menu"}
      </button>

      <nav aria-label="Main navigation">
        <ul id="main-navigation-links" className={isMenuOpen ? "nav-list is-open" : "nav-list"}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={
                  (link.href === "/" && pathname === "/") ||
                  (link.href === "/results" && pathname === "/results") ||
                  (link.href === "/men" && pathname === "/men") ||
                  (link.href === "/women" && pathname === "/women")
                    ? "nav-link active"
                    : "nav-link"
                }
                onClick={() => {
                  if (link.label === "For Him") {
                    trackEvent("clicks_for_him", { link_name: "For Him" });
                  }
                  setIsMenuOpen(false);
                }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="topbar-actions">
        <Link href="/saved" className="nav-link saved-pill">
          Wishlist ({savedIds.length})
        </Link>
        {user ? (
          <>
            <span className="user-pill">Hi, {user.name}</span>
            <button type="button" className="button ghost small" onClick={logout}>
              Log out
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="button ghost small">
              Log in
            </Link>
            <Link href="/signup" className="button primary small">
              Sign up
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
