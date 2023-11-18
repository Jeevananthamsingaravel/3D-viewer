import React from "react";
import GLTFLoader from "./GLTFLoader";
import USDZLoader from "./USDZLoader";

const Loader = ({ modelData,forPreview,isOpenModal,renderer,loader }) => {
  switch (modelData.format) {
    case "GLTF":
    case "GLB":
    case "DRACO":
      return <GLTFLoader modelPath={modelData.path} modelData={modelData} forPreview={forPreview} />;
    case "USDZ":
      return <USDZLoader modelPath={modelData.path} forPreview = {false} isOpenModal={isOpenModal} renderer={renderer} loader={loader} modelData={modelData} />;
    default:
      return <div>Type not available</div>;
  }
};

export default Loader;
