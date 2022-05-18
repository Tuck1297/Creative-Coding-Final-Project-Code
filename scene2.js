import * as THREE from './Threefiles/build/three.module.js';
import { AsciiEffect } from './Threefiles/AsciiEffect3.js';


let scene2Scene, scene2Effect;
let numSpheres = 100;
let sphereArray = [];
let switched = false;
let theta = 0;

function createScene2(camera, renderer) {
    camera.position.set(0, 0, 0);

    scene2Scene = new THREE.Scene();
    scene2Scene.background = new THREE.Color(0x000000);

    const pointLight1 = new THREE.PointLight(0xffffff);
    pointLight1.position.set(500, 500, 500);
    scene2Scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffffff, 0.40);
    pointLight2.position.set(- 500, - 500, - 500);
    scene2Scene.add(pointLight2);

    const Light3 = new THREE.AmbientLight(0xffffff, 0.10);
    Light3.position.set(-500, - 500, - 500);
    scene2Scene.add(Light3);

    const geometry = new THREE.BoxGeometry(20, 20, 20);

    for (let i = 0; i < 1500; i++) {

        const object = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff }));

        object.position.x = Math.random() * 800 - 400;
        object.position.y = Math.random() * 800 - 400;
        object.position.z = Math.random() * 800 - 400;

        scene2Scene.add(object);

    }

    scene2Effect = new AsciiEffect(renderer, ' .+10', { invert: true });
    scene2Effect.setSize(innerWidth, innerHeight);
    scene2Effect.domElement.style.color = '#2bee41';
    scene2Effect.domElement.style.backgroundColor = 'black';

    document.body.appendChild(scene2Effect.domElement);
}

function updateScene2(seconds, audioData, camera, scene, renderer, sceneEffect) {
    camera.position.z = audioData[20];
    camera.rotation.x += 0.01;

    for (let i = 3; i < 1500; i = i + 3) {
        scene.children[i].scale.x = audioData[25] / 80;
        scene.children[i].scale.y = audioData[25] / 80;
        scene.children[i].scale.z = audioData[25] / 80;

        scene.children[i - 1].rotation.x += 0.1;
        scene.children[i - 1].rotation.y += 0.1;
        scene.children[i - 1].rotation.z += 0.1;
    }

    if (seconds > 35) {
        if (switched == false) {
            console.log(document.body)
            // switch from ascii to binary
            document.body.removeChild(sceneEffect.domElement);
            renderer.setSize(innerWidth, innerHeight);
            document.body.appendChild(renderer.domElement);
            switched = true;
        }
        renderer.render(scene2Scene, camera);
    } else {
        scene2Effect.render(scene2Scene, camera);
    }
}
export { createScene2, updateScene2, scene2Scene, scene2Effect };