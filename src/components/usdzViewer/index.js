import React, { Suspense, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { USDZLoader } from 'three/addons/loaders/USDZLoader.js';
import { Canvas } from "@react-three/fiber";

const Scene = ({modelPath}) => {
  const [obj, setObj] = useState (null)

  useEffect(() => {
    let camera, scene, renderer, controls;

   
      camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
      camera.position.set(0, 0.75, -1.5);
      
      scene = new THREE.Scene();
      
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 2.0;
      document.body.appendChild(renderer.domElement);
      
      controls = new OrbitControls(camera, renderer.domElement);
      controls.minDistance = 1;
      controls.maxDistance = 8;
      
      // const rgbeLoader = new RGBELoader();
      const usdzLoader = new USDZLoader();
      usdzLoader.load(modelPath,(obj)=>{
        setObj(obj)
      })
  
  }, [modelPath]);

  return (
    <primitive object = {obj} scale = {0.05} intensity = {20}/>
  );
};

const USDZViewer = ({ modelPath }) => {
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


export default USDZViewer;
