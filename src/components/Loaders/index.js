import React from "react";
import GLTFLoader from "./GLTFLoader";
import USDZLoader from "./USDZLoader";
import UsdzForPreviewe from "./usdzForPreview"

const Loader = ({ modelData,forPreview,isOpenModal,renderer,loader }) => {
  switch (modelData.format) {
    case "GLTF":
    case "GLB":
    case "DRACO":
      return <GLTFLoader modelPath={modelData.path} />;
    case "USDZ":
      return <USDZLoader modelPath={modelData.path} forPreview = {false} isOpenModal={isOpenModal} renderer={renderer} loader={loader} />;
    default:
      return <div>Type not available</div>;
  }
};

export default Loader;
