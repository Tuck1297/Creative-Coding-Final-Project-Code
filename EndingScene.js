import * as THREE from './Threefiles/build/three.module.js';
import { AsciiEffect } from './Threefiles/AsciiEffect3.js';
import { GLTFLoader } from './Threefiles/GLTFLoader.js';
let endingScene, endingSceneEffect, desktop, chair, plane, plane2, plane3;
let asciiSwitch = false;
let removedAscii = false;
let timestampconst;
let timestampconstset = false;

function endingSceneCreate(camera, renderer, audioElement, seconds) {
    let imageloader = new THREE.TextureLoader();
    camera.position.set(0, 3, -25);

    endingScene = new THREE.Scene();
    endingScene.background = new THREE.Color(0x00ff00);

    const pointLight1 = new THREE.PointLight(0xffffff);
    pointLight1.position.set(0, 0, 10);
    endingScene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffffff, 0.40);
    pointLight2.position.set(- 500, - 500, - 500);
    endingScene.add(pointLight2);

    const Light3 = new THREE.AmbientLight(0xffffff, 0.10);
    Light3.position.set(-500, - 500, - 500);
    endingScene.add(Light3);


    const planeGeometry = new THREE.PlaneGeometry(80, 80);
    const planeMaterial = new THREE.MeshLambertMaterial({
        map: imageloader.load('./Media/wallpaper.jpg')
    });
    plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.position.set(0, 0, -50);
    endingScene.add(plane);

    const planeGeometry2 = new THREE.PlaneGeometry(80, 80);
    const planeMaterial2 = new THREE.MeshLambertMaterial({
        map: imageloader.load('./Media/wallpaper.jpg')
    });
    plane2 = new THREE.Mesh(planeGeometry2, planeMaterial2);
    plane2.position.set(50, 0, -50);
    plane2.rotation.y = 5;
    endingScene.add(plane2);

    const planeGeometry3 = new THREE.PlaneGeometry(80, 80);
    const planeMaterial3 = new THREE.MeshLambertMaterial({
        map: imageloader.load('./Media/wallpaper.jpg')
    });
    plane3 = new THREE.Mesh(planeGeometry3, planeMaterial3);
    plane3.position.set(-50, 0, -50);
    plane3.rotation.y = -5;
    endingScene.add(plane3);


    const loader = new GLTFLoader();
    loader.load('./Media/computerdesk.glb', function (gltf) {
        desktop = gltf.scene;
        desktop.scale.set(4, 4, 4);
        desktop.position.set(0, 0, -30);
        desktop.rotation.y = 0;
        endingScene.add(desktop);
    });

    loader.load('./Media/chair.glb', function (gltf) {
        chair = gltf.scene;
        chair.scale.set(.08, .08, .08);
        chair.position.set(3, -8, -20);
        chair.rotation.y = 4;

        endingScene.add(chair);
    });


    let imagematerial = new THREE.MeshLambertMaterial({
        map: imageloader.load('./Media/Windows_XP.jpg')
    });

    let imagegeometry = new THREE.PlaneGeometry(10, 10);

    let mesh = new THREE.Mesh(imagegeometry, imagematerial);
    mesh.position.set(0, 3.2, -32.58);
    mesh.scale.set(.69, .38, .45);
    mesh.rotation.x = -0.045;

    console.log(mesh.material)

    endingScene.add(mesh);

    endingSceneEffect = new AsciiEffect(renderer, ' .+10', { invert: true });
    endingSceneEffect.setSize(innerWidth, innerHeight);
    endingSceneEffect.domElement.style.color = '#2bee41';
    endingSceneEffect.domElement.style.backgroundColor = 'black';

    document.body.appendChild(renderer.domElement);
}

function endingSceneUpdate(seconds, audioData, camera, scene, renderer, sceneEffect, sound) {
    let localcondition = false;
    if (timestampconstset == false) {
        timestampconst = seconds;
        timestampconstset = true;
    }

    if (seconds > timestampconst - 1 && seconds < timestampconst + 6) {
        camera.position.z += 0.05;
        renderer.render(endingScene, camera);
    } else if (seconds > timestampconst + 6 && seconds < timestampconst + 10) {
        if (asciiSwitch == false) {
            document.body.removeChild(renderer.domElement);
            document.body.appendChild(sceneEffect.domElement);
            asciiSwitch = true;
        }
        camera.position.z += 0.05;
        sceneEffect.render(scene, camera);
        
        // fade audio to end
        const fadeAudio = setInterval(() => {
            
            if ((sound.volume > 0)) {
                sound.volume -= 0.0005
                if (sound.volume < 0) {
                    sound.volume = 0.01; 
                }
            }

            if (sound.volume < 0.03) {
                clearInterval(fadeAudio);
            }
        }, 200);

    } else {
        if (sound.volume < 0.03) {
            clearInterval(fadeAudio);
        }
        if (removedAscii == false) {
            document.body.removeChild(sceneEffect.domElement);
            removedAscii = true;
        }
        if (seconds > timestampconst + 10 && seconds < timestampconst + 15) {
            localcondition = true;
        }
    }
    return localcondition;
}

export { endingSceneCreate, endingSceneUpdate, endingScene, endingSceneEffect };