"use client";

import type { ReactNode } from "react";
import Link, { type LinkProps } from "next/link";
import { trackEvent } from "@/lib/analytics";

type TrackedLinkProps = Omit<LinkProps, "children"> & {
  children: ReactNode;
  className?: string;
  eventName?: string;
  parameters?: Record<string, string>;
};

export default function TrackedLink({
  children,
  eventName,
  parameters,
  ...linkProps
}: TrackedLinkProps) {
  return (
    <Link
      {...linkProps}
      onClick={() => {
        if (eventName && parameters) {
          trackEvent(eventName, parameters);
        }
      }}
    >
      {children}
    </Link>
  );
}
