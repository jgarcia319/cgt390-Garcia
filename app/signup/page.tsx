"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthForm from "@/components/AuthForm";
import { useAppState } from "@/context/AppStateContext";

export default function SignupPage() {
  const router = useRouter();
  const { signup, user } = useAppState();

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
            onSubmit={({ name, email, password }) => {
              signup(name ?? "", email, password);
              router.push("/saved");
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
