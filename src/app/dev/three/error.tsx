"use client";

import Link from "next/link";

export default function ThreeSanityError({ reset }: { reset: () => void }) {
  return (
    <main className="mx-auto max-w-3xl space-y-4 px-6 py-10">
      <h1 className="text-2xl font-semibold">The 3D check could not start</h1>
      <p>Check browser WebGL support and try again.</p>
      <button onClick={reset} className="rounded border px-4 py-2">
        Try again
      </button>
      <p>
        <Link href="/" className="text-sky-800 underline">
          Back to foundation
        </Link>
      </p>
    </main>
  );
}
