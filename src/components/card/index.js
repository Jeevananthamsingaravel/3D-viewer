import React, { useState } from "react";
import Card from "@mui/material/Card";
import "./index.css";
import  Modal  from "./../modal/index";
// import previeweImg from "./../../Previewe.png"

const CustomCard = ({ modelData ,renderer,loader}) => {
  const [isOpenModal, setIsModalopen] = useState(false)

  return (
    <>
    <Card sx={{ width: 345, padding: "10px", cursor:"pointer" }} className="card_container" onClick = {()=>setIsModalopen(true)}>
      <div className="model-title">{modelData.name}</div>
      <div className="model-preview">
        {/* <Loader modelData={modelData} forPreview={true} isOpenModal={isOpenModal} renderer={renderer} /> */}
        <div className="preview_Img">
        {/* <img src={previeweImg} style={{width:"50%", height:"50%"}}/> */}
        </div>
      </div>
      <div className = "model-title"  style={{cursor:"pointer"}}>Click to preview</div>
    </Card>
    {isOpenModal &&  <Modal isOpenModal={isOpenModal} setIsModalopen={setIsModalopen} modelData={modelData} renderer={renderer} loader={loader}/>}
    </>
  );
};

export default CustomCard;