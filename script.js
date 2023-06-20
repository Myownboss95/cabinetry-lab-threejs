  import * as THREE from "https://cdn.skypack.dev/three@0.136.0";
        import { GLTFLoader } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/loaders/GLTFLoader";

        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(60, 1, 1, 1000);
        camera.position.set(0, 0, 5);
        var renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
        });
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
        loader.load('649131074ac8ef54d6afd9fd_kitchencounter.glb.txt', function (gltf) {
            gltf.scene.scale.setScalar(2);
            base.add(gltf.scene);
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

        renderer.setAnimationLoop(() => {
            if (resize(renderer)) {
                camera.aspect = canvas.clientWidth / canvas.clientHeight;
                camera.updateProjectionMatrix();
            }
            renderer.render(scene, camera);
        });

        function resize(renderer) {
            const canvas = renderer.domElement;
            const width = canvas.clientWidth;
            const height = canvas.clientHeight;
            const needResize = canvas.width !== width || canvas.height !== height;
            if (needResize) {
                renderer.setSize(width, height, false);
            }
            return needResize;
        }

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
renderer.setAnimationLoop(() => {
  if (resize(renderer)) {
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }
  renderer.render(scene, camera);

  // Console log the model's coordinates
//   console.log('Model position:', base.position.x, base.position.y, base.position.z);
});

