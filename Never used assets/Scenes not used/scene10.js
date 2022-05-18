import * as THREE from './Threefiles/build/three.module.js';
import vShader from './shaders/vertexShader.glsl.js';
import fShader from './shaders/fragmentShader.glsl.js';
import { AsciiEffect } from './Threefiles/AsciiEffect.js';
// left over may not need
let scene10Scene, scene10Effect;
let numSpheres = 100;
let sphereArray = [];
let switched = false; 
let theta = 0; 
// set camera start position and create new scene 
function createScene10(camera, renderer) {
    camera.position.set(0,0,0);

    scene10Scene = new THREE.Scene();
    scene10Scene.background = new THREE.Color(0xffff00);

    const pointLight1 = new THREE.PointLight(0xffffff);
    pointLight1.position.set(500, 500, 500);
    scene10Scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffffff, 0.40);
    pointLight2.position.set(- 500, - 500, - 500);
    scene10Scene.add(pointLight2);

    const Light3 = new THREE.AmbientLight(0xffffff, 0.10);
    Light3.position.set(-500, - 500, - 500);
    scene10Scene.add(Light3);

    let sphere = new THREE.Mesh(new THREE.SphereGeometry(50, 20, 10), new THREE.MeshPhongMaterial({ flatShading: true }));
    sphere.position.set(0,0,-100);
    sphere.scale.x = 0.8;
    sphere.scale.y = 0.8;
    sphere.scale.z = 0.8;

    scene10Scene.add(sphere);
    console.log(scene10Scene)
    document.body.appendChild(renderer.domElement);
   // const geometry = new THREE.BoxGeometry(20,20,20);

   // for ( let i = 0; i < 1500; i ++ ) {

   //     const object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff } ) );

  //      object.position.x = Math.random() * 800 - 400;
  //      object.position.y = Math.random() * 800 - 400;
  //      object.position.z = Math.random() * 800 - 400;
////
   //     scene10Scene.add( object );

   // }

    //raycaster = new THREE.RayCaster();

    //scene10Renderer = new THREE.WebGLRenderer({antialias: true});
	//scene10Renderer.setSize(window.innerWidth, window.innerHeight);

    //document.body.appendChild(scene10Renderer.domElement);

}

function updateScene10(seconds, audioData, camera, scene, renderer, sceneEffect) {
    scene.children[3].rotation.x += 0.01; 
    renderer.render(scene10Scene, camera);
}

export{createScene10, updateScene10, scene10Scene, scene10Effect};