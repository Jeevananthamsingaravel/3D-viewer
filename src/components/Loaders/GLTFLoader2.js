import React, {Suspense, useEffect, useState, useRef} from "react";
import {Canvas} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";
import * as THREE from "three";
import {GLTFLoader} from "three/addons/loaders/GLTFLoader";
import {DRACOLoader} from "three/addons/loaders/DRACOLoader";
import JSZip from "jszip";
const ModelViewer = ({modelPath, modelData, forPreview}) => {
    return (
        // <Canvas camera={{position: [0, 0, 0.5]}}>
        //     {!forPreview && <OrbitControls />}
        //     <ambientLight intensity={1} />
        //     <directionalLight color="#ffffff" intensity={1} position={[0, 10, 0]} />
        //     <spotLight position={[10, 10, 10]} penumbra={1} />
        //     <Suspense fallback={null}>
                <Model modelPath={modelPath} modelData={modelData} />
        //     </Suspense>
        // </Canvas>
    );
};

const Model = ({modelPath, modelData}) => {
    const [unzippedFiles, setUnZippedFiles] = useState(null);
    const [gltfBlobs, setGltfBlobs] = useState(null);
    const [scene, setScene] = useState(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const renderer = new THREE.WebGLRenderer({ canvas });
        renderer.setSize(window.innerWidth, window.innerHeight);
    
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;
    
        const loader = new GLTFLoader();
        const fetchData = async (zipUrl) => {
        zipUrl = modelPath
        fetch(zipUrl)
        .then((response) => response.arrayBuffer())
        .then((zipBuffer) => {
          const zip = new JSZip();
          return zip.loadAsync(zipBuffer);
        })
        .then((zip) => {
            console.log(zip)
          // Assume the GLTF file is named 'model.gltf' within the zip
          const gltfFileName = 'gltf/16374_PS01_S01_NV01_RQP2_3.0.gltf';
          const gltfFile = zip.file(gltfFileName);
  
          if (gltfFile) {
            // Read the content of the GLTF file
            return gltfFile.async('string');
          } else {
            throw new Error(`GLTF file '${gltfFileName}' not found in the zip archive.`);
          }
        })
        .then((gltfContent) => {
          // Parse the GLTF content and load the model
          const gltf = JSON.parse(gltfContent);
        //   THREE.DefaultLoadingManager.setURLModifier((url) => {
        //     console.log(url)
        //   })
        console.log(gltf)
          loader.parse(gltf, '', (gltfModel) => {
            scene.add(gltfModel.scene);
          },
          (xhr) => {
            console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
          },
          (error) => {
            throw error;
          }
          );
        })
        .catch((error) => {
          console.error('Error loading GLTF model:', error);
        });
  
      const animate = () => {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      };
  
      animate();
  
      window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });
        };
        if (modelPath ) {
            fetchData();
        }
    }, [modelPath]);

    return <canvas ref={canvasRef} />;
};

export default ModelViewer;

// import React, {useRef, useEffect, useState} from "react";
// import * as THREE from "three";
// import {GLTFLoader} from "three/addons/loaders/GLTFLoader";
// import JSZip from "jszip";

// const ThreeJSZipLoader = ({modelPath}) => {
//     const [unzippedFiles, setUnZippedFiles] = useState(null)
//     const canvasRef = useRef(null);

//     useEffect(() => {
//         const canvas = canvasRef.current;
//         const renderer = new THREE.WebGLRenderer({canvas});
//         renderer.setSize(window.innerWidth, window.innerHeight);

//         const scene = new THREE.Scene();
//         const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//         camera.position.z = 5;

//         const loader = new GLTFLoader();

//         // Replace 'your_zip_file.zip' with the actual name of your zip file
//         const zipUrl = modelPath;
//         // Fetch the zip file
// fetch(zipUrl)
// .then((response) => response.arrayBuffer())
// .then((zipBuffer) => {
//     // Unzip the file
//     return JSZip.loadAsync(zipBuffer);
// })
// .then((zip) => {
//     setUnZippedFiles(zip)
//     // Assume the GLTF file is named 'model.gltf' within the zip
//     const gltfFileName = "gltf/16374_PS01_S01_NV01_RQP2_3.0.gltf";
//     const gltfFile = zip.file(gltfFileName);
//     if (gltfFile) {
//         // Read the content of the GLTF file
//         return gltfFile.async("string");
//     } else {
//         throw new Error(`GLTF file '${gltfFileName}' not found in the zip archive.`);
//     }
// })
// .then((gltfContent) => {
//     // Parse the GLTF content and load the model
//     const gltf = JSON.parse(gltfContent);
//     let temp = unzippedFiles;
//     console.log(temp,"unzippedFiles")
//     THREE.DefaultLoadingManager.setURLModifier((url) => {
//        console.log(url)
//     });
//     loader.parse(gltf, "", (gltfModel) => {
//         scene.add(gltfModel.scene);
//     });
// })
// .catch((error) => {
//     console.error("Error loading GLTF model:", error);
// });

//         const animate = () => {
//             requestAnimationFrame(animate);
//             renderer.render(scene, camera);
//         };

//         animate();

//         window.addEventListener("resize", () => {
//             camera.aspect = window.innerWidth / window.innerHeight;
//             camera.updateProjectionMatrix();
//             renderer.setSize(window.innerWidth, window.innerHeight);
//         });

//         return () => {
//             // Clean up Three.js scene and resources on component unmount
//             //   scene.dispose();
//             //   renderer.dispose();
//         };
//     }, []);

//     return <canvas ref={canvasRef} />;
// };

// export default ThreeJSZipLoader;
