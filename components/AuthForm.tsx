"use client";

import { useState } from "react";
import type { FormEvent } from "react";

type AuthFormValues = {
  name?: string;
  email: string;
  password: string;
};

type AuthFormProps = {
  mode: "login" | "signup";
  onSubmit: (
    values: AuthFormValues
  ) => Promise<{ error?: string; message?: string } | void>;
};

export default function AuthForm({ mode, onSubmit }: AuthFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isSignup = mode === "signup";

  const submitForm = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    if (isSignup && !trimmedName) {
      setError("Enter your name.");
      return;
    }
    if (!trimmedEmail) {
      setError("Enter an email address.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError("Enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Enter a password.");
      return;
    }
    if (isSignup && password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await onSubmit(
        isSignup
          ? { name: trimmedName, email: trimmedEmail, password }
          : { email: trimmedEmail, password }
      );

      if (result?.error) {
        setError(result.error);
        return;
      }

      if (result?.message) {
        setError(result.message);
        return;
      }
    } catch (caughtError) {
      console.error("Authentication form submission failed.", caughtError);
      setError("Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={submitForm}>
      {isSignup ? (
        <label className="field">
          <span>Name</span>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Rae Walker"
          />
        </label>
      ) : null}

      <label className="field">
        <span>Email</span>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
        />
      </label>

      <label className="field">
        <span>Password</span>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Minimum 8 characters"
        />
      </label>

      {error ? <p className="form-error">{error}</p> : null}

      <button className="button primary" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Please wait..." : isSignup ? "Create account" : "Log in"}
      </button>
    </form>
  );
}
