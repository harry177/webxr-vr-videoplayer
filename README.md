# Webxr-vr-videoplayer - virtual reality videoplayer (React)

## Functionality

- **VR 3D videoplayer interaction:** The videoplayer is a 3D object with videotexture on the front side. Users can interact with player, using vr-controllers. If ray of controller intersects videotexture and user pushes a select button - video starts or stops depending of its current state. If ray intersects one of two spheres above the player and user pushes a select button - video switches to next (left sphere) or previous (right sphere). In case video is in paused state and has not yet started playing - a poster is shown.

## Technology stack

The project was developed using the WebXR technology, React, typescript, THREE.js and additional libraries like react-three-fiber, react-xr and react-three-drei. These additional libraries provide useful jsx-elements for building webxr with React. There was a Node.js - Express created to help avoid cors limitations and transfer video files for React-based videoplayer.

## Usage 

To try app - clone this repo, install all dependencies and start it "npm run run" - it concurrently launches client and server.

## Restrictions

Before use please make sure your device supports WebXR (VR). If you don't have any - download a browser extension called WebXR API Emulator (Chrome, Mozilla). It permits you use virtual headset and controllers in emulated virtual reality and is available in browser developer mode.

## Author

Artem Prygunov