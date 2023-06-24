import * as THREE from "https://cdn.skypack.dev/three@0.136.0";
// document.write('hello yeah');
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/loaders/GLTFLoader";
        // import dat from "https://cdnjs.cloudflare.com/ajax/libs/dat-gui/0.7.7/dat.gui.js"

         // Adding responsiveness for Three.js
         // sizes
         let width = window.innerWidth
         let height = window.innerHeight
        //  const gui = new dat.GUI()
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(45, width/height, 1, 1000);
        camera.position.set(0, 1.2, 5);
        
        
       
        var renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
        });
renderer.setSize(window.innerWidth, window.innerHeight);
function render() {
    if (resize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.width / canvas.height;
        camera.updateProjectionMatrix();
    }
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

function resize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.width;
    const height = canvas.height;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
        renderer.setSize(width, height, false);
    }
    return needResize;
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

// Initial call to resize the renderer
onWindowResize();

// Start rendering
render();
        // responsiveness
        //  window.addEventListener('resize', () => {
        //     width = window.innerWidth
        //     height = window.innerHeight
        //     renderer.setSize(width, height)
        //     camera.aspect = width / height
        //     camera.updateProjectionMatrix()
        //     renderer.render(scene, camera)
        //  })
        
        // renderer.setClearColor(0x000000, 0);
        var canvas = renderer.domElement;
        var container = document.getElementById('container'); // Get the container div element
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

        const loader = new GLTFLoader().setPath('https://uploads-ssl.webflow.com/646dc20061f77e68c17a9199/');
         loader.load('648d48e9319e67c67e9722dc_cabinet_assets.gltf.txt', function (gltf) {
             var cabinet = gltf.scene.children[0];
             const box = new THREE.Box3().setFromObject(gltf.scene);
             let modelSize = new THREE.Vector3();
             const desiredSize = 1.5; // The desired size you want to set
            const scaleFactor = desiredSize / modelSize.length();
            //  cabinet.scale.set(2,2,2 )
             model.scale.set(scaleFactor, scaleFactor, scaleFactor);
             base.add(gltf.scene);
            //  const size = new THREE.Vector3();
            //  const old_height = box.getSize(size).y;
            //  const old_width = box.getSize(size).x;
            //  const ratio = old_width / old_height
            //  const height = container.clientWidth * 0.6 / ratio;
            //  console.log(height)
             camera.aspect = window.innerWidth / window.innerHeight;
             renderer.setSize(window.innerWidth, window.innerWidth );
             camera.updateProjectionMatrix();    
        
        });

        
        var plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -2);
        var raycaster = new THREE.Raycaster();
        var mouse = new THREE.Vector2();
        var pointOfIntersection = new THREE.Vector3();
        canvas.addEventListener("mousemove", onMouseMove, false);

        function onMouseMove(event) {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
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

        // renderer.setAnimationLoop(() => {
        //     if (resize(renderer)) {
        //         camera.aspect = canvas.clientWidth / canvas.clientHeight;
        //         camera.updateProjectionMatrix();
        //     }
        //     renderer.render(scene, camera);
        // });

        // function resize(renderer) {
        //     const canvas = renderer.domElement;
        //     const width = canvas.clientWidth;
        //     const height = canvas.clientHeight;
        //     const needResize = canvas.width !== width || canvas.height !== height;
        //     if (needResize) {
        //         renderer.setSize(width, height, false);
        //     }
        //     return needResize;
        // }

        // Inside the render loop

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
// renderer.setAnimationLoop(() => {
//   if (resize(renderer)) {
//     camera.aspect = canvas.clientWidth / canvas.clientHeight;
//     camera.updateProjectionMatrix();
//   }
//   renderer.render(scene, camera);

  // Console log the model's coordinates
//   console.log('Model position:', base.position.x, base.position.y, base.position.z);
// });

