import React, { useRef } from "react";
import { useFrame } from "react-three-fiber";
import * as THREE from "three";

interface VideoPlaneProps {
  videoUrl: string;
}

export const VideoPlayer: React.FC<VideoPlaneProps> = ({ videoUrl }) => {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x += 0.01;
      mesh.current.rotation.y += 0.01;
    }
  });

  const textureLoader = new THREE.TextureLoader();
  const videoTexture = textureLoader.load(videoUrl);

  const material = new THREE.MeshBasicMaterial({ map: videoTexture });
  const geometry = new THREE.BufferGeometry();

  geometry.setFromPoints([
    new THREE.Vector3(-1, -1, 0),
    new THREE.Vector3(1, -1, 0),
    new THREE.Vector3(1, 1, 0),
    new THREE.Vector3(-1, 1, 0),
  ]);

  return (
    <mesh ref={mesh}>
      <primitive attach="geometry" object={geometry} />
      <primitive attach="material" object={material} />
    </mesh>
  );
};
