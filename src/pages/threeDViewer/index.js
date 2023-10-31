import React from "react";
import Header from "../../components/header";

import DracoModelViewer from '../../components/dracoViewer';
import Card from "../../components/card";
import "./index.css"

const ThreeDViewer = () => {
    return (
        <>
            <Header />
            <div className="threeDCard">
                <Card title ="GLP Format"   description = "Click to previewe Image" threeDType = "GLP" modelPath = "/RQP1/glb/glb.glb"/>
                <Card title ="DRACO Format"   description = "Click to previewe Image" threeDType = "GLP" modelPath = "/RQP1/glb_draco/draco_glb.glb"/>
                <Card title ="GLTF Format"   description = "Click to previewe Image" threeDType = "GLTF" modelPath = "/RQP1/gltf/gltf.gltf" />
                <Card title ="USDF Format"   description = "Click to previewe Image" threeDType = "USDF" modelPath = "/RQP1/usdz/usdz.usdz"/>
                {/* <Card title ="OBJ Format"   description = "Click to previewe Image" threeDType = "OBJ" modelPath = "/1930-type-typewriter.obj"/> */}
                {/* <Card title ="FBX Format"   description = "Click to previewe Image" threeDType = "FBX" modelPath = "/Scene.fbx"/> */}
                {/* <Card title ="BLEND Format"   description = "Click to previewe Image" threeDType = "BLEND" modelPath = "/garg.blend"/> */}
            </div>
    </>)
}

export default ThreeDViewer