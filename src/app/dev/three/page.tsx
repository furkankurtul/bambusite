import Link from "next/link";
import { notFound } from "next/navigation";
import { ThreeSanity } from "./three-sanity";

export default function ThreeSanityPage() {
  if (process.env.NODE_ENV !== "development") notFound();

  return (
    <main className="mx-auto max-w-3xl space-y-6 px-6 py-10">
      <Link href="/" className="text-sky-800 underline underline-offset-4">
        Back to foundation
      </Link>
      <h1 className="text-3xl font-semibold">3D dependency sanity check</h1>
      <p className="text-zinc-600">
        Development only. Drag to rotate; scroll or pinch to zoom. This cube is
        not the future STL viewer.
      </p>
      <ThreeSanity />
    </main>
  );
}
