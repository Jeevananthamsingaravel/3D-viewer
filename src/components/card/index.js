import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import "./index.css";
import  Modal  from "./../modal/index";
import Loader from "../Loaders";
import * as THREE from "three";
import {USDZLoader} from "./../../plugin/USDZ/USDZLoader";

const CustomCard = ({ modelData}) => {
  const [isOpenModal, setIsModalopen] = useState(false);
  const [renderer, setRenderer] = useState(null);
  const [loader, setLoader] = useState();
  useEffect(() => {
      setRenderer(
          new THREE.WebGLRenderer({
              antialias: true,
              toneMapping: THREE.CineonToneMapping,
              toneMappingExposure: 2,
              alpha: true,
          })
      );
      setLoader(new USDZLoader());
  }, []);

  return (
    <>
    <Card sx={{ width: 345, padding: "10px", cursor:"pointer" }} className="card_container" onClick = {()=>setIsModalopen(true)}>
      <div className="model-title">{modelData.name}</div>
      <div className="model-preview">
        {modelData?.format !== "USDZ" && <Loader modelData={modelData} forPreview={true} isOpenModal={isOpenModal} renderer={renderer}/>}
      </div>
      <div className = "model-title"  style={{cursor:"pointer"}}>Click to preview</div>
    </Card>
    {isOpenModal &&  <Modal isOpenModal={isOpenModal} setIsModalopen={setIsModalopen} modelData={modelData} renderer={renderer} loader={loader}/>}
    </>
  );
};

export default CustomCard;