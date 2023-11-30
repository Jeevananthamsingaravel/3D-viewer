import React, {Suspense, useEffect, useState, useRef} from "react";
import {Canvas} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";
import * as THREE from "three";
import {GLTFLoader} from "three/addons/loaders/GLTFLoader";
import {DRACOLoader} from "three/addons/loaders/DRACOLoader";
import JSZip, {file} from "jszip";
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
            .then(async (files) => {
                // Step 3: Load the GLTF JSON file
                const gltfFile = files.find((file) => file.relativePath.endsWith(".gltf"));
                if (!gltfFile) {
                    throw new Error("GLTF file not found in the zip archive.");
                }
                return [await gltfFile.blob.text(), files];
            })
            .then(async ([gltfContent, files]) => {
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

                let texturePromises = files.filter(
                    (file) => file.relativePath.endsWith(".png") || file.relativePath.endsWith(".jpg")
                );
                texturePromises = await texturePromises.map(
                    async (textureFile) => await textureFile.blob.arrayBuffer().then((buffer) => new Uint8Array(buffer))
                );
                return await Promise.all(texturePromises).then((textures) => ({files, textures, gltfContent}));
            })
            .then(({files, textures, gltfContent}) => {
                // Load the GLTF model with the binary data and textures
                const loader = new GLTFLoader();
                const geometry = new THREE.BoxGeometry();
                const material = new THREE.MeshBasicMaterial({color: 0x00ff00}); // You can replace this with your desired material
                const cube = new THREE.Mesh(geometry, material);
                scene.add(cube);

                // Assuming you want to use the textures in your model
                textures.forEach((texture, index) => {
                    // Use the texture data in your model
                    // For example, you can create a texture object and apply it to a material
                    const textureLoader = new THREE.TextureLoader();
                    const textureObject = textureLoader.load(URL.createObjectURL(new Blob([texture])));
                    material.map=textureObject;
                    // Use textureObject in your scene as needed
                });
                // new THREE.DefaultLoadingManager.setURLModifier(async (url) => {
                //     console.log(url);
                //     if (url.endsWith(".bin")) {
                //         let binFile = files.find(
                //             (file) => file.relativePath.startsWith("gltf") && file.relativePath.endsWith(".bin")
                //         );
                //         return await binFile.blob.arrayBuffer();
                //     }
                // });

                loader.parse(
                    gltfContent,
                    // new Uint8Array(binArrayBuffer),
                    (gltfModel) => {
                        // Handle the loaded GLTF model
                        scene.add(gltfModel.scene);
                    },
                    undefined,
                    (error) => {
                        // console.error("Error parsing GLTF model:", error);
                    }
                );
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
