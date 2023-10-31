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
                <Card title ="GLP Format"   description = "Click to previewe Image" threeDType = "GLP" modelPath = "/assetss/glb/16374_PS01_S01_NV01_RQP2_3.0.glb"/>
                <Card title ="DRACO / GLP Format"   description = "Click to previewe Image" threeDType="GLP" modelPath = "/assetss/glb_draco/16374_PS01_S01_NV01_RQP2_3.0.glb"/>
                <Card title ="GLTF Format"   description = "Click to previewe Image" threeDType = "GLTF" modelPath = "/assetss/gltf/16374_PS01_S01_NV01_RQP2_3.0.gltf" />
                <Card title ="USDZ Format"   description = "Click to previewe Image" threeDType = "USDZ" modelPath = "/assetss/usdz/16374_PS01_S01_NV01_RQP2_3.0.usdz"/>
                {/* <Card title ="OBJ Format"   description = "Click to previewe Image" threeDType = "OBJ" modelPath = "/1930-type-typewriter.obj"/> */}
                {/* <Card title ="FBX Format"   description = "Click to previewe Image" threeDType = "FBX" modelPath = "/Scene.fbx"/> */}
                {/* <Card title ="BLEND Format"   description = "Click to previewe Image" threeDType = "BLEND" modelPath = "/garg.blend"/> */}
            </div>
    </>)
}

export default ThreeDViewer