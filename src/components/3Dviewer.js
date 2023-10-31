// import React, { Suspense } from "react";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, Stats } from "@react-three/drei";
// import { GLTFLoader } from "three/addons/loaders/GLTFLoader";
// import { USDZLoader } from "three-usdz-loader";

// const GlpModelViewer = ({ modelPath }) => {
//   return (
//     <Canvas
//       camera = {{ position: [20, 50, 30] }}
//     >
//       <OrbitControls    />
//       <ambientLight     intensity = {1} />
//       <directionalLight color     = "#ffffff" intensity = {0.15} position = {[10, 10, 10]} />
//       <spotLight        position  = {[0, 20, 0]} angle  = {0.15} penumbra  = {1} />
//       <Suspense         fallback  = {null}>
//       <Model            modelPath = {modelPath} />
//       </Suspense>
//       {/* <Stats /> */}
//     </Canvas>
//   );
// };

// const Model = ({ modelPath }) => {
//   const gltfLoader = new GLTFLoader();
//   const [gltf, setGltf] = React.useState(null);

//   React.useEffect(() => {
//     gltfLoader.load(modelPath, (gltf) => {
//       setGltf(gltf);
//     });
//   }, [modelPath]);

//   if (gltf === null) {
//     return null;
//   }
//   gltf.scene.scale.set(1, 2, 1);
//   return <primitive object={gltf.scene} />;
// };

// export default GlpModelViewer;


 