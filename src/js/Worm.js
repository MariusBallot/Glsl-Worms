import * as THREE from 'three';
var glsl = require('glslify');

class Worm {

    constructor() {
        this.mesh;
        this.uniforms
        this.height = Math.random() * 10 + 10;
        this.bind();
        this.createMesh();
        this.speed = Math.random() / 2 + 0.1
        this.colorR;
    }

    createMesh() {
        this.colorR = new THREE.Color(0xffffff);

        this.uniforms = {
            colorB: {
                type: 'vec3',
                value: new THREE.Color(0x151515)
            },
            colorA: {
                type: 'vec3',
                value: this.colorR
            },
            u_time: {
                type: 'f',
                value: 0.
            }
        }

        this.mesh = new THREE.Mesh(new THREE.CylinderGeometry(1, 0.001, this.height, 20, 100), new THREE.ShaderMaterial({
            uniforms: this.uniforms,
            transparent: true,
            fragmentShader: glsl.file("../shaders/frag.glsl"),
            vertexShader: glsl.file("../shaders/vert.glsl"),
            side: THREE.DoubleSide,
        }));
        this.mesh.position.set(
            (Math.random() - 0.5) * 60,
            (Math.random() - 0.5) * 30,
            (Math.random() - 0.5) * 5
        )
        this.mesh.rotateX(Math.PI / 2)
        this.mesh.rotateZ(Math.PI / 2)

    }

    move() {
        this.mesh.position.z += this.speed;
        if (this.mesh.position.z >= 60) {
            this.mesh.position.z = -60;
        }
    }

    bind() {
        this.createMesh = this.createMesh.bind(this)
    }
}

export {
    Worm as
    default
}