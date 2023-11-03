import React, { useState } from "react";
import Header from "./Components/Header";
import Card from "./Components/Card";
import "./App.css"
const App = () => {
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
            return <Card key={modelData.key} modelData={modelData} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
