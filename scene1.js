import * as THREE from './Threefiles/build/three.module.js';
import vShader from './shaders/vertexShader.glsl.js';
import fShader from './shaders/fragmentShader.glsl.js';
import { AsciiEffect } from './Threefiles/AsciiEffect.js';
let scene1Scene, scene1Effect;
let numSpheres = 100;
let sphereArray = [];
let switched = false;  

function createScene1(camera, renderer) {
	camera.position.set(50, 200, 900);
    scene1Scene = new THREE.Scene();
    scene1Scene.background = new THREE.Color(0, 0, 0);

    const pointLight1 = new THREE.PointLight(0xffffff);
    pointLight1.position.set(500, 500, 500);
    scene1Scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffffff, 0.40);
    pointLight2.position.set(- 500, - 500, - 500);
    scene1Scene.add(pointLight2);

    const Light3 = new THREE.AmbientLight(0xffffff, 0.10);
    Light3.position.set(-500, - 500, - 500);
    scene1Scene.add(Light3);

	renderer.setSize(window.innerWidth, window.innerHeight);

    let zVal = 0; 
			for (let i = 0; i < numSpheres / 10; i++) {
				for (let j = 0; j < numSpheres / 10; j++) {
					let sphere = new THREE.Mesh(new THREE.SphereGeometry(100, 20, 10), new THREE.MeshPhongMaterial({ flatShading: false }));
					sphere.scale.x = 0.8;
					sphere.scale.y = 0.8;
					sphere.scale.z = 0.8;
					sphere.position.z = zVal;
					sphere.position.x = -2200 + (j * 700);
					sphere.position.y = -200 + (i * 200);
					scene1Scene.add(sphere);
					sphereArray.push(sphere);
					const customShaderMaterial = new THREE.ShaderMaterial({
						vertexShader: vShader,
						fragmentShader: fShader,
						wireframe: false
					});
				}
				zVal += -200;
			}
           // console.log(scene1Scene) 
            document.body.appendChild(renderer.domElement);

}

function updateScene1(seconds, audioData, camera, renderer) {
    camera.position.x += 2; 
    camera.position.z -= 5;
    camera.position.y += 3; 
    
    for (let j = 0; j < numSpheres; j++) {
        let mod = j+100 % audioData.length;
        sphereArray[j].scale.x = 1 + audioData[mod] / 80;
        sphereArray[j].scale.y = 1 + audioData[mod] / 80;
        sphereArray[j].scale.z = 1 + audioData[mod] / 80; 
    }
    if (seconds > 28) {
        if (switched == false) {
        scene1Effect = new AsciiEffect(renderer, ' .,:+!10', { invert: true });
        //scene1Effect = new AsciiEffect(scene1Renderer, ' .,:;$#@&', { invert: true });
        scene1Effect.setSize(innerWidth, innerHeight);
        scene1Effect.domElement.style.color = '#2bee41';
        scene1Effect.domElement.style.backgroundColor = 'black';
        document.body.removeChild(renderer.domElement);
        document.body.appendChild(scene1Effect.domElement);
        
        switched = true; 
        }
        scene1Effect.render(scene1Scene, camera);
    }
    else {
        renderer.render(scene1Scene, camera);
    }

}


export{createScene1, updateScene1, scene1Scene, scene1Effect};