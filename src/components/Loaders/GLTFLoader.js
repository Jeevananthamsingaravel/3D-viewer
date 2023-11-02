import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader";

const ModelViewer = ({ modelPath }) => {
  return (
    <Canvas camera={{ position: [0, 0, 0.5] }}>
      <OrbitControls />
      <ambientLight intensity={1} />
      <directionalLight color="#ffffff" intensity={1} position={[0, 10, 0]} />
      <spotLight position={[10, 10, 10]}  penumbra={1} />
      <Suspense fallback={null}>
        <Model modelPath={modelPath} />
      </Suspense>
    </Canvas>
  );
};

const Model = ({ modelPath }) => {
  const gltfLoader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/decoder/");
  gltfLoader.setDRACOLoader(dracoLoader);
  const [scene, setScene] = useState(null);

  useEffect(() => {
    gltfLoader.load(modelPath, (gltf) => {
      setScene(gltf);
    });
  }, [modelPath]);

  if (scene === null) {
    return null;
  }

  return <primitive object={scene.scene} />;
};

export default ModelViewer;
