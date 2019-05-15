import * as THREE from 'three';
import Worm from './Worm';
import FloatingCam from './FloatingCam';
import OrbitControls from 'orbit-controls-es6';

class ThreeScene {

    constructor() {
        this.camera
        this.scene
        this.renderer
        this.wormCount = 15;
        this.worms = []
        this.floatingCam;
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
        this.camera.position.set(0, 0, -80);
        this.camera.lookAt(this.scene.position)
        // this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        // this.controls.enabled = true;
        // this.controls.maxDistance = 1500;
        // this.controls.minDistance = 0;
        this.floatingCam = new FloatingCam(this.camera)


        for (let i = 0; i < this.wormCount; i++) {
            this.worms[i] = new Worm();
            let offset = 50;
            this.scene.add(this.worms[i].mesh)
        }
        this.bind()

        this.scene.rotateY(-Math.PI / 2)

        document.addEventListener("mousemove", this.floatingCam.moveCam)
    }

    update() {
        for (let i = 0; i < this.wormCount; i++) {
            this.renderer.render(this.scene, this.camera)
            this.worms[i].uniforms.u_time.value++;
            this.worms[i].move();
        }

        this.floatingCam.update()

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