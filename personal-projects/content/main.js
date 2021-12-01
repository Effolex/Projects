
import * as THREE from 'https://cdn.skypack.dev/three@0.135.0';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.135.0/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from 'https://cdn.skypack.dev/three@0.135.0/examples/jsm/loaders/OBJLoader.js'

import { EffectComposer } from 'https://cdn.skypack.dev/three@0.135.0/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'https://cdn.skypack.dev/three@0.135.0/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'https://cdn.skypack.dev/three@0.135.0/examples/jsm/postprocessing/ShaderPass.js';
import { RGBShiftShader } from 'https://cdn.skypack.dev/three@0.135.0/examples/jsm/shaders/RGBShiftShader.js';
import { AfterimagePass } from 'https://cdn.skypack.dev/three@0.135.0/examples/jsm/postprocessing/AfterimagePass.js';

const scene = new THREE.Scene();
scene.fog = new THREE.Fog( 0x000000, 1, 1000 );

const camera = new THREE.PerspectiveCamera( 75, 
  window.innerWidth/window.innerHeight,
  0.1,
  1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio );

renderer.setSize( window.innerWidth, window.innerHeight);
camera.position.setZ(0.8);
camera.position.setX(2);
camera.position.setY(0);
camera.rotation.y = 0.8;





const loader = new OBJLoader();
let deathStar = THREE.Object3D;
loader.load( 'deathstar.obj', (object) => {
  const tex = new THREE.TextureLoader().load('map.jpg');
  const mat = new THREE.MeshLambertMaterial( { map: tex});
  mat.map.encoding = THREE.sRGBEncoding;
  const scale = new THREE.Vector3(10,10,10)
  object.rotation.y = 17;
  object.rotation.z = 0.02;
  object.scale.set(0.01,0.01,0.01);
  object.traverse( function ( child ) {
  
    if ( child instanceof THREE.Mesh ) {

        child.material.map = tex;

    }

} );
 deathStar = object;
  scene.add(deathStar);
});

//const geometry = new THREE.TorusGeometry( 10, 3, 16, 100)
const geometry = new THREE.SphereGeometry(220, 1000, 1000);
const texture = new THREE.TextureLoader().load('earth16k.jpg');
//texture.anisotropy = renderer.getMaxAnisotropy();
const material = new THREE.MeshStandardMaterial( { map: texture } );
//material.map.minFilter = THREE.LinearFilter;

// const diffuse = texture;
// diffuse.encoding = THREE.sRGBEncoding;
// diffuse.wrapS = THREE.RepeatWrapping;
// diffuse.wrapT = THREE.RepeatWrapping;
// diffuse.repeat.x = 10;
// diffuse.repeat.y = 10;
// const normalMap = texture;
// normalMap.wrapS = THREE.RepeatWrapping;
// normalMap.wrapT = THREE.RepeatWrapping;
// const phyMaterial = new THREE.MeshPhysicalMaterial( {
//   roughness: 0.5,
//   clearcoat: 0.01,
//   clearcoatRoughness: 0.1,
//   map: diffuse,
//   normalMap: normalMap,
// });
const torus = new THREE.Mesh( geometry, material);

torus.position.setZ(-240)
torus.rotation.x = -100;

scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff, 1, 500, 2);
const ambientLight = new THREE.AmbientLight('white',0.01);

scene.add(ambientLight, pointLight)

pointLight.position.set(0, 0, 120)

//  const lightHelper = new THREE.PointLightHelper(pointLight);
//  const gridHelper = new THREE.GridHelper(200, 50);
//  scene.add(lightHelper, gridHelper);

// const controls = new OrbitControls(camera, renderer.domElement);

function randomColor() {
  return Math.floor(Math.random()*256);
}

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function color() {
  return `#${componentToHex(randomColor())}${componentToHex(randomColor())}${componentToHex(randomColor())}`
}

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25);
  const material = new THREE.MeshStandardMaterial( { color: 0xffffff } );
  const star = new THREE.Mesh( geometry, material );
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 200 ));
  star.position.set(x, y, z);

  scene.add(star)
}

Array(200).fill().forEach(addStar);


const spaceTexture = new THREE.TextureLoader().load('starfield.jpg');
scene.background = spaceTexture;
spaceTexture.wrapS = THREE.MirroredRepeatWrapping;
spaceTexture.wrapT = THREE.MirroredRepeatWrapping;

// background 


function handleResize() {
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth/ window.innerHeight;
  camera.updateProjectionMatrix();
}

window.addEventListener('resize', handleResize);

const composer = new EffectComposer( renderer );
const renderScene = new RenderPass( scene, camera );
composer.addPass ( renderScene  );



// const dottedEffect = new ShaderPass( DotScreenShader );
// dottedEffect.uniforms[ 'scale' ].value = 50000;
composer.addPass(new AfterimagePass(0.91));

const rgbShifterEffect = new ShaderPass( RGBShiftShader );
rgbShifterEffect.uniforms[ 'amount' ].value = 0.0015;
composer.addPass(rgbShifterEffect);

function animate() {
  requestAnimationFrame( animate );

  let { x, z, y} = torus.position;
  const angle = 0.00005;
  const holdX = x;
   // X axis rotation
   x = x * Math.cos(angle) - z * Math.sin(angle)
   z = z * Math.cos(angle) + holdX * Math.sin(angle)
 
   // Y axis rotation
   y = y * Math.cos(0.000009) - z * Math.sin(0.000009)

   torus.position.x = x;
   torus.position.y = y;
   torus.position.z = z;

  torus.rotation.x += 0.0001
  torus.rotation.y += 0.0001
  torus.rotation.z += 0.0001
  if(deathStar.rotation) {
    deathStar.rotation.y += 0.00010;
    //deathStar.rotation.x += 0.00010;
    //deathStar.rotation.z -= 0.00015;
  }
  console.log(camera.position)
  //console.log('X ->', objectCreated.rotation.x)
  //console.log('Y ->', objectCreated.rotation.y)
  //controls.update();

  composer.render();
}

animate();
