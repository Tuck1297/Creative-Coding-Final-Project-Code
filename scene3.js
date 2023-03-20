import * as THREE from './Threefiles/build/three.module.js';
import vShader from './shaders/vertexShader.glsl copy.js';
import fShader from './shaders/fragmentShader.glsl copy.js';

let scene3Scene, scene3Effect, geometry, cube;
let notPlay = false;

function createScene3(camera, renderer) {
    let imageloader = new THREE.TextureLoader();
    camera.position.set(0, 0, -40);

    scene3Scene = new THREE.Scene();
    scene3Scene.background = new THREE.Color(0x203354);

    const pointLight1 = new THREE.PointLight(0xffffff, 0.05);
    pointLight1.position.set(500, 500, 500);
    //scene3Scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffffff, 0.00);
    pointLight2.position.set(- 500, - 500, - 500);
    //scene3Scene.add(pointLight2);

    const Light3 = new THREE.AmbientLight(0xffffff, 0.40);
    Light3.position.set(-500, - 500, - 500);
    scene3Scene.add(Light3);

    let futureVideo = document.getElementById('video1');
    futureVideo.onloadeddata = function () {
        futureVideo.play();
    };

    let videoTexture = new THREE.VideoTexture(futureVideo);
    videoTexture.needsUpdate = true;

    const planeGeometry = new THREE.PlaneGeometry(1000, 1000);
    const planeMaterial = new THREE.MeshBasicMaterial({
        side: THREE.FrontSide,
        toneMapped: false,
        map: videoTexture
    });
    planeMaterial.needsUpdate = true;
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.position.set(0, 0, -300);
    scene3Scene.add(plane);

    let uniforms = {
        colorB: { type: 'vec3', value: new THREE.Color(0xACB6E5) },
        colorA: { type: 'vec3', value: new THREE.Color(0x74ebd5) },
        time: {
            type: "f",
            value: 0.0
        },
        tExplosion: {
            value: THREE.ImageUtils.loadTexture('./Media/texture3.jpg')
        }
    }

    let sphereGeometry = new THREE.IcosahedronGeometry(40, 8);
    let material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        fragmentShader: fShader, vertexShader: vShader
    });


    let sphere = new THREE.Mesh(sphereGeometry, material);
    sphere.position.set(0, 0, -200);
    sphere.scale.x = 0.8;
    sphere.scale.y = 0.8;
    sphere.scale.z = 0.8;

    scene3Scene.add(sphere);

    geometry = new THREE.PlaneGeometry(20000, 20000, 128 - 1, 128 - 1);
    geometry.rotateX(- Math.PI / 2);

    const position = geometry.attributes.position;
    position.usage = THREE.DynamicDrawUsage;

    for (let i = 0; i < position.count; i++) {

        const y = 35 * Math.sin(i / 2);
        position.setY(i, y);

    }

    const texture = new THREE.TextureLoader().load('./Media/water.jpg');
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(5, 5);

    let watermaterial = new THREE.MeshBasicMaterial({ color: 0x0ef5ef, map: texture });

    let mesh = new THREE.Mesh(geometry, watermaterial);
    mesh.position.y = -80;
    scene3Scene.add(mesh);

    let cubegeometry = new THREE.BoxGeometry(20, 20, 20);
    cube = new THREE.Mesh(cubegeometry, new THREE.MeshLambertMaterial({ color: 0x0000ff }));
    cube.position.set(0, 0, -60);
    scene3Scene.add(cube);

    return geometry;
}

function updateScene3(time, audioData, camera, scene, renderer, sceneEffect, start, geometry) { 
    if (scene.children[4].position.x < 50) {
        scene.children[4].position.x -= 1;
    } else {
        scene3Scene.remove(cube);
    }

    scene.children[2].material.uniforms['time'].value = .00025 * (Date.now() - start);

    if (notPlay != true) {
        let playVideo = document.getElementById('video1');
        playVideo.play();
        notPlay = true;
    }

    camera.position.z -= 0.2;

    const position = geometry.attributes.position;

    for (let i = 0; i < position.count; i++) {

        const y = 35 * Math.sin(i / 5 + (time + i) / 7);
        position.setY(i, y);

    }
    position.needsUpdate = true;
    renderer.render(scene3Scene, camera);
}
export { createScene3, updateScene3, scene3Scene, scene3Effect };