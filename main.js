import './style.css';
import * as THREE from "three";
import { CreativeControls } from "./CreativeControls"
import { Vector3 } from 'three';


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

const blocker = document.getElementById('blocker');
const menu = document.getElementById('menu');

const creativeControls = CreativeControls.Controls(camera, renderer.domElement, menu, blocker);
const creativeControlsSpeed = new Vector3(200, 200, 200);


const gridHelper = new THREE.GridHelper(200, 50);
scene.add(gridHelper);


//animate loop
const animate = () => {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  CreativeControls.update(creativeControls, creativeControlsSpeed);
  
};
animate();