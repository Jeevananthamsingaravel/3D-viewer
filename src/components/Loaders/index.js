import React from "react";
import USDZLoader from "./USDZLoader";

const Loader = ({ modelData,forPreview,isOpenModal,renderer,loader }) => {
  switch (modelData.format) {
    case "USDZ":
      return <USDZLoader modelPath={modelData.path} forPreview = {false} isOpenModal={isOpenModal} renderer={renderer} loader={loader} modelData={modelData} />;
    default:
      return <div>Type not available</div>;
  }
};

export default Loader;
