import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, useFBX } from "@react-three/drei";
import { Suspense } from "react";

const FBXViewer = ({ modelPath }) => {
    return (
        <Canvas camera = {{ position: [30, 50, 150] }}>
            <OrbitControls />
            <ambientLight     intensity = {20} />
            <directionalLight intensity = {20} />
            <spotLight        position  = {[0, 20, 0]} angle  = {0.15} penumbra = {1} />
            <Suspense         fallback  = {null}>
            <Scene            modelPath = {modelPath} />
          </Suspense>
        </Canvas>
    );
  };
  
  const Scene = ({modelPath}) => {
    const  fbx                = useFBX(modelPath);
    return <primitive  object = {fbx} scale = {0.05} intensity = {20}/>;
  };
  
    export default FBXViewer;