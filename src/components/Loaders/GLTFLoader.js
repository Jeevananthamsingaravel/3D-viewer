import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader";

const ModelViewer = ({ modelPath ,modelData}) => {
  return (
    <Canvas camera={{ position: [0, 0, 0.5] }}>
      <OrbitControls />
      <ambientLight intensity={1} />
      <directionalLight color="#ffffff" intensity={1} position={[0, 10, 0]} />
      <spotLight position={[10, 10, 10]}  penumbra={1} />
      <Suspense fallback={null}>
        <Model modelPath={modelPath} modelData={modelData} />
      </Suspense>
    </Canvas>
  );
};

const Model = ({ modelPath,modelData }) => {
  const gltfLoader = new GLTFLoader();
  // if(modelData?.binPath){
  //   gltfLoader.setOptions({ urlModifier: (url) => modelData?.binPath + url });
  // }  
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/decoder/");
  gltfLoader.setDRACOLoader(dracoLoader);
  const [scene, setScene] = useState(null);

  useEffect(() => {
    gltfLoader.load(modelPath, (gltf) => {
      setScene(gltf);
    },
    (xhr) => {
      // This callback is called when the resource (including bin files) is being loaded
      xhr.url = modelData?.binPath + xhr.url;
    },
    );
  }, [modelPath]);

  if (scene === null) {
    return null;
  }

  return <primitive object={scene.scene} />;
};

export default ModelViewer;
