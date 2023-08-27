import { useEffect, useRef } from "react";
import { Canvas } from "react-three-fiber";
import { VideoPlayer } from "./components/VideoPlayer";
import { VRButton, XR, Controllers, Hands } from "@react-three/xr";
import { toggleSession } from '@react-three/xr'
import "./App.css";

const App = () => {
  const containerRef = useRef<HTMLDivElement>(null);


/*useEffect(() => {
  const handleClick = async () => {
    const session = await toggleSession('immersive-vr', {sessionInit: {requiredFeatures: ["local"], optionalFeatures: ["layers"]}})
    if (session) {
      button.innerText = 'Exit VR'
    } else {
      button.innerText = 'Enter VR'
    }
  }
  
  const button = document.createElement('button')
  button.innerText = 'Enter VR'
  button.style.width = '100px';
  button.style.height = '50px';
  button.addEventListener('click', handleClick)
  containerRef.current && containerRef.current.appendChild(button);
}, [])*/
  

  return (
    <div className="App" ref={containerRef}>
      <VRButton />
      <Canvas>
        <XR>
          <Controllers />
          <Hands />
          <VideoPlayer/>
        </XR>
      </Canvas>
    </div>
  );
};

export default App;
