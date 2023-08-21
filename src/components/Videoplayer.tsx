import { MutableRefObject, useRef } from "react";
import { useFrame } from "react-three-fiber";
import { Environment, Html, PresentationControls} from "@react-three/drei";
import { Mesh, MeshBasicMaterial } from "three";
import * as THREE from "three";
import "./VideoPlayer.css";

type CustomRef = MutableRefObject<THREE.Object3D | null>;

export const VideoPlayer = () => {
  const videoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ";

  const displayRef = useRef<THREE.Object3D>(null!);

  useFrame((_, delta) => { if (displayRef.current) {
    displayRef.current.rotation.x += 1 * delta
    displayRef.current.rotation.y += 0.5 * delta
  }
    
  })

  const width = 8.0;
  const height = 5.0;
  const depth = 1.5;

  const geometry = new THREE.BoxGeometry(width, height, depth);
  const material = new MeshBasicMaterial({ color: 0x00ff00 });
  const boxMesh = new Mesh(geometry, material);

  return (
    <>
      <Environment preset="warehouse" />
      <PresentationControls>
        <primitive object={boxMesh}  rotateX >
          <Html rotation-x={0.20} rotation-y={0.12} transform>
            <iframe
              title="rick"
              src={videoUrl}
            />
          </Html>
        </primitive>
      </PresentationControls>
    </>
  );
};
