import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useLoader } from 'react-three-fiber';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

const GLBViewer = ({modelPath}) => {
    const [obj, setObj] = useState(null);
    const loader = new GLTFLoader();

    useLoader(GLTFLoader, (loader) => {
        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath('./../decoders/')
        loader.setDRACOLoader(dracoLoader)
      })
    
    useEffect(() => {
        loader.load(modelPath, function(gltf) {
          setObj(gltf)
        })
      }, [modelPath]);

      return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Suspense>
      <primitive object={obj.scene} />
      </Suspense>
    </Canvas>
  );
};

function DracoGLBViewer({modelPath}) {
    return (
      <div style={{ height: '100vh' }}>
        <GLBViewer modelPath={modelPath} />
      </div>
    );
  }
  

export default DracoGLBViewer;
