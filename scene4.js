import * as THREE from './Threefiles/build/three.module.js';
import vShader from './shaders/vertexShader.glsl.js';
import fShader from './shaders/fragmentShader.glsl.js';
import { AsciiEffect } from './Threefiles/AsciiEffect.js';
import { GLTFLoader } from './Threefiles/GLTFLoader.js';
// tron bike scene
let scene4Scene, scene4Effect, gridHelper
let car = null;
let switched = false;
let removedCar = false;
let asciiRenderChange = false;
let rotation_x_temp = 0;
let planeMesh;
let notPlay = false;

function createScene4(camera, renderer) {
    camera.position.set(0, 0, 10);

    scene4Scene = new THREE.Scene();
    scene4Scene.background = new THREE.Color(0x000000);

    const pointLight1 = new THREE.PointLight(0xffffff);
    pointLight1.position.set(0, 0, 10);
    scene4Scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffffff, 0.40);
    pointLight2.position.set(- 500, - 500, - 500);
    scene4Scene.add(pointLight2);

    const Light3 = new THREE.AmbientLight(0xffffff, 0.10);
    Light3.position.set(-500, - 500, - 500);
    scene4Scene.add(Light3);
    const loader = new GLTFLoader();

    const size = 1000;
    const divisions = 20;

    gridHelper = new THREE.GridHelper(size, divisions);
    gridHelper.position.set(0, 30, -1000);
    gridHelper.rotation.set(0.1, 0, 0);
    gridHelper.scale.set(4.0, 4.0, 4.0);
    scene4Scene.add(gridHelper);

    loader.load('./Media/car.glb', function (gltf) {
        car = gltf.scene;
        car.scale.set(1.0, 1.0, 1.0);
        car.rotation.x = 0.0;
        car.rotation.y = -0.1;
        car.position.set(2.5, 0.8, 6);
        scene4Scene.add(car);
    });
    document.body.appendChild(renderer.domElement);

}

function updateScene4(seconds, audioData, camera, scene, renderer, sceneEffect) {

    let imageloader = new THREE.TextureLoader();
    if (seconds < 51) {
        if (car != null) car.position.x -= .3;
        renderer.render(scene4Scene, camera);
    } else if (seconds > 51 && seconds < 55) {
        if (switched == false) {
            //console.log("switched scene 4");
            switched = true;
            car.scale.set(0.3, 0.3, 0.3);
            car.rotation.x = 0;
            car.rotation.y = -1.61;
            car.rotation.z = -0.6;
            car.position.set(0, -4, -15);
            scene4Scene.remove(gridHelper);
            gridHelper = new THREE.GridHelper(1000, 200);
            gridHelper.position.set(0, 30, -1000);
            gridHelper.rotation.set(0.8, 0, 0);
            gridHelper.scale.set(8.0, 4.0, 4.0);
            scene4Scene.add(gridHelper);
        }
        car.position.y += 0.07;
        car.position.z -= 0.10;
        car.position.x -= 0.001;
        renderer.render(scene4Scene, camera);
    } else if (seconds > 55 && seconds < 57.97) {
        if (removedCar == false) {
            scene4Scene.remove(car);
            removedCar = true;
        }
        gridHelper.rotation.x += 0.002;
        rotation_x_temp = gridHelper.rotation.x;
        renderer.render(scene4Scene, camera);
    } else {
        scene4Scene.remove(gridHelper);
        // grid binary representation 
        if (asciiRenderChange == true) {

            const planeGeometry = new THREE.PlaneGeometry(100, 50, 10, 10);
            const planeMaterial = new THREE.MeshBasicMaterial({
                side: THREE.FrontSide,
                toneMapped: false,
                map: imageloader.load('/Media/gold.jpg')
            });
            planeMaterial.needsUpdate = true;
            planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
            planeMesh.position.set(0, 0, -10);
            planeMesh.rotation.set(-0.3, 0, 0);

            scene4Effect = new AsciiEffect(renderer, ' .+10', { invert: true });
            scene4Effect.setSize(innerWidth, innerHeight);
            scene4Effect.domElement.style.color = 'green';
            scene4Effect.domElement.style.backgroundColor = 'black';
            document.body.removeChild(renderer.domElement);
            document.body.appendChild(scene4Effect.domElement);
            asciiRenderChange = true;
        }
    }
}

export { createScene4, updateScene4, scene4Scene, scene4Effect };