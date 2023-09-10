import { useRef } from "react";
import { Canvas } from "react-three-fiber";
import { VideoPlayer } from "./components/Videoplayer";
import { VRButton, XR, Controllers, Hands } from "@react-three/xr";
import "./App.css";

const App = () => {
  const containerRef = useRef<HTMLDivElement>(null);

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
