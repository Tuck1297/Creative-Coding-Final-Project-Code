import * as THREE from './Threefiles/build/three.module.js';
import { GLTFLoader } from '/Threefiles/GLTFLoader.js';

let introScene, introSceneEffect, desktop, chair;
let introPlane, introPlane2;
let introPlaneRemove2 = false;
let introPlaneFadeIn = true;

function introSceneCreate(camera, renderer) {
    let imageloader = new THREE.TextureLoader();
    camera.position.set(0, 3, -10);

    introScene = new THREE.Scene();
    introScene.background = new THREE.Color(0x00ff00);

    const pointLight1 = new THREE.PointLight(0xffffff);
    pointLight1.position.set(0, 0, 10);
    introScene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffffff, 0.40);
    pointLight2.position.set(- 500, - 500, - 500);
    introScene.add(pointLight2);

    const Light3 = new THREE.AmbientLight(0xffffff, 0.10);
    Light3.position.set(-500, - 500, - 500);
    introScene.add(Light3);

    // Intro Instructions Plane
    const introGeometry = new THREE.PlaneGeometry(3, 1.4);
    const introMaterial = new THREE.MeshLambertMaterial({ 
        opacity: 0.0,
        transparent: true,
        map: imageloader.load('./Media/introInstructions.jpg')
    });
    console.log(introMaterial)
    introPlane = new THREE.Mesh(introGeometry, introMaterial);
    introPlane.position.set(0, 3, -11);
    introScene.add(introPlane);

    const introMaterial2 = new THREE.MeshLambertMaterial({
        color: '#000000'
    });
    introPlane2 = new THREE.Mesh(introGeometry, introMaterial2);
    introPlane2.position.set(0, 3, -11.0001);
    introScene.add(introPlane2);


    const planeGeometry = new THREE.PlaneGeometry(80, 80);
    const planeMaterial = new THREE.MeshLambertMaterial({
        map: imageloader.load('./Media/wallpaper.jpg')
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.position.set(0, 0, -50);
    introScene.add(plane);

    const planeGeometry2 = new THREE.PlaneGeometry(80, 80);
    const planeMaterial2 = new THREE.MeshLambertMaterial({
        map: imageloader.load('./Media/wallpaper.jpg')
    });
    const plane2 = new THREE.Mesh(planeGeometry2, planeMaterial2);
    plane2.position.set(50, 0, -50);
    plane2.rotation.y = 5;
    introScene.add(plane2);

    const planeGeometry3 = new THREE.PlaneGeometry(80, 80);
    const planeMaterial3 = new THREE.MeshLambertMaterial({
        map: imageloader.load('./Media/wallpaper.jpg')
    });
    const plane3 = new THREE.Mesh(planeGeometry3, planeMaterial3);
    plane3.position.set(-50, 0, -50);
    plane3.rotation.y = -5;
    introScene.add(plane3);

    const loader = new GLTFLoader();
    loader.load('./Media/computerdesk.glb', function (gltf) {
        desktop = gltf.scene;
        desktop.scale.set(4, 4, 4);
        desktop.position.set(0, 0, -30);
        desktop.rotation.y = 0;
        introScene.add(desktop);
    });

    loader.load('./Media/chair.glb', function (gltf) {
        chair = gltf.scene;
        chair.scale.set(.08, .08, .08);
        chair.position.set(3, -8, -20);
        chair.rotation.y = 4;

        introScene.add(chair);
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

    introScene.add(mesh);

    document.body.appendChild(renderer.domElement);


}

function introSceneUpdate(seconds, audioData, camera, scene, renderer, sceneEffect) {
    if (seconds < 18) {
        if (introPlaneFadeIn == true) {
            introPlane.material.opacity += 0.01;
        }


        if (seconds > 10 && seconds < 19) {
            introPlaneFadeIn = false;
            if (introPlaneRemove2 == false) {
                scene.remove(introPlane2)
                introPlaneRemove2 = true;
            }
            if (seconds > 10) {
                introPlane.material.opacity -= 0.012; 
            }

        }

    } else { 
        camera.position.z -= 0.05;  
    }

    renderer.render(introScene, camera);
}

export { introSceneCreate, introSceneUpdate, introScene, introSceneEffect };