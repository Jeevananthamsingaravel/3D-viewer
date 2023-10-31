import React, { Suspense,useState,useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stats } from "@react-three/drei";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader";

const GlbModelViewer = ({ modelPath }) => {
  console.log(modelPath,"modelPath")
  return (
    <Canvas
      camera = {{ position: [0.5, 0.5, 0.5] }}
    >
      <OrbitControls    />
      <ambientLight     intensity = {1} />
      <directionalLight color     = "#ffffff" intensity = {0.15} position = {[10, 10, 10]} />
      <spotLight        position  = {[0, 10, 0]} angle  = {0.15} penumbra  = {1} />
      <Suspense         fallback  = {null}>
      <Model            modelPath = {modelPath} />
      </Suspense>
      {/* <Stats /> */}
    </Canvas>
  );
};

const Model = ({ modelPath }) => {
  const gltfLoader = new GLTFLoader();
  const [gltf, setGltf] = useState(null);

  useEffect(() => {
    gltfLoader.load(modelPath, (gltf) => {
      setGltf(gltf);
    });
  }, [modelPath]);

  if (gltf === null) {
    return null;
  }
  gltf.scene.scale.set(1, 2, 1);
  return <primitive object={gltf.scene} />;
};

export default GlbModelViewer;


 