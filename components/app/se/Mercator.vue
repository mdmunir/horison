<template>
    <div style="display: flex;justify-content: center;"></div>
</template>
<script>
    import * as THREE from 'three';
    import {sincos} from 'astronomia/src/base';
    import {generateGIF} from '@/libs/gif-generator';
    import vertexShader from '!raw-loader!./webgl/vertex.c';
    import fragmentShader from '!raw-loader!./webgl/fragment.c';

    export default{
        props: {
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
            zoom: {
                type: Number,
                default: 100,
            },
            control: {
                type: Boolean,
                default: true,
            }
        },
        created() {
            var padding = 0.05;
            this.camera = new THREE.OrthographicCamera(-1 - padding, 1 + padding, 1 + padding, -1 - padding, 0.1, 10);
            this.camera.position.set(0, 0, 4);
            this.controls = null;
            this.scene = new THREE.Scene();
            this.plane = new THREE.PlaneGeometry(2, 2);
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
                vertexShader: vertexShader,
                fragmentShader: fragmentShader,
            });
            var mesh = new THREE.Mesh(this.plane, material);
            mesh.position.x = 0;
            mesh.position.y = 0;
            this.scene.add(mesh);

            this.$el.appendChild(this.renderer.domElement);

            window.addEventListener('resize', function () {
                th.resize();
            });

            this.animate();
            th.resize();
            this.$nuxt.$on('pushmenu-click', function () {
                th.resize(300);
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
                if (this.animated) {
                    th.render();
                }
            },
            resize(time = 0) {
                let th = this;
                setTimeout(function () {
                    th.camera.aspect = 1;
                    th.camera.updateProjectionMatrix();
                    let zoom = Math.min(100, Math.max(10, th.zoom));
                    let width = Math.floor(th.$el.offsetWidth * zoom / 100);
                    th.renderer.setSize(width, width / 2);

                    if (th.controls) {
                        //this.controls.handleResize();
                    }
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
            zoom(v) {
                let zoom = Math.min(100, Math.max(10, v));
                let width = Math.floor(this.$el.offsetWidth * zoom / 100);
                this.renderer.setSize(width, width / 2);
            },
        }
    }
</script>