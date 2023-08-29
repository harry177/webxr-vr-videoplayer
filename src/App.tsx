import { useRef, useState } from "react";
import { Canvas } from "react-three-fiber";
import { VideoPlayer } from "./components/VideoPlayer";
import { VRButton, XR, Controllers, Hands } from "@react-three/xr";
import "./App.css";

const App = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [session, setSession] = useState<boolean>(false);

  return (
    <div className="App" ref={containerRef}>
      <VRButton />
      <Canvas>
        <XR onSessionStart={() => setSession(true)} onSessionEnd={() => setSession(false)}>
          {session && (
            <>
              <Controllers />
              <Hands />
              <VideoPlayer />
            </>
          )}
        </XR>
      </Canvas>
    </div>
  );
};

export default App;
