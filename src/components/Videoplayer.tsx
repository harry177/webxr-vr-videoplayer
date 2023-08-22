import { useRef } from "react";
import { useFrame, useThree } from "react-three-fiber";
import { Environment, Html, PresentationControls } from "@react-three/drei";
import { useXR } from "@react-three/xr";
import { Mesh, MeshBasicMaterial } from "three";
import * as THREE from "three";
import "./VideoPlayer.css";

export const VideoPlayer = () => {
  const videoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ";

  const displayRef = useRef<THREE.Object3D>(null!);

  useFrame((_, delta) => {
    if (displayRef.current) {
      displayRef.current.rotation.x += 1 * delta;
      displayRef.current.rotation.y += 0.5 * delta;
    }
  });

  const width = 8.0;
  const height = 5.0;
  const depth = 1.5;

  const geometry = new THREE.BoxGeometry(width, height, depth);
  const material = new MeshBasicMaterial({ color: 0x00ff00 });
  const boxMesh = new Mesh(geometry, material);

  const player = useXR((state) => state.player);

  player.position.set(0, 1, 5);

  const { camera } = useThree();


  return (
    <>
      <Environment preset="warehouse" />
      <PresentationControls>
        <primitive object={boxMesh} rotateX>
          <Html rotation-x={0.2} rotation-y={0.12} transform>
            <iframe title="rick" src={videoUrl} />
          </Html>
        </primitive>
      </PresentationControls>
    </>
  );
};
