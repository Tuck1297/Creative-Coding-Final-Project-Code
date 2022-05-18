import * as THREE from './Threefiles/build/three.module.js';
import vShader from './shaders/vertexShader.glsl.js';
import fShader from './shaders/fragmentShader.glsl.js';
import { AsciiEffect } from './Threefiles/AsciiEffect.js';
// dancing character zoom out 
let scene9Scene, scene9Effect;
let numSpheres = 100;
let sphereArray = [];
let switched = false; 
let theta = 0; 
// set camera start position and create new scene 
function createScene9(camera, renderer) {
    camera.position.set(0,0,0);

    scene9Scene = new THREE.Scene();
    scene9Scene.background = new THREE.Color(0x90ee90);

    const pointLight1 = new THREE.PointLight(0xffffff);
    pointLight1.position.set(500, 500, 500);
    scene9Scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffffff, 0.40);
    pointLight2.position.set(- 500, - 500, - 500);
    scene9Scene.add(pointLight2);

    const Light3 = new THREE.AmbientLight(0xffffff, 0.10);
    Light3.position.set(-500, - 500, - 500);
    scene9Scene.add(Light3);

    let sphere = new THREE.Mesh(new THREE.SphereGeometry(50, 20, 10), new THREE.MeshPhongMaterial({ flatShading: true }));
    sphere.position.set(0,0,-100);
    sphere.scale.x = 0.8;
    sphere.scale.y = 0.8;
    sphere.scale.z = 0.8;

    scene9Scene.add(sphere);
    console.log(scene9Scene)
    document.body.appendChild(renderer.domElement);
   // const geometry = new THREE.BoxGeometry(20,20,20);

   // for ( let i = 0; i < 1500; i ++ ) {

   //     const object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff } ) );

  //      object.position.x = Math.random() * 800 - 400;
  //      object.position.y = Math.random() * 800 - 400;
  //      object.position.z = Math.random() * 800 - 400;
////
   //     scene9Scene.add( object );

   // }

    //raycaster = new THREE.RayCaster();

    //scene9Renderer = new THREE.WebGLRenderer({antialias: true});
	//scene9Renderer.setSize(window.innerWidth, window.innerHeight);

    //document.body.appendChild(scene9Renderer.domElement);

}

function updateScene9(seconds, audioData, camera, scene, renderer, sceneEffect) {
    scene.children[3].rotation.x += 0.01; 
    renderer.render(scene9Scene, camera);
}

export{createScene9, updateScene9, scene9Scene, scene9Effect};