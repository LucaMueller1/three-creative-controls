import './style.css';
import * as THREE from "three";
import { CreativeControls } from "./CreativeControls"


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(30);
renderer.render(scene, camera);

const creativeControls = CreativeControls.Controls(camera, renderer.domElement);


const gridHelper = new THREE.GridHelper(200, 50);
scene.add(gridHelper);


//animate loop
const animate = () => {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  CreativeControls.update(creativeControls);
  
};
animate();