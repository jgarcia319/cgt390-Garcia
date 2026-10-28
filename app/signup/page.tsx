"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthForm from "@/components/AuthForm";
import { useAppState } from "@/context/AppStateContext";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const router = useRouter();
  const { user, authLoading } = useAppState();

  return (
    <main>
      <section className="section-block auth-panel">
        <p className="eyebrow">Account</p>
        <h1 className="page-title">Sign up</h1>
        <p>Create a free account to save your favorite fictional products.</p>
        {authLoading ? (
          <p>Loading account...</p>
        ) : user ? (
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
              const supabase = createSupabaseBrowserClient();
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
                if (
                  error.message.toLowerCase().includes("already registered") ||
                  error.message.toLowerCase().includes("already exists")
                ) {
                  return { error: "An account with this email already exists. Please log in instead." };
                }
                return { error: error.message };
              }

              if (data.user && data.user.identities?.length === 0) {
                return { error: "An account with this email already exists. Please log in instead." };
              }

              if (data.session) {
                router.push("/saved");
                return;
              }

              return { message: "Account created. Check your email to confirm your account, then log in." };
            }}
          />
        )}
        <p className="inline-link">
          Already have an account? <Link href="/login">Log in</Link>
        </p>
      </section>
    </main>
  );
}
