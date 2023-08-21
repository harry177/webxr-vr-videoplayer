import { Canvas } from "react-three-fiber";
import { Controllers, Hands, VRButton, XR } from "@react-three/xr";
import { VideoPlayer } from "./components/Videoplayer";

function App() {
  return (
    <>
      <VRButton />
      <Canvas>
        <XR>
          <Controllers />
          <Hands />
          <VideoPlayer videoUrl="https://www.youtube.com/watch?v=dQw4w9WgXcQ" />
        </XR>
      </Canvas>
    </>
  );
}

export default App;
