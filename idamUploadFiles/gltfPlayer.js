import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js";
import {GLTFLoader} from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js";
import {DRACOLoader} from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/DRACOLoader.js";
import {OrbitControls} from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js";

export default function createExternal(container) {
    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        toneMapping: THREE.CineonToneMapping,
        toneMappingExposure: 2,
        alpha: true,
    });

    const canvasDiv = document.createElement("div");
    container.appendChild(canvasDiv);

    // function render() {
    //     requestAnimationFrame(render);
    //     renderer.render(scene, camera);
    // }

    // function onLoad(collada) {
    //     console.log(collada.scene, "collada.scene");
    //     scene.add(collada.scene);
    // }

    // function progress({loaded, total}) {
    //     if (loaded === total) {
    //         progressIndicator.innerText = "";
    //         console.log("Asset successfully loaded");
    //         return;
    //     }

    //     progressIndicator.innerText = `loading ${Math.floor((loaded / total) * 100)}%`;
    // }

    // function onError(xhr) {
    //     errorSpan.innerHTML = "Failed to load the asset!";
    // }

    return {
        render: (options) => {
            if (!options.entity || !options.entity.renditions || !options.entity.renditions.downloadOriginal) {
                console.log("No rendition is found!");
                return;
            }

            if (!options.entity.properties.FileName || !options.entity.properties.FileName.Invariant) {
                console.log("No file name could be found!");
                return;
            }

            if (!options.entity.properties.FileName.Invariant.toLowerCase().endsWith("glb")) {
                console.log("The file format is not glb");
                return;
            }

            /*////////////////////////////////////////*/

            var renderCalls = [];
            function render() {
                requestAnimationFrame(render);
                renderCalls.forEach((callback) => {
                    callback();
                });
            }
            render();

            /*////////////////////////////////////////*/

            var scene = new THREE.Scene();

            var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.25, 20);
            camera.position.set(0, 0, 0.5);
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(820, 700);
            renderer.toneMapping = THREE.ACESFilmicToneMapping;
            // renderer.toneMappingExposure = Math.pow(0.94, 5.0);
            // renderer.shadowMap.enabled = true;
            // renderer.shadowMap.type = THREE.PCFShadowMap;

            window.addEventListener(
                "resize",
                function () {
                    camera.aspect = window.innerWidth / window.innerHeight;
                    camera.updateProjectionMatrix();
                    renderer.setSize(window.innerWidth, window.innerHeight);
                },
                false
            );
            console.log(renderer.domElement, "renderer.domElement");
            container.appendChild(renderer.domElement);

            function renderScene() {
                renderer.render(scene, camera);
            }
            renderCalls.push(renderScene);

            /* ////////////////////////////////////////////////////////////////////////// */

            var controls = new OrbitControls(camera, renderer.domElement);
            controls.maxDistance = 10;
            controls.enableDamping = true;
            controls.dampingFactor = 0.05;

            renderCalls.push(function () {
                controls.update();
            });

            /* ////////////////////////////////////////////////////////////////////////// */

            var light = new THREE.PointLight("#ffff", 20, 200);
            light.position.set(4, 30, -20);
            scene.add(light);

            var light2 = new THREE.AmbientLight("#fffff", 1, 10);
            light2.position.set(30, -10, 30);
            scene.add(light2);

            /* ////////////////////////////////////////////////////////////////////////// */

            var loader = new GLTFLoader();
            const dracoLoader = new DRACOLoader();
            dracoLoader.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.6/");
            loader.setDRACOLoader(dracoLoader);
            loader.crossOrigin = true;
            loader.load(options.entity.renditions.downloadOriginal, function (data) {
                var object = data.scene;
                scene.add(object);
            });
        },
    };
}
