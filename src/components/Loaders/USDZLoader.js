import React, {useRef, useEffect, useState} from "react";
import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";
import {USDZLoader} from "./../../plugin/USDZ/USDZLoader";
const USDZLoaders = ({container, options}) => {
  const [renderer, setRenderer] = useState(
    new THREE.WebGLRenderer({
            antialias: true,
            toneMapping: THREE.CineonToneMapping,
            toneMappingExposure: 2,
            alpha: true,
        })
    );
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    // const renderer = new THREE.WebGLRenderer();
    const controls = new OrbitControls(camera, renderer.domElement);
    const loader = new USDZLoader();
    const canvasDiv = document.createElement("div");
    container.appendChild(canvasDiv);

    function render() {
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }
    
    return {
        render: () => {
          renderer.setSize(window.innerWidth, window.innerHeight);
          
          // Add the renderer to the scene
          canvasDiv.appendChild(renderer.domElement);
          console.log(options, container, "from usdzLoader");
            loader.loadFile(options?.entity?.renditions?.downloadOriginal, scene);
            // loader.load(options.entity.renditions.downloadOriginal, onLoad, progress, onError);

            // controls.update() must be called after any manual changes to the camera's transform
            camera.position.set(0, 20, 100);
            controls.update();

            render();
        },
    };
};

export default USDZLoaders;
