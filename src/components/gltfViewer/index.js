
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stats } from "@react-three/drei";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader";

const GltfModelViewer = ({ modelPath }) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5] }}
      // onCreated={({ gl }) => {
      //   gl.shadowMap.enabled = true;
      //   gl.shadowMap.type = window.THREE.PCFSoftShadowMap;
      // }}
    >
      <OrbitControls />
      <ambientLight intensity={1} />
      <directionalLight color="#ffffff" intensity={1} position={[0, 10, 0]} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <Suspense fallback={null}>
        <Model modelPath={modelPath} />
      </Suspense>
      {/* <Stats /> */}
    </Canvas>
  );
};

const Model = ({ modelPath }) => {
  const gltfLoader = new GLTFLoader();
  const [gltf, setGltf] = React.useState(null);

  React.useEffect(() => {
    gltfLoader.load(modelPath, (gltf) => {
      setGltf(gltf);
    });
  }, [modelPath]);

  if (gltf === null) {
    return null;
  }

  return <primitive object={gltf.scene} />;
};


export default GltfModelViewer;


 