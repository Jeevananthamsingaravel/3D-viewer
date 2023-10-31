import React, { useState } from "react";
import Modal from "./../modal/index"
import "./index.css"
import ThreeDThumbnail from "./../thumbnailGenerator"


const Card = ({title, description,threeDType,modelPath}) => {
    const [open, setOpen] = useState(false);
    const [thumbnailURL , setTumbnailURL] =  useState(null)

    return (
        <>
            <div className="cardContainer" onClick={()=> setOpen(true)}>
                <div className="cardTitle">{title}</div>
                <div className="cardThumbnail">
                {modelPath && <ThreeDThumbnail modelPath={modelPath} />}
                </div>
                <div className="cardDescription">{description}</div>
            </div>
            <Modal open={open} setOpen={setOpen} threeDType={threeDType} title={title} modelPath={modelPath}/>
        </>
    )
}

export default Card