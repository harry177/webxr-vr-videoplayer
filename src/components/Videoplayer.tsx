import { useRef, useState } from "react";
import { useFrame, useThree } from "react-three-fiber";
import { Environment, Html, PresentationControls } from "@react-three/drei";
import { useXR } from "@react-three/xr";
import { Mesh, MeshStandardMaterial } from "three";
import * as THREE from "three";
import image from '../assets/texture.jpg';
import "./VideoPlayer.css";

export const VideoPlayer = () => {
  const videoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ";

  const videoRef = useRef<HTMLIFrameElement>(null);

  /*const displayRef = useRef<THREE.Object3D>(null!);

  useFrame((_, delta) => {
    if (displayRef.current) {
      displayRef.current.rotation.x += 1 * delta;
      displayRef.current.rotation.y += 0.5 * delta;
    }
  });*/

  const [videoPlaying, setVideoPlaying] = useState(false);

  const handleSphereSelect = () => {
    setVideoPlaying(!videoPlaying);
  };

  const { scene } = useThree();

  const width = 8.0;
  const height = 5.0;
  const depth = 1.5;


  const geometry = new THREE.BoxGeometry(width, height, depth);
  const texture = new THREE.TextureLoader().load(image);
  const material = new MeshStandardMaterial({ map: texture });
  //material.transparent = false;
  const boxMesh = new Mesh(geometry, material);

  const player = useXR((state) => state.player);
  const controllers = useXR((state) => state.controllers);

  player.position.set(0, 0, 6);
  controllers.forEach((controller) => {
    controller.position.set(0, 0, 1);
  })

  

  const geoSphere = new THREE.SphereGeometry( 1, 12, 12 ); 
  const matSphereOne = new THREE.MeshBasicMaterial( { color: 0x42f55a } );
  const matSphereTwo = new THREE.MeshBasicMaterial( { color: 0xed2e11 } );
  const sphereOne = new THREE.Mesh( geoSphere, matSphereOne );
  sphereOne.position.set(-2, 5, 0);
  sphereOne.addEventListener('select', handleSphereSelect);
  const sphereTwo = new THREE.Mesh( geoSphere, matSphereTwo );
  sphereTwo.position.set(2, 5, 0);

  /*sphereOne.addEventListener('select', () => {
    if (videoRef.current?.contentWindow?.document.querySelector('video')?.paused) {
      videoRef.current.contentWindow?.document.querySelector('video')?.play();
    }
  })*/

  const properties = {
    allow: "xr-spatial-tracking",
    allowvr: "yes"
 }

  return (
    <>
      <Environment preset="warehouse" />
      <PresentationControls>
        <primitive object={boxMesh}>
          <Html className="content" transform position={[0, 0, 0.79]} occlude>
            <iframe title="rick" src={videoUrl} ref={videoRef} {...properties} />
          </Html>
        </primitive>
        <primitive object={sphereOne}/>
        <primitive object={sphereTwo}/>
      </PresentationControls>
    </>
  );
};
