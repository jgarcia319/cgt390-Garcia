"use client";

import type { ReactNode } from "react";
import { AppStateProvider } from "@/context/AppStateContext";

type ProvidersProps = {
  children: ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  return <AppStateProvider>{children}</AppStateProvider>;
}
