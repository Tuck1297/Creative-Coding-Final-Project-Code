import * as THREE from './Threefiles/build/three.module.js';
import vShader from './shaders/vertexShader.glsl.js';
import fShader from './shaders/fragmentShader.glsl.js';
import { AsciiEffect } from './Threefiles/AsciiEffect.js';
import {GLTFLoader} from '/Threefiles/GLTFLoader.js';
// zoom into video of space curridor with animated space person running down hall transition to space 
let scene6Scene, scene6Effect, planeMesh, hallVideo;
let numSpheres = 100;
let sphereArray = [];
let switched = false; 
let theta = 0; 
let effectRemoved = false; 
// set camera start position and create new scene 
function createScene6(camera, renderer) {
    camera.position.set(0,0,0);

    scene6Scene = new THREE.Scene();
    scene6Scene.background = new THREE.Color(0x000000);

    const pointLight1 = new THREE.PointLight(0xffffff);
    pointLight1.position.set(500, 500, 500);
    scene6Scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffffff, 0.40);
    pointLight2.position.set(- 500, - 500, - 500);
    scene6Scene.add(pointLight2);

    const Light3 = new THREE.AmbientLight(0xffffff, 0.10);
    Light3.position.set(-500, - 500, - 500);
    scene6Scene.add(Light3);

    let sphere = new THREE.Mesh(new THREE.SphereGeometry(50, 20, 10), new THREE.MeshPhongMaterial({ flatShading: true }));
    sphere.position.set(0,0,-100);
    sphere.scale.x = 0.8;
    sphere.scale.y = 0.8;
    sphere.scale.z = 0.8;

    //scene6Scene.add(sphere);
    console.log(scene6Scene)
    //document.body.appendChild(renderer.domElement);

   //scene6Scene.add(hall);

   hallVideo = document.getElementById('video3');
            let videoTexture = new THREE.VideoTexture(hallVideo);
            videoTexture.needsUpdate = true;
            
            // need to add a plane with the same specifics as the grid
            const planeGeometry = new THREE.PlaneGeometry(30,14);
			const planeMaterial = new THREE.MeshBasicMaterial({
				side: THREE.FrontSide,
                 toneMapped: false,
                 map: videoTexture
			});
            planeMaterial.needsUpdate = true;
			planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
			planeMesh.position.set(0,0,-10);
			planeMesh.rotation.set(0,0,0);
            //planeMesh.rotation.x = rotation_x_temp;
            //scene6Scene.add(planeMesh);

    scene6Effect = new AsciiEffect(renderer, ' .+10', { invert: true });
	scene6Effect.setSize(window.innerWidth, window.innerHeight);
	scene6Effect.domElement.style.color = 'green';
	scene6Effect.domElement.style.backgroundColor = 'black';

    document.body.appendChild(scene6Effect.domElement);

}

function updateScene6(seconds, audioData, camera, scene, renderer, sceneEffect) {
    //scene.children[3].rotation.x += 0.01; 
    if (seconds > 50 && seconds < 53) {
        //hall.position.z += 5;
        scene6Effect.render(scene6Scene, camera);
       
    } else {
        if (effectRemoved == false) {
            document.body.removeChild(scene6Effect.domElement);
            document.body.appendChild(renderer.domElement);
            scene6Scene.add(planeMesh);
            console.log("removed");
            effectRemoved = true; 
            hallVideo.play();
        }
        //hall.position.z += 5;
        renderer.render(scene6Scene, camera);
    }
}

export{createScene6, updateScene6, scene6Scene, scene6Effect};