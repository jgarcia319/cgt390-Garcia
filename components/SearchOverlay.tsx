"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { MouseEvent } from "react";
import SearchBar from "./SearchBar";

type SearchOverlayProps = {
  onClose: () => void;
};

export default function SearchOverlay({ onClose }: SearchOverlayProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortalTarget(document.body);
  }, []);

  useEffect(() => {
    dialogRef.current?.querySelector<HTMLElement>("select")?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key === "Tab" && dialogRef.current) {
        const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (!firstElement || !lastElement) {
          return;
        }

        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!portalTarget) {
    return null;
  }

  return createPortal(
    <>
    <div className="search-overlay" onMouseDown={handleBackdropClick}>
      <section
        id="search-dialog"
        className="search-dialog"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="search-dialog-title"
      >
        <div className="search-dialog-heading">
          <div>
            <p className="eyebrow">Find your next fit</p>
            <h2 id="search-dialog-title">Search the catalog</h2>
            <p>Search by product, drop, audience, or category, then refine by price and sort order.</p>
          </div>
          <button
            type="button"
            className="search-dialog-close"
            aria-label="Close search"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <SearchBar onSubmitComplete={onClose} />
      </section>
    </div>
    </>,
    portalTarget
  );
}
