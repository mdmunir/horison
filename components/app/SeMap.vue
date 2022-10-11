<template>
    <div style="display: flex;justify-content: center;"></div>
</template>
<script>
    import * as THREE from 'three';
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
    import {sincos} from 'astronomia/src/base';
    import {generateGIF} from '@/libs/gif-generator';
    import vertexShader from '!raw-loader!./webgl/vertex.c';
    import fragmentShader from '!raw-loader!./webgl/se-fragment.c';

    export default{
        props: {
            type: {
                type: String,
                default: 'globe',
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
            cameraPos: Object,
            scale: {
                type: Number,
                default: 100,
            },
            control: {
                type: Boolean,
                default: true,
            }
        },
        data() {
            var padding = 0.05;
            const models = {
                globe: new THREE.SphereGeometry(1, 128, 64),
                mer: new THREE.PlaneGeometry(2, 2),
                ae: new THREE.CircleGeometry(1, 64),
            };
            this.uniform.txtr = {value: new THREE.TextureLoader().load(this.texture)};
            this.uniform.isAe = {value: this.type == 'ae' ? 1 : 0};
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
            controls.enableZoom = false;
            controls.enablePan = false;
            controls.staticMoving = true;
            controls.dynamicDampingFactor = 0.3;
            controls.keys = [65, 83, 68];
            controls.autoRotate = false;
            controls.addEventListener('change', function () {
                th.render();
            });
            controls.enableRotate = this.control && this.type == 'globe';
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
            async download(callback, options = {}) {
                var th = this;
                this.animated = false;
                var buffer = await generateGIF(this.renderer.domElement, function (progress) {
                    if (callback) {
                        if (callback(progress) === false) {
                            return false;
                        }
                    }
                    th.render();
                }, options);
                const blob = new Blob([buffer], {type: 'image/gif'});
                this.animated = true;

                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = options.filename || 'solar-eclipse.gif';
                link.dispatchEvent(new MouseEvent('click'));
            }
        },
        watch: {
            cameraPos: {
                deep: true,
                handler(value) {
                    if (this.type != 'globe') {
                        return;
                    }
                    let v = value || {};
                    const [slon, clon] = sincos(v.lon || 0);
                    const [slat, clat] = sincos(v.lat || 0);
                    const r = v.distance || 4;
                    this.camera.position.set(r * clat * clon, r * slat, r * clat * slon);
                    if (this.controls) {
                        this.controls.update();
                    }
                    this.render();
                }
            },
            scale(v) {
                this.doScale(v);
                this.render();
            },
            type(v) {
                this.mesh.geometry = this.models[v];
                this.uniform.isAe.value = (v == 'ae' ? 1 : 0);
                this.doScale(this.scale);
                this.controls.enableRotate = this.control && v == 'globe';
                if (v != 'globe') {
                    this.camera.position.set(0, 0, 4);
                }
                this.render();
            },
            control(v) {
                this.controls.enableRotate = (v && this.type == 'globe');
                this.render();
            }
        }
    }
</script>