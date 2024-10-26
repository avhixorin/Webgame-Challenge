import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const Canvas: React.FC = () => {
    const loader = new GLTFLoader();
    
    function toggleFullScreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }

    document.addEventListener(
        "keydown",
        (e) => {
            if (e.key === "Enter") {
                toggleFullScreen();
            }
        },
        false
    );

    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const mount = mountRef.current;
        if (!mount) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        mount.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);
        camera.position.set(0, 1, 5);
        controls.enableZoom = true;
        controls.dampingFactor = 0.25;
        controls.update();

        const link2 = "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/4k/ballroom_4k.hdr";

        const rgbeLoader = new RGBELoader();
        rgbeLoader.load(link2, (texture) => {
            texture.mapping = THREE.EquirectangularReflectionMapping;
            scene.environment = texture;
            scene.background = texture;

            loader.load(
                './models/ghost.glb',
                (gltf) => {
                    scene.add(gltf.scene);
                },
                (xhr) => {
                    console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
                },
                (error) => {
                    console.log('An error happened');
                }
            );

            const animate = () => {
                requestAnimationFrame(animate);
                controls.update();
                renderer.render(scene, camera);
            };

            animate();
        });
        
        const target = new THREE.Vector3(0.5596781280086383, -0.10046309922937427, 0.1005539426274393);
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        const onClick = (event: MouseEvent) => {
            // Convert mouse coordinates to normalized device coordinates
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

            // Set raycaster from camera and mouse position
            raycaster.setFromCamera(mouse, camera);

            // Calculate intersections
            const intersects = raycaster.intersectObjects(scene.children, true);
            
            if (intersects.length > 0) {
                const intersect = intersects[0];
                console.log("Clicked coordinates:", intersect.point);
                if(intersect.point === target) {
                    console.log("You clicked the ghost!");
                }
            }
        };

        renderer.domElement.addEventListener('click', onClick);

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            renderer.domElement.removeEventListener('click', onClick);
            mount.removeChild(renderer.domElement);
        };
    }, []);

    return <div ref={mountRef} />;
};

export default Canvas;
