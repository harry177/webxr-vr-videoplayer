import React from "react";
import { VideoPlayer } from "./components/VideoPlayer";
import "./App.css";
import { Canvas } from "react-three-fiber";

const App = () => {
  return (
    <div className="App">
      <Canvas>
        <VideoPlayer />
      </Canvas>
    </div>
  );
};

export default App;
