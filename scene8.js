import * as THREE from './Threefiles/build/three.module.js';
import { ImprovedNoise } from './Threefiles/ImprovedNoise.js';

// Perlin noise cube scene
let scene8Scene, scene8Effect;
let geometry, position, mesh, mesh2;
let material, texture, geometry2;
let timeConst, timeConstSet = false;
let meshalert;
 
function createScene8(camera, renderer) {
    let imageloader = new THREE.TextureLoader();
    camera.position.set(0, 200, 1000);

    scene8Scene = new THREE.Scene();
    scene8Scene.background = new THREE.Color(0x000000);

    const pointLight1 = new THREE.PointLight(0xffffff);
    pointLight1.position.set(500, 500, 500);
    scene8Scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffffff, 0.40);
    pointLight2.position.set(- 500, - 500, - 500);
    scene8Scene.add(pointLight2);

    const Light3 = new THREE.AmbientLight(0xffffff, 0.10);
    Light3.position.set(-500, - 500, - 500);
    scene8Scene.add(Light3);

    let geometryalert = new THREE.PlaneGeometry(4000, 200, 128 / 2 - 1, 128 / 4 - 1);
    
    let positionalert = geometryalert.attributes.position;
    positionalert.usage = THREE.DynamicDrawUsage;

    let materialalert = new THREE.MeshBasicMaterial({ map: imageloader.load('./Media/continuetexture.jpg') });

    meshalert = new THREE.Mesh(geometryalert, materialalert);
	meshalert.position.y = 800;
	meshalert.scale.x = 0.62;
    scene8Scene.add(meshalert); 

    // Perlin noise box
    // Texture
    const size = 128;
    const data = new Uint8Array(size * size * size);

    let i = 0;
    const perlin = new ImprovedNoise();
    const vector = new THREE.Vector3();

    for (let z = 0; z < size; z++) {

        for (let y = 0; y < size; y++) {

            for (let x = 0; x < size; x++) {

                vector.set(x, y, z).divideScalar(size);

                const d = perlin.noise(vector.x * 6.5, vector.y * 6.5, vector.z * 6.5);

                data[i++] = d * 128 + 128;

            }

        }

    }

    texture = new THREE.Data3DTexture(data, size, size, size);
    texture.format = THREE.RedFormat;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.unpackAlignment = 1;
    texture.needsUpdate = true;

    // Material

    const vertexShader = /* glsl */`
    in vec3 position;

    uniform mat4 modelMatrix;
    uniform mat4 modelViewMatrix;
    uniform mat4 projectionMatrix;
    uniform vec3 cameraPos;

    out vec3 vOrigin;
    out vec3 vDirection;

    void main() {
        vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );

        vOrigin = vec3( inverse( modelMatrix ) * vec4( cameraPos, 1.0 ) ).xyz;
        vDirection = position - vOrigin;

        gl_Position = projectionMatrix * mvPosition;
    }
`;

    const fragmentShader = /* glsl */`
    precision highp float;
    precision highp sampler3D;

    uniform mat4 modelViewMatrix;
    uniform mat4 projectionMatrix;

    in vec3 vOrigin;
    in vec3 vDirection;

    out vec4 color;

    uniform sampler3D map;

    uniform float threshold;
    uniform float steps;

    vec2 hitBox( vec3 orig, vec3 dir ) {
        const vec3 box_min = vec3( - 0.5 );
        const vec3 box_max = vec3( 0.5 );
        vec3 inv_dir = 1.0 / dir;
        vec3 tmin_tmp = ( box_min - orig ) * inv_dir;
        vec3 tmax_tmp = ( box_max - orig ) * inv_dir;
        vec3 tmin = min( tmin_tmp, tmax_tmp );
        vec3 tmax = max( tmin_tmp, tmax_tmp );
        float t0 = max( tmin.x, max( tmin.y, tmin.z ) );
        float t1 = min( tmax.x, min( tmax.y, tmax.z ) );
        return vec2( t0, t1 );
    }

    float sample1( vec3 p ) {
        return texture( map, p ).r;
    }

    #define epsilon .0001

    vec3 normal( vec3 coord ) {
        if ( coord.x < epsilon ) return vec3( 1.0, 0.0, 0.0 );
        if ( coord.y < epsilon ) return vec3( 0.0, 1.0, 0.0 );
        if ( coord.z < epsilon ) return vec3( 0.0, 0.0, 1.0 );
        if ( coord.x > 1.0 - epsilon ) return vec3( - 1.0, 0.0, 0.0 );
        if ( coord.y > 1.0 - epsilon ) return vec3( 0.0, - 1.0, 0.0 );
        if ( coord.z > 1.0 - epsilon ) return vec3( 0.0, 0.0, - 1.0 );

        float step = 0.01;
        float x = sample1( coord + vec3( - step, 0.0, 0.0 ) ) - sample1( coord + vec3( step, 0.0, 0.0 ) );
        float y = sample1( coord + vec3( 0.0, - step, 0.0 ) ) - sample1( coord + vec3( 0.0, step, 0.0 ) );
        float z = sample1( coord + vec3( 0.0, 0.0, - step ) ) - sample1( coord + vec3( 0.0, 0.0, step ) );

        return normalize( vec3( x, y, z ) );
    }

    void main(){

        vec3 rayDir = normalize( vDirection );
        vec2 bounds = hitBox( vOrigin, rayDir );

        if ( bounds.x > bounds.y ) discard;

        bounds.x = max( bounds.x, 0.0 );

        vec3 p = vOrigin + bounds.x * rayDir;
        vec3 inc = 1.0 / abs( rayDir );
        float delta = min( inc.x, min( inc.y, inc.z ) );
        delta /= steps;

        for ( float t = bounds.x; t < bounds.y; t += delta ) {

            float d = sample1( p + 0.5 );

            if ( d > threshold ) {

                color.rgb = normal( p + 0.5 ) * 0.5 + ( p * 1.5 + 0.25 );
                color.a = 1.;
                color.r = 0.; 
                color.b = 0.; 
                break;

            }

            p += rayDir * delta;

        }

        if ( color.a == 0.0 ) discard;

    }
`;

    geometry2 = new THREE.BoxGeometry(1, 1, 1);
    material = new THREE.RawShaderMaterial({
        glslVersion: THREE.GLSL3,
        uniforms: {
            map: { value: texture },
            cameraPos: { value: new THREE.Vector3() },
            threshold: { value: 0.6 },
            steps: { value: 200 }
        },
        vertexShader,
        fragmentShader,
        side: THREE.BackSide,
    });

    mesh2 = new THREE.Mesh(geometry2, material);
    mesh2.position.set(0, 200, 998);
    scene8Scene.add(mesh2);

    const worldWidth = 128, worldDepth = 128;

    geometry = new THREE.PlaneGeometry(4000, 2000, worldWidth / 2 - 1, worldDepth / 4 - 1);
    geometry.rotateX(- Math.PI / 2);

    position = geometry.attributes.position;
    position.usage = THREE.DynamicDrawUsage;

    material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });

    mesh = new THREE.Mesh(geometry, material);
    scene8Scene.add(mesh);

    console.log(scene8Scene)
    renderer.setSize(innerWidth, innerHeight); 
    document.body.appendChild(renderer.domElement);

}

