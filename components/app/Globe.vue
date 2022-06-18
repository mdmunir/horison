<template>
    <div style="display: flex;justify-content: center;"></div>
</template>
<script>
    import * as THREE from 'three';
    //import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
    import {sincos} from 'astronomia/src/base';
    import {generateGIF} from '@/libs/gif-generator';

    export default{
        props: {
            texture: {
                type: [String, Object],
                default: 'images/earth_1600.jpg',
            },
            fragmentShader: String,
            vertexShader: String,
            uniform: {
                type: Object,
                default() {
                    return {};
                },
            },
            cameraPos: Object,
            zoom: {
                type: Number,
                default: 100,
            },
        },
        created() {
            var padding = 0.05;
            this.camera = new THREE.OrthographicCamera(-1 - padding, 1 + padding, 1 + padding, -1 - padding, 0.1, 10);
            this.camera.position.set(0, 0, 4);
            this.controls = null;
            this.scene = new THREE.Scene();
            this.sphere = new THREE.SphereGeometry(1, 128, 64);
            var renderer = new THREE.WebGLRenderer();
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setPixelRatio(window.devicePixelRatio);
            this.renderer = renderer;

            this.animated = true;
        },
        mounted() {
            var th = this;
            this.uniform.txtr = {value: new THREE.TextureLoader().load(this.texture)};

            var material = new THREE.ShaderMaterial({
                uniforms: this.uniform,
                vertexShader: this.vertexShader,
                fragmentShader: this.fragmentShader,
            });
            var mesh = new THREE.Mesh(this.sphere, material);
            mesh.position.x = 0;
            mesh.position.y = 0;
            this.scene.add(mesh);

            this.$el.appendChild(this.renderer.domElement);

            // initialise trackball
            var controls = this.controls = new OrbitControls(this.camera, this.$el);
            controls.rotateSpeed = 1.0;
            controls.zoomSpeed = 1.2;
            controls.panSpeed = 0.8;
            controls.noZoom = true;
            controls.enableZoom = false;
            controls.enablePan = false;
            controls.noPan = true;
            controls.staticMoving = true;
            controls.dynamicDampingFactor = 0.3;
            controls.keys = [65, 83, 68];
            controls.addEventListener('change', function () {
                th.render();
            });

            window.addEventListener('resize', function () {
                th.onWindowResize();
            });

            this.animate();
            th.onWindowResize();
            $('[data-widget="pushmenu"]').on('collapsed.lte.pushmenu shown.lte.pushmenu', function () {
                setTimeout(function () {
                    th.onWindowResize();
                }, 300);
            });
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
            onWindowResize() {
                this.camera.aspect = 1;
                this.camera.updateProjectionMatrix();
                let zoom = Math.min(100, Math.max(10, this.zoom));
                let width = Math.floor(this.$el.offsetWidth * zoom / 100);
                this.renderer.setSize(width, width);

                if (this.controls) {
                    //this.controls.handleResize();
                }
            },
            async download(callback, duration = 10, fps = 30) {
                var th = this;
                this.animated = false;
                var buffer = await generateGIF(this.renderer.domElement, function (progress) {
                    if (callback) {
                        callback(progress);
                    }
                    th.render();
                }, duration, fps, 25);
                const blob = new Blob([buffer], {type: 'image/gif'});
                this.animated = true;

                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = 'animation.gif';
                link.dispatchEvent(new MouseEvent('click'));
            }
        },
        watch: {
            cameraPos: {
                deep: true,
                handler(value) {
                    let v = value || {};
                    const [slon, clon] = sincos(v.lon || 0);
                    const [slat, clat] = sincos(v.lat || 0);
                    const r = v.distance || 4;
                    this.camera.position.set(r * clat * clon, r * slat, r * clat * slon);
                }
            },
            zoom(v) {
                let zoom = Math.min(100, Math.max(10, v));
                let width = Math.floor(this.$el.offsetWidth * zoom / 100);
                this.renderer.setSize(width, width);
            }
        }
    }
</script>