import * as THREE from "https://cdn.skypack.dev/three@0.136.0";
// document.write('hello yeah');
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/loaders/GLTFLoader";
// import dat from "https://cdnjs.cloudflare.com/ajax/libs/dat-gui/0.7.7/dat.gui.js"

// Adding responsiveness for Three.js
// sizes
let width = window.innerWidth;
let height = window.innerHeight;
//  const gui = new dat.GUI()
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
camera.position.set(0, 1.2, 5);

var renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
});

// renderer.setClearColor(0x000000, 0);
var canvas = renderer.domElement;
var container = document.getElementById("container"); // Get the container div element
container.appendChild(canvas);

var light = new THREE.DirectionalLight(0xffffff, 0.5);
light.position.set(1, 1, 1);
const light1 = new THREE.PointLight(0xffffff, 2, 0);
light1.position.set(200, 100, 300);
scene.add(light1);
scene.add(light);
scene.add(new THREE.AmbientLight(0xffffff, 0.8));

let base = new THREE.Object3D();
scene.add(base);

const loader = new GLTFLoader().setPath(
  "https://uploads-ssl.webflow.com/646dc20061f77e68c17a9199/"
);
loader.load(
  "648d48e9319e67c67e9722dc_cabinet_assets.gltf.txt",
  function (gltf) {
    var cabinet = gltf.scene.children[0];
    const model = gltf.scene;
    const box = new THREE.Box3().setFromObject(gltf.scene);
    let modelSize = new THREE.Vector3();
    box.getSize(modelSize);
      const desiredSize = 5.5; // The desired size you want to set
      let length = modelSize.length();
    const scaleFactor = desiredSize / length;
    //  cabinet.scale.set(2,2,2 )
      model.scale.set(scaleFactor, scaleFactor, scaleFactor);
      onWindowResize(model, length)
    console.log(scaleFactor);
    base.add(model);
    camera.aspect = window.innerWidth / window.innerHeight;
    const rendererWidth = modelSize.x * (window.innerWidth / window.innerHeight);
    const rendererHeight = modelSize.y * (window.innerWidth / window.innerHeight);
      renderer.setSize(window.innerWidth, window.innerHeight);
    
    camera.updateProjectionMatrix();
  }
);

//new resizing
const onWindowResize = (model, length) => {
    
const sizeMappings = [
  { maxSize: 576, desiredSize: 2 },    // Extra Small (XS)
  { maxSize: 768, desiredSize: 2 },     // Small (SM)
  { maxSize: 992, desiredSize: 5 },     // Medium (MD)
  { maxSize: 1200, desiredSize: 7 },    // Large (LG)
  { maxSize: Infinity, desiredSize: 8 } // Extra Large (XL)
];

const { desiredSize } = sizeMappings.find(({ maxSize }) => window.innerWidth <= maxSize);

  const resizeScaleFactor = desiredSize / length;
  model.scale.set(resizeScaleFactor, resizeScaleFactor, resizeScaleFactor);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", onWindowResize, false);

// Initial call to resize the renderer
onWindowResize();

var plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -2);
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var pointOfIntersection = new THREE.Vector3();
canvas.addEventListener("mousemove", onMouseMove, false);

function onMouseMove(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  raycaster.ray.intersectPlane(plane, pointOfIntersection);
  base.lookAt(pointOfIntersection);
}
// canvas.addEventListener("mouseout", onMouseOut, false);
function onMouseOut(event) {
  //    camera.aspect = window.innerWidth / window.innerHeight;
  //  renderer.setSize(window.innerWidth, window.innerWidth );
  //  camera.updateProjectionMatrix();
}

function animate() {
  requestAnimationFrame(animate);

  // Update the model's position
  const time = Date.now() * 0.001; // Get the current time in seconds
  const speed = 2.5; // Adjust the speed of the floating effect
  const amplitude = 0.07; // Adjust the height of the floating effect
  const yOffset = Math.sin(time * speed) * amplitude; // Calculate the Y-offset based on time

  base.position.setY(yOffset + 0.1); // Add an offset of 1 to keep it above the ground level

  renderer.render(scene, camera);
}

animate();
