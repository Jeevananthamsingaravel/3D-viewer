import { USDZLoader } from "three-usdz-loader";
import * as THREE from 'three';
import { useEffect } from "react";

const USDZViewer =  ({modelPath}) => {
  const loader = new USDZLoader();
  const group = new THREE.Group();

  useEffect(async () =>{
    const loadedModel = await loader.loadFile(modelPath, group);
    console.log(loadedModel)
  },[modelPath])

  return (<></>)
}


export default USDZViewer;
