import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const Home = ({ modelPath , forPreview, isOpenModal,renderer, loader}) => {
  const [modelIsVisible, setModelIsVisible] = useState(false);
  const [modelIsLoading, setModelIsLoading] = useState(false);
  const [loadedModels, setLoadedModels] = useState();
  // const [loader, setLoader] = useState();
  const threeContainer = useRef(null);
  const [camera, setCamera] = useState(null);
  const [scene] = useState(new THREE.Scene());


  const [controls, setControls] = useState(null);

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

    var light = new THREE.PointLight("#ffff", 10, 200);
    light.position.set(4, 30, -20);
    scene.add(light);

    var light2 = new THREE.AmbientLight("#fffff", 0.5, 10);
    light2.intensity = 0.3;
    light2.position.set(30, -10, 30);
    scene.add(light2);

    // Create a white hemisphere light
    // const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444);
    // hemisphereLight.position.set(0, 1, 0);
    // scene.add(hemisphereLight);

    // // Create a white ambient light
    // const ambientLight = new THREE.AmbientLight("#ffffff");
    // ambientLight.intensity = 0.2;
    // scene.add(ambientLight);

    // const spotLight = new THREE.SpotLight();
    // spotLight.penumbra = 1;
    // spotLight.position.set(0, 10, 0).normalize();
    // scene.add(spotLight);
    // renderer.toneMapping = THREE.ACESFilmicToneMapping;
    // renderer.toneMappingExposure = 1.5;

    // const material = new THREE.MeshStandardMaterial({
    //   color: 0xff0000,
    //   roughness: 0.2, // Adjust the roughness (0 to 1)
    //   metalness: 0.8, // Adjust the metalness (0 to 1)
    // });

    // scene.add(material);

    // Setup main scene
    renderer.setPixelRatio(window.devicePixelRatio);
    if(forPreview){
    renderer.setSize(345,300 );
    }else{
    renderer.setSize(threeContainer.current.clientWidth, threeContainer.current.clientHeight);
    renderer.shadowMap.enabled = false;
    }
    threeContainer.current.appendChild(renderer.domElement);

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
    // Clearup any previsouly loaded model
    if (loadedModels) {
      loadedModels.clear();
    }

    try {
      const loadedModelData = await loader.loadFile(file, scene);
      setLoadedModels(loadedModelData);
      setModelIsLoading(false);
      setModelIsVisible(true);
    } catch (e) {
      setModelIsLoading(true);
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

  return <div className="full-width-height" id="usdz-canvas" ref={threeContainer}></div>;
};


export default Home;
