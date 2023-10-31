import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';
import html2canvas from 'html2canvas';

function ThumbnailGenerator({ modelPath }) {
  const canvasRef = useRef();
  const [thumbnailURL, setTumbnailURL] = useState (null)

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(0.9, 0.9, 0.9); // Reduced FOV and adjusted near/far
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(200, 200); // Set the thumbnail size
    if(!canvasRef.current.children[0]){
      canvasRef.current.appendChild(renderer.domElement);
    }
    
    const loader = new GLTFLoader();
    loader.load(modelPath, (gltf) => {
      const model = gltf.scene;

      // Add ambient light with increased intensity for brightness
      const ambientLight = new THREE.AmbientLight(0xffffff, 2.0);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
      directionalLight.position.set(0, 1, 0);
      scene.add(directionalLight);

      // Position the camera for a better view of the model
      camera.position.set(20, 10, 20);
      camera.lookAt(0, 0, 0);

      // Add the model to the scene
      scene.add(model);



      // Render the scene
      renderer.render(scene, camera);
        canvasRef.current.removeChild(canvasRef.current.children[1])
  
      // Capture a screenshot (thumbnail)
      html2canvas(renderer.domElement).then((canvas) => {
        setTumbnailURL(canvas.toDataURL())
        // You can use thumbnailDataURL as an image source or save it as needed
      });
    });

  }, [modelPath]);


  return <>
             <div ref={canvasRef} ></div>
            {/* {thumbnailURL && <img src={thumbnailURL} alt='' />} */}
        </>;
}

export default ThumbnailGenerator;
