"use client";

import {
  type ComponentRef,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import {
  AlertTriangle,
  LoaderCircle,
  Pause,
  Play,
  RotateCcw,
} from "lucide-react";
import { MathUtils, PerspectiveCamera, TOUCH, Vector3 } from "three";
import { ProductColorSelector } from "@/components/product/ProductColorSelector";
import type { Product, ProductColor } from "@/types/product";
import { STLModel, type ModelBounds, useSTLGeometry } from "./STLModel";
import { ViewerErrorBoundary } from "./ViewerErrorBoundary";

const DEFAULT_MODEL_COLOR: ProductColor = {
  name: "Neutral gray",
  hex: "#71717A",
};
const DEFAULT_ROTATION = [0, 0, 0] as const;

interface ModelViewerProps {
  readonly colors: Product["colors"];
  readonly model: NonNullable<Product["model"]>;
  readonly modelConfig: Product["modelConfig"];
  readonly onColorChange: (color: ProductColor) => void;
  readonly selectedColor: ProductColor | undefined;
}

export function ModelViewer({
  colors,
  model,
  modelConfig,
  onColorChange,
  selectedColor,
}: ModelViewerProps) {
  const availableColors = colors ?? [];
  const activeColor = selectedColor ?? DEFAULT_MODEL_COLOR;
  const [retryVersion, setRetryVersion] = useState(0);
  const [runtimeFailed, setRuntimeFailed] = useState(false);
  const [webGLAvailable] = useState(canUseWebGL);
  const rotation = modelConfig?.initialRotation ?? DEFAULT_ROTATION;
  const scale = modelConfig?.scale ?? 1;

  const retry = useCallback(() => {
    setRuntimeFailed(false);
    setRetryVersion((version) => version + 1);
  }, []);
  const handleRuntimeFailure = useCallback(() => setRuntimeFailed(true), []);

  let viewerContent;
  if (!webGLAvailable) {
    viewerContent = (
      <ViewerFailure
        message="WebGL is unavailable in this browser or device."
        retryLabel={undefined}
      />
    );
  } else if (runtimeFailed) {
    viewerContent = (
      <ViewerFailure
        message="The interactive preview stopped unexpectedly."
        onRetry={retry}
        retryLabel="Restart viewer"
      />
    );
  } else {
    viewerContent = (
      <ModelLoader
        color={activeColor.hex}
        key={`${model}:${retryVersion}`}
        model={model}
        onRuntimeFailure={handleRuntimeFailure}
        onRetry={retry}
        retryVersion={retryVersion}
        rotation={rotation}
        scale={scale}
      />
    );
  }

  return (
    <div className="bg-white text-zinc-950">
      <div className="relative aspect-[4/3] min-h-72 overflow-hidden bg-zinc-100">
        {viewerContent}
      </div>
      {availableColors.length > 0 && (
        <div className="border-t border-zinc-200 p-4 sm:p-5">
          <ProductColorSelector
            colors={availableColors}
            onChange={onColorChange}
            selectedColor={activeColor}
          />
        </div>
      )}
    </div>
  );
}

interface ModelLoaderProps {
  readonly color: string;
  readonly model: string;
  readonly onRetry: () => void;
  readonly onRuntimeFailure: () => void;
  readonly retryVersion: number;
  readonly rotation: readonly [number, number, number];
  readonly scale: number;
}

function ModelLoader({
  color,
  model,
  onRetry,
  onRuntimeFailure,
  retryVersion,
  rotation,
  scale,
}: ModelLoaderProps) {
  const loadState = useSTLGeometry(model, rotation, scale);

  if (loadState.status === "loading") {
    return <ViewerLoading progress={loadState.progress} />;
  }

  if (loadState.status === "error") {
    return (
      <ViewerFailure
        message={loadState.message}
        onRetry={onRetry}
        retryLabel="Try again"
      />
    );
  }

  return (
    <ViewerErrorBoundary
      fallback={
        <ViewerFailure
          message="The 3D preview could not be displayed."
          onRetry={onRetry}
          retryLabel="Restart viewer"
        />
      }
      key={retryVersion}
    >
      <ModelCanvas
        bounds={loadState.bounds}
        color={color}
        geometry={loadState.geometry}
        onRuntimeFailure={onRuntimeFailure}
      />
    </ViewerErrorBoundary>
  );
}

interface ModelCanvasProps {
  readonly bounds: ModelBounds;
  readonly color: string;
  readonly geometry: Extract<
    ReturnType<typeof useSTLGeometry>,
    { status: "ready" }
  >["geometry"];
  readonly onRuntimeFailure: () => void;
}

function ModelCanvas({
  bounds,
  color,
  geometry,
  onRuntimeFailure,
}: ModelCanvasProps) {
  const [autoRotate, setAutoRotate] = useState(
    () =>
      typeof window !== "undefined" &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [resetVersion, setResetVersion] = useState(0);
  const [userInteracted, setUserInteracted] = useState(false);

  const stopForInteraction = useCallback(() => {
    setUserInteracted(true);
    setAutoRotate(false);
  }, []);

  const resetView = useCallback(() => {
    setUserInteracted(false);
    setResetVersion((version) => version + 1);
  }, []);

  return (
    <>
      <div
        aria-label="Interactive 3D model. Drag horizontally to rotate and scroll or pinch to zoom."
        className="product-model-canvas absolute inset-0"
        role="group"
      >
        <Canvas
          camera={{ fov: 42, near: 0.1, far: 10_000, position: [1, 1, 1] }}
          dpr={[1, 1.75]}
          gl={{ antialias: true, powerPreference: "high-performance" }}
          style={{ touchAction: "pan-y" }}
        >
          <color args={["#f4f4f5"]} attach="background" />
          <hemisphereLight
            color="#ffffff"
            groundColor="#71717a"
            intensity={2.1}
          />
          <directionalLight intensity={2.8} position={[3, 5, 4]} />
          <directionalLight intensity={1.4} position={[-4, 2, -3]} />
          <ModelScene
            autoRotate={autoRotate}
            bounds={bounds}
            color={color}
            geometry={geometry}
            onInteract={stopForInteraction}
            onRuntimeFailure={onRuntimeFailure}
            resetVersion={resetVersion}
            userInteracted={userInteracted}
          />
        </Canvas>
      </div>

      <div className="absolute right-3 top-3 z-10 flex flex-col gap-2 sm:flex-row">
        <ViewerButton label="Reset view" onClick={resetView}>
          <RotateCcw aria-hidden="true" className="size-4" />
          <span className="hidden sm:inline">Reset</span>
        </ViewerButton>
        <ViewerButton
          label={
            autoRotate ? "Pause automatic rotation" : "Start automatic rotation"
          }
          onClick={() => setAutoRotate((enabled) => !enabled)}
          pressed={autoRotate}
        >
          {autoRotate ? (
            <Pause aria-hidden="true" className="size-4" />
          ) : (
            <Play aria-hidden="true" className="size-4" />
          )}
          <span className="hidden sm:inline">Auto rotate</span>
        </ViewerButton>
      </div>

      <p className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-zinc-600 shadow-sm backdrop-blur-sm">
        Drag to rotate · Scroll or pinch to zoom
      </p>
    </>
  );
}

interface ModelSceneProps extends ModelCanvasProps {
  readonly autoRotate: boolean;
  readonly onInteract: () => void;
  readonly resetVersion: number;
  readonly userInteracted: boolean;
}

function ModelScene({
  autoRotate,
  bounds,
  color,
  geometry,
  onInteract,
  onRuntimeFailure,
  resetVersion,
  userInteracted,
}: ModelSceneProps) {
  const controlsRef = useRef<ComponentRef<typeof OrbitControls>>(null);
  const needsFit = useRef(true);
  const { camera, gl, size } = useThree();

  useEffect(() => {
    if (!userInteracted) needsFit.current = true;
  }, [size.height, size.width, userInteracted]);

  useEffect(() => {
    needsFit.current = true;
  }, [resetVersion]);

  useEffect(() => {
    const canvas = gl.domElement;
    const handleContextLoss = (event: Event) => {
      event.preventDefault();
      onRuntimeFailure();
    };

    canvas.addEventListener("webglcontextlost", handleContextLoss);

    return () => {
      canvas.removeEventListener("webglcontextlost", handleContextLoss);
    };
  }, [gl, onRuntimeFailure]);

  useFrame(() => {
    const controls = controlsRef.current;
    if (
      !needsFit.current ||
      !controls ||
      !(camera instanceof PerspectiveCamera)
    )
      return;

    fitCameraToBounds(camera, controls, bounds, size.width / size.height);
    needsFit.current = false;
  });

  return (
    <>
      <STLModel color={color} geometry={geometry} />
      <OrbitControls
        autoRotate={autoRotate}
        autoRotateSpeed={0.55}
        dampingFactor={0.08}
        enableDamping
        enablePan={false}
        makeDefault
        maxDistance={bounds.radius * 12}
        minDistance={bounds.radius * 1.15}
        onStart={onInteract}
        ref={controlsRef}
        rotateSpeed={0.65}
        target={bounds.center}
        touches={{ ONE: TOUCH.ROTATE, TWO: TOUCH.DOLLY_PAN }}
        zoomSpeed={0.75}
      />
    </>
  );
}

function fitCameraToBounds(
  camera: PerspectiveCamera,
  controls: NonNullable<ComponentRef<typeof OrbitControls>>,
  bounds: ModelBounds,
  aspect: number,
) {
  const verticalFov = MathUtils.degToRad(camera.fov);
  const horizontalFov = 2 * Math.atan(Math.tan(verticalFov / 2) * aspect);
  const limitingFov = Math.min(verticalFov, horizontalFov);
  const distance = (bounds.radius / Math.sin(limitingFov / 2)) * 1.18;
  const viewDirection = new Vector3(1, 0.7, 1).normalize();

  camera.position.copy(bounds.center).addScaledVector(viewDirection, distance);
  camera.near = Math.max(bounds.radius * 0.01, 0.001);
  camera.far = Math.max(distance + bounds.radius * 20, camera.near + 1);
  camera.lookAt(bounds.center);
  camera.updateProjectionMatrix();

  controls.target.copy(bounds.center);
  controls.minDistance = bounds.radius * 1.15;
  controls.maxDistance = Math.max(distance * 4, bounds.radius * 12);
  controls.update();
}

interface ViewerButtonProps {
  readonly children: ReactNode;
  readonly label: string;
  readonly onClick: () => void;
  readonly pressed?: boolean;
}

function ViewerButton({
  children,
  label,
  onClick,
  pressed,
}: ViewerButtonProps) {
  return (
    <button
      aria-label={label}
      aria-pressed={pressed}
      className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-black/10 bg-white/90 px-2.5 text-xs font-semibold text-zinc-800 shadow-sm backdrop-blur-sm transition hover:bg-white"
      onClick={onClick}
      title={label}
      type="button"
    >
      {children}
    </button>
  );
}

function ViewerLoading({ progress }: { readonly progress?: number }) {
  return (
    <div className="flex size-full flex-col items-center justify-center px-8 text-center text-zinc-700">
      <LoaderCircle
        aria-hidden="true"
        className="size-7 animate-spin motion-reduce:animate-none"
      />
      <p className="mt-3 text-sm font-semibold" role="status">
        Loading 3D model{progress === undefined ? "…" : `… ${progress}%`}
      </p>
      {progress !== undefined && (
        <div
          aria-label="3D model loading progress"
          aria-valuemax={100}
          aria-valuemin={0}
          aria-valuenow={progress}
          className="mt-4 h-1.5 w-40 overflow-hidden rounded-full bg-zinc-300"
          role="progressbar"
        >
          <div
            className="h-full rounded-full bg-zinc-800 transition-[width] motion-reduce:transition-none"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}

interface ViewerFailureProps {
  readonly message: string;
  readonly onRetry?: () => void;
  readonly retryLabel: string | undefined;
}

function ViewerFailure({ message, onRetry, retryLabel }: ViewerFailureProps) {
  return (
    <div className="flex size-full flex-col items-center justify-center px-8 text-center text-zinc-700">
      <span className="flex size-12 items-center justify-center rounded-2xl border border-zinc-200 bg-white shadow-sm">
        <AlertTriangle aria-hidden="true" className="size-6" />
      </span>
      <p className="mt-4 text-base font-semibold text-zinc-950">
        3D preview unavailable
      </p>
      <p className="mt-1 max-w-sm text-sm leading-6">{message}</p>
      {onRetry && retryLabel && (
        <button
          className="mt-5 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm font-semibold text-zinc-800 hover:border-zinc-400"
          onClick={onRetry}
          type="button"
        >
          {retryLabel}
        </button>
      )}
    </div>
  );
}

function canUseWebGL(): boolean {
  if (typeof document === "undefined") return false;

  try {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("webgl2") || canvas.getContext("webgl");

    context?.getExtension("WEBGL_lose_context")?.loseContext();
    return Boolean(context);
  } catch {
    return false;
  }
}
