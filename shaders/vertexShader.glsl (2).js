const vertexShader = `

varying vec3 vUv;

void main() {
    vUv = position;

    vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
    
    gl_Position = projectionMatrix * modelViewMatrix*vec4(position, 1.0);
}



/*
varying vec3 vUv;
varying float noise; 

float turbulence( vec3 p) {
    float w = 100.0;
    float t = -.5; 

    for(float f = 1.0; f <= 10.0; f++) {
        float power = pow(2.0,f);
        t += abs(pnoise(vec3(power*p), vec3(10.0,10.0,10.0))/power);
    }
    return t;
 }

void main() {
    vUv = uv;

    noise = 10.0 * -.10 * turbulence(.5*normal); 

    float b = 5.0 * pnoise(0.05 * position, vec3(100.0));

    float displacement = -10.*noise+b

    vec3 newPosition = position + normal * displacement; 
    //vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
    
    gl_Position = projectionMatrix * modelViewMatrix*vec4(position, 1.0);
}*/
`


export default vertexShader;



