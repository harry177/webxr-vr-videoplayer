import { useEffect, useRef, useState } from "react";
import { Environment, PresentationControls } from "@react-three/drei";
import { useXR, Interactive } from "@react-three/xr";
import { Mesh } from "three";
import * as THREE from "three";
import image from "../assets/texture.jpg";
import barbie from "../assets/barbie.jpg";
import pokemon from "../assets/pokemon.jpg";
import stranger from "../assets/stranger.jpg";
import "./VideoPlayer.css";

export const VideoPlayer: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const sourceRef = useRef<HTMLSourceElement | null>(null);
  const videoTextureRef = useRef<THREE.VideoTexture | null>(null);

  const texture = new THREE.TextureLoader().load(image);
  const barbieTexture = new THREE.TextureLoader().load(barbie);
  const pokeTexture = new THREE.TextureLoader().load(pokemon);
  const strangerTexture = new THREE.TextureLoader().load(stranger);

  const [trailer, setTrailer] = useState<number>(0);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [poster, setPoster] = useState(barbieTexture);
  const [route, setRoute] = useState<string>("/videoplayback.mp4");

  const handleSphereSelect = () => {
    setVideoPlaying(!videoPlaying);
  };

  const increaseTrailer = () => {
    setTrailer((prevTrailer) => (prevTrailer < 2 ? prevTrailer + 1 : 0));
  };

  const decreaseTrailer = () => {
    setTrailer((prevTrailer) => (prevTrailer !== 0 ? prevTrailer - 1 : 2));
  }

  const { current: video } = videoRef;

  if (videoRef.current) {
    const videoTexture = new THREE.VideoTexture(videoRef.current);
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;
    videoTexture.format = THREE.RGBAFormat;
    videoTexture.needsUpdate = true;

    videoTextureRef.current = videoTexture;
  }

  const width = 8.0;
  const height = 5.0;
  const depth = 1.5;

  //const { current: videoTexture } = videoTextureRef;

  const geometry = new THREE.BoxGeometry(width, height, depth);

  

  const videoWidth = width * 0.8;
  const videoHeight = height * 0.8;
  const videoDepth = depth * 0.8;

  const videoGeo = new THREE.BoxGeometry(videoWidth, videoHeight, videoDepth);
  const videoMat = new THREE.MeshBasicMaterial({
    map:
      !videoPlaying && video?.currentTime === 0
        ? poster
        : videoTextureRef.current,
  });

  const videMesh = new Mesh(videoGeo, videoMat);
  videMesh.position.set(0, 0, 0.17);

  const boxMat = new THREE.MeshBasicMaterial({ map: texture });

  const boxMesh = new Mesh(geometry, boxMat);

  const player = useXR((state) => state.player);
  const controllers = useXR((state) => state.controllers);
  //const session = useXR((state) => state.session);

  player.position.set(0, 0, 6);
  controllers.forEach((controller) => {
    controller.position.set(0, 0, 1);
  });

  const geoSphere = new THREE.SphereGeometry(1, 12, 12);
  const matSphereOne = new THREE.MeshBasicMaterial({ color: 0x42f55a });
  const matSphereTwo = new THREE.MeshBasicMaterial({ color: 0xed2e11 });
  const sphereOne = new THREE.Mesh(geoSphere, matSphereOne);
  sphereOne.position.set(-2, 5, 0);
  sphereOne.addEventListener("select", handleSphereSelect);
  const sphereTwo = new THREE.Mesh(geoSphere, matSphereTwo);
  sphereTwo.position.set(2, 5, 0);

  const requestUrl = "http://localhost:3001/";

  const requestBody = {
    movie: trailer,
  };

  useEffect(() => {
    const video = document.createElement("video");
    video.playsInline = true;
    video.preload = "auto";
    video.crossOrigin = "anonymous";
    video.controls = true;
    video.poster = barbie;
    video.loop = true;
    video.style.display = "none";

    const source = document.createElement("source");
    source.type = "video/mp4";
    source.src = route;

    sourceRef.current = source;

    videoRef.current = video;

    const body = document.body;
    body.appendChild(video);
    video.appendChild(source);
  }, []);

  useEffect(() => {
    fetch(requestUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.videoUrl) {
          const { current: video } = videoRef;
          if (video) {
            const videoUrl = data.videoUrl;
            console.log(`Recieved ${videoUrl}`);
            setRoute(videoUrl);
            videoRef.current!.src = videoUrl;
          }
        }
      })
      .catch((error) => {
        console.error("Server request error:", error);
      });
  }, [trailer]);

  useEffect(() => {
    if (videoPlaying) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  }, [videoPlaying]);

  useEffect(() => {
    video?.pause();
  }, [trailer]);

  useEffect(() => {
    videoTextureRef.current = new THREE.VideoTexture(videoRef.current!);
    videoTextureRef.current.needsUpdate = true;

    switch (route) {
      case '/videoplayback.mp4':
        setPoster(barbieTexture);
        break;
      case '/poke.mp4':
        setPoster(pokeTexture);
        break;
      case '/stranger.mp4':
        setPoster(strangerTexture);
        break;
      
    }

    if (videoPlaying) {
      videoRef.current?.play();
    }
  }, [route]);

  return (
    <>
      <Environment preset="warehouse" />
      <PresentationControls>
        <primitive object={boxMesh} />
        <Interactive onSelectStart={() => setVideoPlaying(!videoPlaying)}>
          <primitive object={videMesh} />
        </Interactive>
        <Interactive onSelectStart={() => increaseTrailer()}>
          <primitive object={sphereOne} />
        </Interactive>
        <Interactive onSelectStart={() => decreaseTrailer()}>
        <primitive object={sphereTwo} />
        </Interactive>
      </PresentationControls>
    </>
  );
};
