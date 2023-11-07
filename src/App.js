import React, { useEffect, useState } from "react";
import Header from "./components/header";
import Card from "./components/card";
import * as THREE from "three";
import "./App.css"
import { USDZLoader } from "./plugin/USDZ/USDZLoader";
const App = () => {

  const [renderer, setRenderer] = useState(null);
  const [loader, setLoader] = useState()
  useEffect(()=>{
    setRenderer( new THREE.WebGLRenderer({
      antialias: true,
      toneMapping: THREE.CineonToneMapping,
      toneMappingExposure: 2,
      alpha: true,
    }))
    setLoader( new USDZLoader("/external"))
  },[])

  const modelFile = [
    {
      key: "renderGLB",
      name: "GLB",
      format: "GLB",
      path: "/assets/glb/16374_PS01_S01_NV01_RQP2_3.0.glb",
      modalTitle : "GLB Viewer"
    },
    {
      key: "renderDRACO",
      name: "GLB_DRACO",
      format: "DRACO",
      path: "/assets/glb_draco/16374_PS01_S01_NV01_RQP2_3.0.glb",
      modalTitle : "GLB_DRACO Viewer"
    },
    {
      key: "renderGLTF",
      name: "GLTF",
      format: "GLTF",
      path: "/assets/gltf/16374_PS01_S01_NV01_RQP2_3.0.gltf",
      modalTitle : "GLTF Viewer"
    },
    {
      key: "renderUSDZ",
      name: "USDZ",
      format: "USDZ",
      path: "/assets/usdz/16374_PS01_S01_NV01_RQP2_3.0.usdz",
      modalTitle : "USDZ Viewer"
    },
  ];

  
  return (
    <div className="App">
      <Header />
      <div className="container">
        <div className="card-wrapper">
          {modelFile.map((modelData) => {
            return <Card key={modelData.key} modelData={modelData} renderer={renderer} loader={loader}/>;
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
