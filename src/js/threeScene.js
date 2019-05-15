import * as THREE from 'three';
import Worm from './Worm';
import OrbitControls from 'orbit-controls-es6';

class ThreeScene {

    constructor() {
        this.camera
        this.scene
        this.renderer
        this.worms = []
    }

    init() {
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        this.scene = new THREE.Scene()

        this.camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(-10, 10, 10)
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enabled = true;
        this.controls.maxDistance = 1500;
        this.controls.minDistance = 0;

        for (let i = 0; i < 10; i++) {
            this.worms[i] = new Worm();
            let offset = 50;
            this.scene.add(this.worms[i].mesh)
        }
        this.bind()
    }

    update() {
        for (let i = 0; i < 10; i++) {
            this.renderer.render(this.scene, this.camera)
            this.worms[i].uniforms.u_time.value++;
            this.worms[i].move();
        }
    }

    resizeCanvas() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.camera.aspect = window.innerWidth / window.innerHeight
        this.camera.updateProjectionMatrix();
    }

    bind() {
        this.resizeCanvas = this.resizeCanvas.bind(this)
        window.addEventListener('resize', this.resizeCanvas)

    }
}

export {
    ThreeScene as
    default
}