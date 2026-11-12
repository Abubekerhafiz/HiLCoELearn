
import { useState } from "react";

function Auth({ onSubmit, error, loading }) {
  const [isSignUp, setIsSignUp] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    onSubmit({
      name,
      email,
      password,
      isSignUp,
    });
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-5 py-10 text-[var(--color-text)]">
      <div className="mx-auto flex min-h-[80vh] w-full max-w-md flex-col justify-center">

        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 grid size-14 place-items-center rounded-2xl bg-[var(--color-primary)] text-2xl font-bold text-white">
            H
          </div>

          <h1 className="text-3xl font-bold">
            HilcoeLearn
          </h1>

          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
            Your learning space, connected.
          </p>
        </div>

        {/* Authentication Card */}
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-7 shadow-lg sm:p-9">

          <h2 className="text-2xl font-bold">
            {isSignUp ? "Create your account" : "Welcome back"}
          </h2>

          <p className="mb-7 mt-2 text-sm text-[var(--color-text-secondary)]">
            {isSignUp
              ? "Join HilcoeLearn and start learning together."
              : "Sign in to continue to your learning space."}
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">

            {isSignUp && (
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Full name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Enter your full name"
                  required
                  className="w-full rounded-xl border border-[var(--color-border)] bg-transparent px-4 py-3 text-sm outline-none focus:border-[var(--color-primary)]"
                />
              </div>
            )}

            <div>
              <label className="mb-2 block text-sm font-medium">
                Email address
              </label>

              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                required
                className="w-full rounded-xl border border-[var(--color-border)] bg-transparent px-4 py-3 text-sm outline-none focus:border-[var(--color-primary)]"
              />
            </div>
            {error && (
                <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                 {error}
                 </p>
            )}

            <div>
              <label className="mb-2 block text-sm font-medium">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                required
                minLength={8}
                className="w-full rounded-xl border border-[var(--color-border)] bg-transparent px-4 py-3 text-sm outline-none focus:border-[var(--color-primary)]"
              />

              {isSignUp && (
                <p className="mt-2 text-xs text-[var(--color-text-secondary)]">
                  At least 8 characters, including uppercase,
                  lowercase, and a number.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-[var(--color-primary)] px-4 py-3 font-semibold text-white transition-opacity hover:opacity-90"
            >
              {isSignUp ? "Create account" : "Sign in"}
            </button>

          </form>

          <p className="mt-7 text-center text-sm text-[var(--color-text-secondary)]">
            {isSignUp
              ? "Already have an account?"
              : "Don't have an account?"}

            <button
              type="button"
              onClick={() => setIsSignUp((current) => !current)}
              className="ml-1 font-semibold text-[var(--color-primary)] hover:underline"
            >
              {isSignUp ? "Sign in" : "Sign up"}
            </button>
          </p>
        </div>

        <p className="mt-7 text-center text-xs text-[var(--color-text-muted)]">
          © 2026 HilcoeLearn. Built for students.
        </p>

      </div>
    </div>
  );
}

export default Auth;
