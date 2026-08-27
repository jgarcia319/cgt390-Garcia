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
  onSubmit: (values: AuthFormValues) => void;
};

export default function AuthForm({ mode, onSubmit }: AuthFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const isSignup = mode === "signup";

  const submitForm = (event: FormEvent) => {
    event.preventDefault();
    setError(null);

    try {
      if (isSignup) {
        if (!name.trim()) {
          throw new Error("Please enter your name.");
        }
        onSubmit({ name: name.trim(), email: email.trim(), password });
      } else {
        onSubmit({ email: email.trim(), password });
      }
    } catch (submissionError) {
      if (submissionError instanceof Error) {
        setError(submissionError.message);
        return;
      }
      setError("Something went wrong. Please try again.");
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

      <button className="button primary" type="submit">
        {isSignup ? "Create account" : "Log in"}
      </button>
    </form>
  );
}
