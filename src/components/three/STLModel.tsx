"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Box3,
  BufferGeometry,
  Euler,
  Matrix4,
  MeshStandardMaterial,
  Sphere,
  Vector3,
} from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import { withBasePath } from "@/config/deployment";

export interface ModelBounds {
  readonly center: Vector3;
  readonly radius: number;
  readonly size: Vector3;
}

export type ModelLoadState =
  | { readonly progress?: number; readonly status: "loading" }
  | { readonly status: "error" }
  | {
      readonly bounds: ModelBounds;
      readonly geometry: BufferGeometry;
      readonly status: "ready";
    };

export function useSTLGeometry(
  modelUrl: string,
  rotation: readonly [number, number, number],
  scale: number,
): ModelLoadState {
  const [state, setState] = useState<ModelLoadState>({ status: "loading" });
  const [rotationX, rotationY, rotationZ] = rotation;

  useEffect(() => {
    let active = true;
    let ownedGeometry: BufferGeometry | undefined;
    const loader = new STLLoader();

    loader.load(
      withBasePath(modelUrl),
      (geometry) => {
        try {
          const prepared = prepareGeometry(
            geometry,
            [rotationX, rotationY, rotationZ],
            scale,
          );
          ownedGeometry = prepared.geometry;

          if (!active) {
            ownedGeometry.dispose();
            ownedGeometry = undefined;
            return;
          }

          setState({
            status: "ready",
            geometry: prepared.geometry,
            bounds: prepared.bounds,
          });
        } catch {
          geometry.dispose();
          if (active) {
            setState({ status: "error" });
          }
        }
      },
      (event) => {
        if (!active || event.total <= 0) return;
        const progress = Math.min(
          100,
          Math.round((event.loaded / event.total) * 100),
        );
        setState({ status: "loading", progress });
      },
      () => {
        if (active) {
          setState({ status: "error" });
        }
      },
    );

    return () => {
      active = false;
      ownedGeometry?.dispose();
    };
  }, [modelUrl, rotationX, rotationY, rotationZ, scale]);

  return state;
}

interface STLModelProps {
  readonly color: string;
  readonly geometry: BufferGeometry;
}

export function STLModel({ color, geometry }: STLModelProps) {
  const material = useMemo(
    () =>
      new MeshStandardMaterial({
        color: "#71717A",
        flatShading: true,
        metalness: 0.02,
        roughness: 0.68,
      }),
    [],
  );

  useEffect(() => {
    material.color.set(color);
  }, [color, material]);

  useEffect(() => () => material.dispose(), [material]);

  return <mesh dispose={null} geometry={geometry} material={material} />;
}

function prepareGeometry(
  geometry: BufferGeometry,
  rotation: readonly [number, number, number],
  scale: number,
): { readonly bounds: ModelBounds; readonly geometry: BufferGeometry } {
  if (!geometry.getAttribute("position")) {
    throw new Error("STL geometry has no position data.");
  }

  if (!geometry.getAttribute("normal")) geometry.computeVertexNormals();

  geometry.computeBoundingBox();
  if (!geometry.boundingBox || geometry.boundingBox.isEmpty()) {
    throw new Error("STL geometry has empty bounds.");
  }

  // Transformation order: center raw STL bounds, apply configured XYZ rotation,
  // then apply uniform scale before recomputing the camera-fitting bounds.
  geometry.center();
  geometry.applyMatrix4(
    new Matrix4().makeRotationFromEuler(
      new Euler(rotation[0], rotation[1], rotation[2], "XYZ"),
    ),
  );
  geometry.scale(scale, scale, scale);
  geometry.computeBoundingBox();
  geometry.computeBoundingSphere();

  const boundingBox = geometry.boundingBox ?? new Box3();
  const boundingSphere = geometry.boundingSphere ?? new Sphere();
  const size = boundingBox.getSize(new Vector3());
  const radius = boundingSphere.radius;

  if (
    !Number.isFinite(radius) ||
    radius <= 0 ||
    !Number.isFinite(size.x) ||
    !Number.isFinite(size.y) ||
    !Number.isFinite(size.z)
  ) {
    throw new Error("STL geometry has invalid bounds.");
  }

  return {
    geometry,
    bounds: {
      center: boundingSphere.center.clone(),
      radius,
      size: size.clone(),
    },
  };
}
