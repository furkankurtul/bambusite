"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { MathUtils } from "three";

export default function CubeCanvas() {
  return (
    <div
      className="h-80 overflow-hidden rounded-xl border border-zinc-300 bg-white sm:h-96"
      role="img"
      aria-label="Interactive blue cube used to verify 3D rendering"
    >
      <Canvas
        frameloop="demand"
        dpr={[1, 2]}
        camera={{ position: [3, 3, 3], fov: 45 }}
        fallback={
          <p className="p-6">
            WebGL is unavailable. Try a browser with hardware acceleration.
          </p>
        }
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[4, 5, 3]} intensity={2} />
        <mesh rotation={[0, MathUtils.degToRad(15), 0]}>
          <boxGeometry args={[1.5, 1.5, 1.5]} />
          <meshStandardMaterial color="#0284c7" />
        </mesh>
        <OrbitControls
          makeDefault
          enablePan={false}
          minDistance={3}
          maxDistance={10}
        />
      </Canvas>
    </div>
  );
}
