import React, { Suspense, useEffect,useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stats } from "@react-three/drei";
import {OBJLoader} from 'three/addons/loaders/OBJLoader.js';
import * as THREE from 'three';
const scene = new THREE.Scene();

const OBJViewer = ({ modelPath }) => {
  return (
    <Canvas
      camera = {{ position: [10, 30, 30] }}
    >
      <OrbitControls    />
      <ambientLight     intensity = {0.15} />
      <directionalLight  color     = "#ffffff" intensity = {0.15} position = {[10, 10, 10]} />
      <spotLight        position  = {[0, 20, 0]} angle  = {0.15} penumbra  = {1} />
      <Suspense         fallback  = {null}>
      <Model            modelPath = {modelPath} />
      </Suspense>
      {/* <Stats /> */}
    </Canvas>
  );
};

const Model = ({ modelPath }) => {
    const [obj, setObj] = useState(null);
    const loader = new OBJLoader();
    useEffect(()=>{
        loader.load(
            modelPath,
            // called when resource is loaded
             ( object ) => {
                scene.add( object );
                setObj(object)
            },
          
       );
    },[modelPath])
    
    if (obj === null) {
        return null;
      }
      obj?.parent?.scale?.set(1, 2, 1);
      return <primitive object={obj?.parent} />;
};


  export default OBJViewer;