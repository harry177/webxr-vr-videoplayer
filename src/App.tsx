import { useRef, useState } from "react";
import { Canvas } from "react-three-fiber";
//import { VRButton } from "three/examples/jsm/webxr/VRButton.js";
import { VideoPlayer } from "./components/VideoPlayer";
import { VRButton, XR, Controllers, Hands } from "@react-three/xr";
import "./App.css";

interface CanvasProps extends React.HTMLAttributes<HTMLCanvasElement> {
  vr?: string;
}

const App: React.FC<CanvasProps> = (vr) => {
  const containerRef = useRef<HTMLDivElement>(null);

  //const [isVR, setIsVR] = useState<boolean>(false);

  /*useEffect(() => {
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    const container = containerRef.current!;
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.xr.enabled = true;
    container.appendChild(renderer.domElement);

    const vrButton = VRButton.createButton(renderer);
    document.body.appendChild(vrButton);

    const handleVRSession = () => {
      setIsVR(true);
    };

    vrButton.addEventListener('click', handleVRSession);

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
