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

type User = {
  name: string;
  email: string;
};

type AppStateValue = {
  user: User | null;
  savedIds: string[];
  login: (email: string, password: string) => void;
  signup: (name: string, email: string, password: string) => void;
  logout: () => void;
  toggleSaved: (listingId: string) => void;
  isSaved: (listingId: string) => boolean;
};

const USER_KEY = "nova-stays-user";
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

export function AppStateProvider({ children }: AppStateProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [savedIds, setSavedIds] = useState<string[]>([]);

  useEffect(() => {
    setUser(readLocalStorage<User | null>(USER_KEY, null));
    setSavedIds(readLocalStorage<string[]>(SAVED_KEY, []));
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(SAVED_KEY, JSON.stringify(savedIds));
    }
  }, [savedIds]);

  const login = useCallback((email: string, password: string) => {
    if (!email || !password) {
      throw new Error("Email and password are required.");
    }
    const fallbackName = email.split("@")[0];
    setUser({ name: fallbackName, email });
  }, []);

  const signup = useCallback((name: string, email: string, password: string) => {
    if (!name || !email || !password) {
      throw new Error("Name, email, and password are required.");
    }
    setUser({ name, email });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
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
    () => ({ user, savedIds, login, signup, logout, toggleSaved, isSaved }),
    [user, savedIds, login, signup, logout, toggleSaved, isSaved]
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
