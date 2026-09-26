"use client";

import dynamic from "next/dynamic";

const CubeCanvas = dynamic(() => import("./cube-canvas"), {
  ssr: false,
  loading: () => <p role="status">Loading 3D check…</p>,
});

export function ThreeSanity() {
  return <CubeCanvas />;
}
