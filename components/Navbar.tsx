"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppState } from "@/context/AppStateContext";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/results", label: "Shop" },
  { href: "/saved", label: "Wishlist" }
];

export default function Navbar() {
  const pathname = usePathname();
  const { user, savedIds, logout } = useAppState();

  return (
    <header className="topbar">
      <Link href="/" className="brand-link">
        NOVA STREET
      </Link>

      <nav aria-label="Main navigation">
        <ul className="nav-list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={pathname === link.href ? "nav-link active" : "nav-link"}
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
