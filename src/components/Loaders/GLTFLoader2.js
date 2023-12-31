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
        const renderer = new THREE.WebGLRenderer({canvas});
        renderer.setSize(window.innerWidth, window.innerHeight);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;

        // const textureLoader = new THREE.TextureLoader();
        const fetchData = async (zipUrl) => {
            zipUrl = modelPath;
            fetch(zipUrl)
            .then((response) => response.arrayBuffer())
            .then((zipBuffer) => JSZip.loadAsync(zipBuffer))
            .then((zip) => {
                // Step 2: Extract the contents of the zip file
                const promises = [];
                zip.forEach((relativePath, zipEntry) => {
                    promises.push(zipEntry.async("blob").then((blob) => ({relativePath, blob})));
                });
                return Promise.all(promises);
            })
            .then(async(files) => {
                // Step 3: Load the GLTF JSON file
                const gltfFile = files.find((file) => file.relativePath.endsWith(".gltf"));
                if (!gltfFile) {
                    throw new Error("GLTF file not found in the zip archive.");
                }
                return [await gltfFile.blob.text(), files];
              })
              .then(async([gltfContent, files]) => {
                // Step 4: Load the binary (.bin) file
                const binFile = files.find((file) => file.relativePath.endsWith(".bin"));
                if (!binFile) {
                    throw new Error("Binary file not found in the zip archive.");
                }
                return [await binFile.blob.arrayBuffer(), files, gltfContent];
              })
              .then(async ([binArrayBuffer, files, gltfContent]) => {
                // Step 5: Load textures
                // const loader = new GLTFLoader();
                // loader.setDRACOLoader(new THREE.DRACOLoader()); // If DRACO compression is used in the GLTF file
                
                let texturePromises = files.filter((file) => file.relativePath.endsWith(".png") || file.relativePath.endsWith(".jpg"))
                texturePromises= await texturePromises.map(async(textureFile) =>await textureFile.blob.arrayBuffer().then((buffer) => new Uint8Array(buffer)));
                return await Promise.all(texturePromises).then((textures) => ({binArrayBuffer, textures,gltfContent}));
            })
            .then(({binArrayBuffer, textures, gltfContent}) => {
                // Load the GLTF model with the binary data and textures
                const loader = new GLTFLoader();
                // const dracoLoader = new THREE.DRACOLoader(); // If DRACO compression is used in the GLTF file
                // loader.setDRACOLoader();
                

                loader.parse(
                    gltfContent,
                    new Uint8Array(binArrayBuffer),
                    (gltfModel) => {
                        // Handle the loaded GLTF model
                        scene.add(gltfModel.scene);
                    },
                    undefined,
                    (error) => {
                        console.error("Error parsing GLTF model:", error);
                    }
                );

                // Assuming you want to use the textures in your model
                textures.forEach((texture, index) => {
                    // Use the texture data in your model
                    // For example, you can create a texture object and apply it to a material
                    const textureLoader = new THREE.TextureLoader();
                    const textureObject = textureLoader.load(URL.createObjectURL(new Blob([texture])));
                    // Use textureObject in your scene as needed
                });
            })
            .catch((error) => {
                console.error("Error loading or processing GLTF model:", error);
            });
        };
        if (modelPath) {
            fetchData();
        }
    }, [modelPath]);

    return <canvas ref={canvasRef} />;
};

export default ModelViewer;

