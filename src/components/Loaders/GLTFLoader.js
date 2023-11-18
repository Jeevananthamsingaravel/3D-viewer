import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader";

const ModelViewer = ({ modelPath ,modelData, forPreview}) => {
  return (
    <Canvas camera={{ position: [0, 0, 0.5] }}>
      {!forPreview && <OrbitControls />}
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


  if(modelData?.format === "GLTF"){
  THREE.DefaultLoadingManager.setURLModifier((url) => {
  // Modify URLs as needed
  if (url.endsWith('.bin')) {
    return modelData?.binPath;
  } else if (url.endsWith('.jpg')) {
    if(url.includes("Basecolor_0")){
      return "https://saadhoctesting.blob.core.windows.net/test-container/content-package-file-uploads/123456/16374_PS01_S01_NV01_RQP2_3.0_Basecolor_0.jpg?sp=r&st=2023-11-17T06:42:40Z&se=2023-11-25T14:42:40Z&sv=2022-11-02&sr=b&sig=T284EJ0%2FyHItxW%2BiDgH0K3TlUt74ccEd%2BvW1Gy%2FyrG4%3D";
    }else if(url.includes("OcclusionRoughnessMetallic")){
      return "https://saadhoctesting.blob.core.windows.net/test-container/content-package-file-uploads/123456/16374_PS01_S01_NV01_RQP2_3.0_OcclusionRoughnessMetallic_0.jpg?sp=r&st=2023-11-17T06:43:21Z&se=2023-11-25T14:43:21Z&sv=2022-11-02&sr=b&sig=4a12T3vKOzW%2F5HU7ZbBLqw%2F35PqzLLjUbJBf866CbUU%3D";
    }else if(url.includes("Normals_0")){
      return "https://saadhoctesting.blob.core.windows.net/test-container/content-package-file-uploads/123456/16374_PS01_S01_NV01_RQP2_3.0_Normals_0.jpg?sp=r&st=2023-11-17T06:43:02Z&se=2023-11-25T14:43:02Z&sv=2022-11-02&sr=b&sig=ggexDmYk6j5vBGXi0RB0e2TZ%2BxhaIPMpfohVan0aiM8%3D"
    }
  }
  return url;
});
}
  
  
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.6/");
  const gltfLoader = new GLTFLoader();
  gltfLoader.setDRACOLoader(dracoLoader);
  const [scene, setScene] = useState(null);
  
  useEffect(() => {
    gltfLoader.load(modelPath, (gltf) => {
      setScene(gltf);
    },

    );
  }, [modelPath]);

  if (scene === null) {
    return null;
  }

  return <primitive object={scene.scene} />;
};

export default ModelViewer;
