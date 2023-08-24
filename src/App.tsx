import { useEffect, useRef } from "react";
import { Canvas } from "react-three-fiber";
import { VideoPlayer } from "./components/VideoPlayer";
import { VRButton, XR, Controllers, Hands } from "@react-three/xr";
import "./App.css";
import * as THREE from "three";

const App = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  

  /*useEffect(() => {
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    const container = containerRef.current!;
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.xr.enabled = true;
    container.appendChild(renderer.domElement);


  }, []);*/

  return (
    <div className="App" ref={containerRef}>
      <VRButton />
      <Canvas>
        <XR>
          <Controllers />
          <Hands />
          <VideoPlayer />
        </XR>
      </Canvas>
    </div>
  );
};

export default App;
