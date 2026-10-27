"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from "react";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type User = {
  id: string;
  name: string;
  email: string;
};

type AppStateValue = {
  user: User | null;
  savedIds: string[];
  authLoading: boolean;
  logout: () => Promise<void>;
  toggleSaved: (listingId: string) => void;
  isSaved: (listingId: string) => boolean;
};

const SAVED_KEY = "nova-stays-saved";

const AppStateContext = createContext<AppStateValue | null>(null);

function readLocalStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") {
    return fallback;
  }
  const storedValue = window.localStorage.getItem(key);
  if (!storedValue) {
    return fallback;
  }
  try {
    return JSON.parse(storedValue) as T;
  } catch (error) {
    console.error(`Invalid localStorage data for key "${key}".`, error);
    window.localStorage.removeItem(key);
    return fallback;
  }
}

type AppStateProviderProps = {
  children: ReactNode;
};

function mapSupabaseUser(authUser: SupabaseUser): User {
  const metadataName =
    typeof authUser.user_metadata?.name === "string" ? authUser.user_metadata.name.trim() : "";

  return {
    id: authUser.id,
    name: metadataName || authUser.email?.split("@")[0] || "there",
    email: authUser.email ?? ""
  };
}

export function AppStateProvider({ children }: AppStateProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    setSavedIds(readLocalStorage<string[]>(SAVED_KEY, []));
  }, []);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    let isMounted = true;

    void supabase.auth.getSession().then(({ data, error }) => {
      if (error) {
        console.error("Unable to restore the Supabase session.", error);
      }
      if (isMounted) {
        setUser(data.session?.user ? mapSupabaseUser(data.session.user) : null);
        setAuthLoading(false);
      }
    });

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (isMounted) {
        setUser(session?.user ? mapSupabaseUser(session.user) : null);
        setAuthLoading(false);
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(SAVED_KEY, JSON.stringify(savedIds));
    }
  }, [savedIds]);

  const logout = useCallback(async () => {
    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Unable to sign out of Supabase.", error);
      throw error;
    }
  }, []);

  const toggleSaved = useCallback((listingId: string) => {
    setSavedIds((current) =>
      current.includes(listingId)
        ? current.filter((id) => id !== listingId)
        : [...current, listingId]
    );
  }, []);

  const isSaved = useCallback(
    (listingId: string) => {
      return savedIds.includes(listingId);
    },
    [savedIds]
  );

  const value = useMemo(
    () => ({ user, savedIds, authLoading, logout, toggleSaved, isSaved }),
    [user, savedIds, authLoading, logout, toggleSaved, isSaved]
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppState must be used within AppStateProvider.");
  }
  return context;
}