function updateScene8(seconds, audioData, camera, scene, renderer, sceneEffect, handsfree) {
    let localcondition = false;

    mesh2.material.uniforms.cameraPos.value.copy(camera.position);

    // Hand position affect cub geometry and location logic
    if (handsfree.data.hands != undefined) {
        if (handsfree.data.hands.multiHandLandmarks[0] != undefined) {
            // console.log(handsfree.data.hands.multiHandLandmarks[0][0].x);
            mesh2.material.uniforms.threshold.value = handsfree.data.hands.multiHandLandmarks[0][0].x;
             let size = (handsfree.data.hands.multiHandLandmarks[0][0].y - 0.7) * (0 + 10) / (0.4 - 0.7);
                mesh2.scale.set(Math.max(size * 0.2, 1), Math.max(size * 0.2, 1), Math.max(size * 0.2, 1));
            // console.log(size);
        } else {
            mesh2.material.uniforms.threshold.value = 0.6;
        }
    }

    // Slowly rotate cube on x and z axis
    mesh2.rotation.x = seconds * 0.05;
    mesh2.rotation.z = seconds * 0.05;
    const position = geometry.attributes.position;

    // Floor wireframe plane - update vertices with audio data
    for (let i = 0; i < position.count; i++) {
        let dataIndex = i % audioData.length;
        //const y = 35 * Math.sin( i / 5 + ( time + i ) / 7 );
        const y = audioData[dataIndex];
        position.setY(i, y);

    }

    position.needsUpdate = true;

    renderer.render(scene8Scene, camera);

    // If pinching both fingers with thumbs is true then 
    // set local variable to true. 
     if (timeConstSet == false) {
     timeConst = seconds; 
     timeConstSet = true; 
     }
      
      // allow the user to move on after 10 seconds
      // Finger pinch logic
      if (seconds > timeConst+10) {
    if (handsfree.data.hands != undefined) {
        if (handsfree.data.hands.pinchState[0] != undefined) {

            if (handsfree.data.hands.pinchState[0][0] == "held") {

                if (handsfree.data.hands.pinchState[1] != undefined) {

                    if (handsfree.data.hands.pinchState[1][0] == "held") {

                        localcondition = true;
                    }
                }
            }
        }
    }
}

    return localcondition;
}

export { createScene8, updateScene8, scene8Scene, scene8Effect };