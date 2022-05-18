import * as THREE from './Threefiles/build/three.module.js';
import { AsciiEffect } from './Threefiles/AsciiEffect2.js';
// video interactive scene
let scene5Scene, scene5Effect;
let notCleared = false;
let planeMesh, planeMesh2, planeMesh3, planeMesh4, plane5;
let localtimestamp;
let transitionCondition = false;
let setSubTimerConst = false;
let alertdisplayed = false; 
let subTimerConst;
let alertmesh; 
let localtimestampset = false; 

function createScene5(camera, renderer, video) {
    let imageloader = new THREE.TextureLoader();
    camera.position.set(0, 0, 0);

    scene5Scene = new THREE.Scene();
    scene5Scene.background = new THREE.Color(0x000000);

    const pointLight1 = new THREE.PointLight(0xffffff);
    pointLight1.position.set(500, 500, 500);
    scene5Scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffffff, 0.40);
    pointLight2.position.set(- 500, - 500, - 500);
    scene5Scene.add(pointLight2);

    const Light3 = new THREE.AmbientLight(0xffffff, 0.10);
    Light3.position.set(-500, - 500, - 500);
    scene5Scene.add(Light3);

    let sphere = new THREE.Mesh(new THREE.SphereGeometry(50, 20, 10), new THREE.MeshPhongMaterial({ flatShading: true }));
    sphere.position.set(0, 0, -100);
    sphere.scale.x = 0.8;
    sphere.scale.y = 0.8;
    sphere.scale.z = 0.8;

    //scene5Scene.add(sphere);
    //console.log(scene5Scene);

    let videoTexture = new THREE.VideoTexture(video);

    const planeGeometry = new THREE.PlaneGeometry(24, 14);
    const planeMaterial = new THREE.MeshLambertMaterial({
        map: videoTexture,
        side: THREE.DoubleSide
    });
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
        videoTexture.needsUpdate = true;
    }

    planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
    // initial start size before shrinking 
    // position -1,0,-10
    // scale 1.2, 1.0, 1.0
    planeMesh.position.set(-1, 0, -10);
    planeMesh.scale.set(1.3, 1.1, 1.0);
    scene5Scene.add(planeMesh);

    planeMesh2 = new THREE.Mesh(planeGeometry, planeMaterial);
    planeMesh2.position.set(18, 8, -20);
    planeMesh2.scale.set(1.3, 1.1, 1.0);
    scene5Scene.add(planeMesh2);

    planeMesh3 = new THREE.Mesh(planeGeometry, planeMaterial);
    planeMesh3.position.set(18, -6, -20);
    planeMesh3.scale.set(1.3, 1.1, 1.0);
    scene5Scene.add(planeMesh3);

    planeMesh4 = new THREE.Mesh(planeGeometry, planeMaterial);
    planeMesh4.position.set(-11, -6, -20);
    planeMesh4.scale.set(1.3, 1.1, 1.0);
    scene5Scene.add(planeMesh4);

    let alertgeometry = new THREE.PlaneGeometry(25, 3, 128 / 2 - 1, 128 / 4 - 1);
    
    let positionalert = alertgeometry.attributes.position;
    positionalert.usage = THREE.DynamicDrawUsage;

    let alertmaterial = new THREE.MeshBasicMaterial({ map: imageloader.load('./Media/continuetexture2.jpg') });

    alertmesh = new THREE.Mesh(alertgeometry, alertmaterial);
	alertmesh.position.set(-1, -5, -10);
    alertmesh.scale.set(1.0, 1.0, 1.0);
	alertmesh.scale.x = 0.65 

    scene5Effect = new AsciiEffect(renderer, ' .:-+*=1%@0', { invert: true });
    scene5Effect.setSize(innerWidth+300, innerHeight);
    scene5Effect.domElement.style.color = '#2bee41';
    scene5Effect.domElement.style.backgroundColor = 'black';
    document.body.removeChild(renderer.domElement);
    document.body.appendChild(scene5Effect.domElement);


}

function updateScene5(seconds, audioData, camera, scene, renderer, sceneEffect, handsfree) {
    let localcondition = false;
    if (localtimestampset == false) {
        localtimestamp = seconds; 
        localtimestampset = true; 
    }

    if (seconds > 67 && seconds < 75) {
        if (planeMesh.position.x > -11) {
            planeMesh.position.x += -0.20;
        }
        if (planeMesh.position.y < 8) {
            planeMesh.position.y += 0.10;
        }
        if (planeMesh.position.z > -20) {
            planeMesh.position.z += -0.14;
        }
    } else {
    if (alertdisplayed == false && seconds > 75) {
        scene5Scene.add(alertmesh);
        alertdisplayed = true; 
    } 
}

    // Finger Pinch Chech for both hands
    if (handsfree.data.hands != undefined) {
    if (handsfree.data.hands.pinchState[0] != undefined) {
        // console.log("not undefined")
        if (handsfree.data.hands.pinchState[0][0] == "held") {
            // console.log("is released - hand 1")
            if (handsfree.data.hands.pinchState[1] != undefined) {
                // console.log("hand 2 not undefined")
                if (handsfree.data.hands.pinchState[1][0] == "held") {
                    // console.log("is released - hand 2")
                    transitionCondition = true; 
                }
            }
        }
    }
}
    // code below is transition code 
    if (transitionCondition == true) {
        scene5Scene.remove(alertmesh);
        if (setSubTimerConst == false) {
            subTimerConst = seconds;
            setSubTimerConst = true;
        }
        console.log(subTimerConst)
        console.log(seconds)

        if (seconds > subTimerConst-1 && seconds < subTimerConst + 4) {
            planeMesh.rotation.x += 0.03;
            planeMesh2.rotation.x += 0.03;
            planeMesh3.rotation.x += 0.03;
            planeMesh4.rotation.x += 0.03;
        } else {
            if (notCleared == false) {
                scene5Scene.remove(planeMesh);
                scene5Scene.remove(planeMesh2);
                scene5Scene.remove(planeMesh3);
                scene5Scene.remove(planeMesh4);
                notCleared = true;
                localcondition = true;
            }
        }
    }

    scene5Effect.render(scene5Scene, camera);
    //renderer.render(scene5Scene, camera);
    return localcondition;
}

export { createScene5, updateScene5, scene5Scene, scene5Effect };