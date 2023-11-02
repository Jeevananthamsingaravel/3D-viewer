import React from "react";
import GLTFLoader from "./GLTFLoader";
import USDZLoader from "./USDZLoader";

const Loader = ({ modelData }) => {
  switch (modelData.format) {
    case "GLTF":
    case "GLB":
    case "DRACO":
      return <GLTFLoader modelPath={modelData.path} />;
    case "USDZ":
      return <USDZLoader modelPath={modelData.path} />;
    default:
      return <div>Type not available</div>;
  }
};

export default Loader;
