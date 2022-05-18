import * as THREE from './Threefiles/build/three.module.js';
import vShader from './shaders/vertexShader.glsl.js';
import fShader from './shaders/fragmentShader.glsl.js';
import { AsciiEffect } from './Threefiles/AsciiEffect.js';
// space earth transition to binary ball bounce
let scene7Scene, scene7Effect;
let numSpheres = 100;
let sphereArray = [];
let switched = false; 
let theta = 0; 
let sphere; 
// set camera start position and create new scene 
function createScene7(camera, renderer, sphereMaterial) {
    camera.position.set(0,0,0);

    scene7Scene = new THREE.Scene();
    scene7Scene.background = new THREE.Color(0x000000);

    const pointLight1 = new THREE.PointLight(0xffffff);
    pointLight1.position.set(500, 500, 500);
    scene7Scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffffff, 0.40);
    pointLight2.position.set(- 500, - 500, - 500);
    scene7Scene.add(pointLight2);

    const Light3 = new THREE.AmbientLight(0xffffff, 0.10);
    Light3.position.set(-500, - 500, - 500);
    scene7Scene.add(Light3);

    let sphereGeometry = new THREE.SphereGeometry(50,100,100);
    //let sphereMaterial = new THREE.MeshPhongMaterial({flatShading: true});
   // sphereMaterial.map = earthmap;
   // sphereMaterial.bumpMap = earthbump;
	//sphereMaterial.specularMap = earthspecular;

    sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(0,0,-200);
    sphere.scale.x = 0.8;
    sphere.scale.y = 0.8;
    sphere.scale.z = 0.8;

    scene7Scene.add(sphere);
    console.log(scene7Scene)
    document.body.appendChild(renderer.domElement);
}

function updateScene7(seconds, audioData, camera, scene, renderer, sceneEffect) {
    scene.children[3].rotation.y += 0.001; 
    scene.children[3].position.x += 0.15; 
    renderer.render(scene7Scene, camera);
}

export{createScene7, updateScene7, scene7Scene, scene7Effect};