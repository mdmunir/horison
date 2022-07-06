<template>
    <div style="display: flex;justify-content: center;"></div>
</template>
<script>
    import * as THREE from 'three';
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
    import {sincos} from 'astronomia/src/base';
    import {getImage} from '@/libs/gif-generator';
    import vertexShader from '!raw-loader!./webgl/vertex.c';
    import fragmentShader from '!raw-loader!./webgl/hilal-fragment.c';

    export default{
        props: {
            type: {
                type: String,
                default: 'mer',
            },
            texture: {
                type: [String, Object],
                default: 'images/earth_1600.jpg',
            },
            uniform: {
                type: Object,
                default() {
                    return {};
                },
            },
            scale: {
                type: Number,
                default: 100,
            },
        },
        data() {
            var padding = 0.01;
            const models = {
                globe: new THREE.SphereGeometry(1, 128, 64),
                mer: new THREE.PlaneGeometry(2, 2),
            };
            this.uniform.txtr = {value: new THREE.TextureLoader().load(this.texture)};
            const material = new THREE.ShaderMaterial({
                uniforms: this.uniform,
                vertexShader: vertexShader,
                fragmentShader: fragmentShader,
            });

            const data = {
                animated: true,
                camera: new THREE.OrthographicCamera(-1 - padding, 1 + padding, 1 + padding, -1 - padding, 0.1, 10),
                controls: null,
                scene: new THREE.Scene(),
                renderer: new THREE.WebGLRenderer(),
                models: models,
                material: material,
                mesh: new THREE.Mesh(models[this.type], material),
            };
            data.camera.position.set(0, 0, 4);
            data.renderer.setPixelRatio(window.devicePixelRatio);
            data.mesh.position.x = 0;
            data.mesh.position.y = 0;
            data.scene.add(data.mesh);

            return data;
        },
        mounted() {
            var th = this;
            this.$el.appendChild(this.renderer.domElement);

            this.animate();
            this.resize();
            this.$nuxt.$on('pushmenu-click', function () {
                th.resize(300);
            });
            window.addEventListener('resize', function () {
                th.resize();
            });

            var controls = this.controls = new OrbitControls(this.camera, this.$el);
            controls.rotateSpeed = 1.0;
            controls.zoomSpeed = 1.2;
            controls.panSpeed = 0.8;
            controls.enableZoom = true;
            controls.enablePan = true;
            controls.staticMoving = true;
            controls.dynamicDampingFactor = 0.3;
            controls.keys = [65, 83, 68];
            controls.autoRotate = false;
            controls.keys = [65, 83, 68];
            controls.minZoom = 1;
            controls.maxZoom = 5;
            controls.addEventListener('change', function () {
                th.render();
            });
            controls.enableRotate = (this.type == 'globe');
        },
        methods: {
            render() {
                this.renderer.render(this.scene, this.camera);
            },
            animate() {
                var th = this;
                requestAnimationFrame(function () {
                    th.animate();
                });
                if (th.controls) {
                    th.controls.update();
                }
                if (this.animated) {
                    th.render();
                }
            },
            doScale(v) {
                let scale = Math.min(100, Math.max(10, v));
                let width = Math.floor(this.$el.offsetWidth * scale / 100);
                let height = this.type == 'mer' ? width / 2 : width;
                this.renderer.setSize(width, height);
            },
            resize(time = 0) {
                let th = this;
                setTimeout(function () {
                    th.camera.aspect = 1;
                    th.camera.updateProjectionMatrix();
                    th.doScale(th.scale);
                }, time);
            },
            download(options = {}) {
                const link = document.createElement('a');
                this.render();
                link.href = this.renderer.domElement.toDataURL();
                link.download = options.filename || 'peta-tinggi-hilal.png';
                link.click();
            }
        },
        watch: {
            scale(v) {
                this.doScale(v);
                this.render();
            },
            type(v) {
                this.mesh.geometry = this.models[v];
                this.doScale(this.scale);
                this.controls.enableRotate = (v == 'globe');
                if (v != 'globe') {
                    this.camera.position.set(0, 0, 4);
                }
                this.render();
            },
        }
    }
</script>