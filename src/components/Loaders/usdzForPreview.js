import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { USDZLoader } from "./../../plugin/USDZ/USDZLoader";

const UsdzForPreviewe = ({ modelPath , forPreview, isOpenModal,renderer}) => {
 
  const [modelIsVisible, setModelIsVisible] = useState(false);
  const [modelIsLoading, setModelIsLoading] = useState(false);
  const [loadedModels, setLoadedModels] = useState();
  const [loader, setLoader] = useState()
  const containerRef = useRef(null);
  const [camera, setCamera] = useState(null);
  const [scene] = useState(new THREE.Scene());
  const [controls, setControls] = useState(null);
  
  useEffect(()=>{
    setLoader( new USDZLoader("/external"))
  },[modelPath])

  useEffect(() => {
    // Setup camera
    let newCamera = new THREE.PerspectiveCamera(27, 345 / 300, 0.5, 6500);
    newCamera.position.z = 150;
    newCamera.position.y = 0.5;
    newCamera.position.x = 0.9;
    setCamera(newCamera);
    const group = new THREE.Group();
    scene.add(group);
    
    // Create a white directional light
    const directionalLight = new THREE.DirectionalLight("#ffffff");
    directionalLight.intensity = 1;
    directionalLight.position.set(0, 10, 0).normalize();
    scene.add(directionalLight);

    // Create a white hemisphere light
    const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444);
    hemisphereLight.position.set(0, 1, 0);
    scene.add(hemisphereLight);

    // Create a white ambient light
    const ambientLight = new THREE.AmbientLight("#ffffff");
    ambientLight.intensity = 0.2;
    scene.add(ambientLight);

    const spotLight = new THREE.SpotLight();
    spotLight.penumbra = 1;
    spotLight.position.set(0, 10, 0).normalize();
    scene.add(spotLight);

    renderer.toneMappingExposure = 1.5;


    // Setup main scene
    renderer.setPixelRatio(window.devicePixelRatio);
    if(forPreview){
    renderer.setSize(345,300 );
    }else{
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.shadowMap.enabled = false;
  }
    containerRef.current.appendChild(renderer.domElement);
    // Setup navigation
    const newControls = new OrbitControls(newCamera, renderer.domElement);
    newControls.update();
    setControls(newControls);
  }, [modelIsVisible,modelPath]);

  const animate = () => {
    if (controls && loadedModels) {
      loadedModels.update(new Date().getTime() / 1000);
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }
  };

  const loadFile = async (file) => {
    if (modelIsLoading) {
      return;
    }
    setModelIsLoading(true);
    try {
      const loadedModelData = await loader.loadFile(file, scene);
      setLoadedModels(loadedModelData);
      setModelIsLoading(false);
      setModelIsVisible(true);
    } catch (e) {
      setModelIsLoading(false);
      console.error("An error occurred when trying to load the model", e);
    }
  };

  const convertPathToFile = async (filePath) => {
    try {
      const response = await fetch(filePath);
      const arrayBuffer = await response.arrayBuffer();
      const blob = new Blob([arrayBuffer]);
      const file = new File([blob], "convertedFile.usdz", {
        type: "model/vnd.usdz+zip",
      });
      return file;
    } catch (error) {
      console.error("Error converting path to File:", error);
    }
  };

  useEffect(() => {
    if (loadedModels) {
      animate();
    }
  }, [loadedModels,modelPath]);

  useEffect(() => {
    async function fetchData() {
      const blob = await convertPathToFile(modelPath);
      loadFile(blob);
    }
    if (modelPath && loader) {
      fetchData();
    }
  }, [modelPath,loader]);

  return ( <>
  <div className="full-width-height" id="usdz-canvas" ref={containerRef} />
   </>)
};


export default UsdzForPreviewe;
