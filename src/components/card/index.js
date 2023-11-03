import React, { useState } from "react";
import Card from "@mui/material/Card";
import Loader from "../Loaders";
import "./index.css";
import  Modal  from "./../modal/index";

const CustomCard = ({ modelData }) => {
  const [isOpenModal, setIsModalopen] = useState(false)
  return (
    <>
    <Card sx={{ width: 345, padding: "10px", cursor:"pointer" }} className="card_container" onClick = {()=>setIsModalopen(true)}>
      <div className="model-title">{modelData.name}</div>
      <div className="model-preview">
        <Loader modelData={modelData} />
      </div>
      <div className = "model-title"  style={{cursor:"pointer"}}>Click to preview</div>
    </Card>
    <Modal isOpenModal={isOpenModal} setIsModalopen={setIsModalopen} modelData={modelData} />
    </>
  );
};

export default CustomCard;
