"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthForm from "@/components/AuthForm";
import { useAppState } from "@/context/AppStateContext";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const { login, user } = useAppState();
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);

  return (
    <main>
      <section className="section-block auth-panel">
        <p className="eyebrow">Account</p>
        <h1 className="page-title">Log in</h1>
        <p>Access your wishlist and pick up where you left off.</p>
        {user ? (
          <div className="notice">
            <p>You are currently logged in as {user.email}.</p>
            <button type="button" className="button primary" onClick={() => router.push("/saved")}>
              Go to wishlist
            </button>
          </div>
        ) : (
          <AuthForm
            mode="login"
            onSubmit={async ({ email, password }) => {
              const { error } = await supabase.auth.signInWithPassword({
                email,
                password
              });

              if (error) {
                return { error: error.message};
              }

              login(email, password);
              router.push("/saved");
            }}
          />
        )}
        <p className="inline-link">
          New here? <Link href="/signup">Create an account</Link>
        </p>
      </section>
    </main>
  );
}
