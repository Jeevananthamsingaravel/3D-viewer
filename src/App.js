import React, { useEffect, useState } from "react";
import Header from "./components/header";
import Card from "./components/card";
import * as THREE from "three";
import "./App.css";
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
      path: "https://saadhoctesting.blob.core.windows.net/test-container/content-package-file-uploads/123456/16374_PS01_S01_NV01_RQP2_3.0%20(1).glb?sp=r&st=2023-11-16T06:18:32Z&se=2023-11-25T14:18:32Z&sv=2022-11-02&sr=b&sig=4h2YuDeVMAq86ZllMdiap%2FSv402IEnfALd9WKtV7JXI%3D",
      modalTitle : "GLB Viewer"
    },
    {
      key: "renderDRACO",
      name: "GLB_DRACO",
      format: "DRACO",
      path: "https://saadhoctesting.blob.core.windows.net/test-container/content-package-file-uploads/123456/16374_PS01_S01_NV01_RQP2_3.0.glb?sp=r&st=2023-11-16T06:19:04Z&se=2023-11-25T14:19:04Z&sv=2022-11-02&sr=b&sig=n3WnFsQGidhM9twZWku%2BmBplJdXsPZvaiTuNBSN060s%3D",
      modalTitle : "GLB_DRACO Viewer"
    },
    {
      key: "renderGLTF",
      name: "GLTF",
      format: "GLTF",
      path: "https://saadhoctesting.blob.core.windows.net/test-container/content-package-file-uploads/26371736/16374_PS01_S01_NV01_RQP2_3.0.gltf?sp=r&st=2023-11-16T06:32:53Z&se=2023-11-25T14:32:53Z&sv=2022-11-02&sr=b&sig=UsAE2AkldEhkcaVHwpI3WgQ4a1pxXKlTE6WGLrMZx74%3D",
      modalTitle : "GLTF Viewer",
      // https://saadhoctesting.blob.core.windows.net/test-container/content-package-file-uploads/26371736/16374_PS01_S01_NV01_RQP2_3.0_0.bin?sp=r&st=2023-11-16T06:33:16Z&se=2023-11-25T14:33:16Z&sv=2022-11-02&sr=b&sig=eTV3zw6NtTJgyMUye2W0sj%2FdehppTEYJptmRxD2%2BsRQ%3D
      // binPath : "https://saadhoctesting.blob.core.windows.net/test-container/content-package-file-uploads/26371736/16374_PS01_S01_NV01_RQP2_3.0_0.bin?sp=r&st=2023-11-16T06:33:16Z&se=2023-11-25T14:33:16Z&sv=2022-11-02&sr=b&sig=eTV3zw6NtTJgyMUye2W0sj%2FdehppTEYJptmRxD2%2BsRQ%3D"
      binPath : "https://saadhoctesting.blob.core.windows.net/test-container/content-package-file-uploads/26371736/16374_PS01_S01_NV01_RQP2_3.0_0.bin?sp=r&st=2023-11-16T06:33:16Z&se=2023-11-25T14:33:16Z&sv=2022-11-02&sr=b&sig=eTV3zw6NtTJgyMUye2W0sj%2FdehppTEYJptmRxD2%2BsRQ%3D"
    },
    {
      key: "renderUSDZ",
      name: "USDZ",
      format: "USDZ",
      path: "https://saadhoctesting.blob.core.windows.net/test-container/content-package-file-uploads/123456/16374_PS01_S01_NV01_RQP2_3.0.usdz?sp=r&st=2023-11-16T06:19:22Z&se=2023-11-25T14:19:22Z&sv=2022-11-02&sr=b&sig=x%2FRHfMqnZpzCpA0VTeGquqIfYkIdRQQwVTh1B33Kvsk%3D",
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
