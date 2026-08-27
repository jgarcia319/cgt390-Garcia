"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthForm from "@/components/AuthForm";
import { useAppState } from "@/context/AppStateContext";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const router = useRouter();
  const { signup, user } = useAppState();
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const [message, setMessage] = useState<string | null>(null);

  return (
    <main>
      <section className="section-block auth-panel">
        <p className="eyebrow">Account</p>
        <h1 className="page-title">Sign up</h1>
        <p>Create a free account to save your favorite fictional products.</p>
        {user ? (
          <div className="notice">
            <p>You are already signed in as {user.email}.</p>
            <button type="button" className="button primary" onClick={() => router.push("/saved")}>
              View wishlist
            </button>
          </div>
        ) : (
          <AuthForm
            mode="signup"
            onSubmit={async ({ name, email, password }) => {
              const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                  data: {
                    name
                  }
                }
              });

              if (error) {
                return { error: error.message };
              }

              if (data.session) {
                signup(name ?? "", email, password);
                router.push("/saved");
                return;
              }

              return { message: "Account created. Check your email to confirm your account, then log in." };
            }}
          />
        )}
        {message ? <p className="notice-text">{message}</p> : null}
        <p className="inline-link">
          Already have an account? <Link href="/login">Log in</Link>
        </p>
      </section>
    </main>
  );
}
