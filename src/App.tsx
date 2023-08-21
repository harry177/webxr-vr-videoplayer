import React, { useEffect, useRef, useState } from "react";
import { Canvas } from "react-three-fiber";
import { VRButton } from "three/examples/jsm/webxr/VRButton.js";
import { VideoPlayer } from "./components/VideoPlayer";
import "./App.css";
import * as THREE from "three";

const App = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [isVR, setIsVR] = useState<boolean>(false);

  useEffect(() => {
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    const container = containerRef.current!;
    renderer.setSize(container.clientWidth, container.clientHeight);
    const vrButton = VRButton.createButton(renderer);
    document.body.appendChild(vrButton);

    const handleVRSession = () => {
      setIsVR(true);
    };

    vrButton.addEventListener('click', handleVRSession);

  }, []);

  return (
    <div className="App" ref={containerRef}>
      <Canvas {...{ vr: true }}>
        {isVR && <VideoPlayer />}
      </Canvas>
    </div>
  );
};

export default App;
