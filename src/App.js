import React, {useEffect, useState} from "react";
import Card from "./components/card";
import "./App.css";
const App = () => {
   

    const modelFile = [
        // {
        //     key: "renderGLB",
        //     name: "GLB",
        //     format: "GLB",
        //     path: "https://ikea-q-001-delivery.sitecorecontenthub.cloud/api/public/content/5gNXQI3Wu0ei3y37cIZ6dQ_original?v=38ef80f8",
        //     modalTitle: "GLB Viewer",
        // },
        // {
        //     key: "renderDRACO",
        //     name: "GLB_DRACO",
        //     format: "DRACO",
        //     path: "https://ikea-q-001-delivery.sitecorecontenthub.cloud/api/public/content/Phn4VV1osUaPMWR5viMgzQ_original?v=7e3eaec3",
        //     modalTitle: "GLB_DRACO Viewer",
        // },
        // {
        //     key: "renderGLTF",
        //     name: "GLTF",
        //     format: "GLTF",
        //     modalTitle: "GLTF Viewer",
        //     path:"https://ikea-q-001-delivery.sitecorecontenthub.cloud/api/public/content/16e5df20dde44bb185c97e0685d4a8b5?v=28b20e77",
        // },
        {
            key: "renderUSDZ",
            name: "USDZ",
            format: "USDZ",
            path: "https://ikea-q-001-delivery.sitecorecontenthub.cloud/api/public/content/SHZEK-_rTkuQ6cQu1oiCQQ_original?v=e40a9e49",
            modalTitle: "USDZ Viewer",
        },
    ];

    return (
        <div className="App">
            <div className="container" style={{display: "flex", flexDirection: "column"}}>
                <div className="title">Preview</div>
                <div className="card-wrapper" style={{display: "flex", gap: "20px", height: "fit-content"}}>
                    { modelFile.map((modelData) => {
                        return <Card key={modelData.key} modelData={modelData} />;
                    })}
                </div>
            </div>
        </div>
    );
};

export default App;
