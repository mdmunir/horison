<template>
    <lte-content title="Eclipse">
        <div class="row">
            <div class="col-lg-8 col-12">
                <input type="range" min="0" max="1000" style="width: 100%;" v-model="slider" @change="sliderChange"/>

                <div id="container" style="margin-left: 10px"></div>
            </div>
            <div class="col-lg-8 col-12">
                <div>t= {{t}}; slider= {{slider}}</div>
                <pre>{{info}}</pre>
            </div>
        </div>
    </lte-content>
</template>
<script>
    import * as THREE from 'three';
    import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';
    import vertexShader from '!raw-loader!./webgl/vertex.c';
    import fragmentShader from '!raw-loader!./webgl/fragment.c';
    import {sincos, toRad} from 'astronomia/src/base';
    import {Eclipse} from '@/libs/solar-eclipse';

    const {sin, cos, tan, PI} = Math;

    const ESQ = 0.006694381;
    var container;
    var camera, scene, renderer;
    var controls = null;
    var uniforms2;
    let time = null;

    function init() {
        container = document.getElementById('container');
        var padding = 0.05;
        camera = new THREE.OrthographicCamera(-1 - padding, 1 + padding, 1 + padding, -1 - padding, 0.1, 10);
        let r = 4;
        const rot = calcRotation(r, -6, -112);
        camera.position.set(...rot);
        scene = new THREE.Scene();
        var sphere = new THREE.SphereGeometry(1, 128, 64);

        uniforms2 = {
            esq: {value: ESQ},
            x: {value: 0},
            y: {value: 0},
            sind: {value: 0},
            cosd: {value: 0},
            mu: {value: 0},
            l1: {value: 0},
            l2: {value: 0},
            tanf1: {value: 0},
            tanf2: {value: 0},
            txtr: {value: new THREE.TextureLoader().load('images/earth_1600.jpg')}
        };
        uniforms2.txtr.value.wrapS = uniforms2.txtr.value.wrapT = THREE.RepeatWrapping;

        var material = new THREE.ShaderMaterial({
            uniforms: uniforms2,
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
        });
        var mesh = new THREE.Mesh(sphere, material);
        mesh.position.x = 0;
        mesh.position.y = 0;
        scene.add(mesh);

        renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);
        onWindowResize();

        // initialise trackball
        controls = new TrackballControls(camera, container);
        controls.rotateSpeed = 1.0;
        controls.zoomSpeed = 1.2;
        controls.panSpeed = 0.8;
        controls.noZoom = true;
        controls.noPan = true;
        controls.staticMoving = true;
        controls.dynamicDampingFactor = 0.3;
        controls.keys = [65, 83, 68];
        controls.addEventListener('change', render);

        //window.addEventListener('resize', onWindowResize);

        //time = ecl.tMax;
        onTimeChanged();
    }

    function calcRotation(r, lat, lon) {
        const [slon, clon] = sincos(toRad(lon));
        const [slat, clat] = sincos(toRad(lat));
        return [
            r * clat * clon,
            r * slat,
            r * clat * slon,
        ]
    }

    function rotate(dT) {
        let {x, y, z} = camera.position;
        let r = Math.hypot(x, y, z);
        let lat = Math.asin(y / r);
        let lon = Math.atan2(z, x);

//        camera.position.x += 0.2;
//        if(camera.position.x >= Math.PI*2){
//            //camera.position.x = 0;
//        }
//        mesh.rotation.y += 0.1;
//        render();
    }

    function onTimeChanged() {

    }
    function onWindowResize(event) {
        camera.aspect = 1;
        camera.updateProjectionMatrix();
        let width = container.offsetWidth - 20;
        renderer.setSize(width, width);

        if (controls) {
            controls.handleResize();
        }
    }
    //
    function animate() {
        requestAnimationFrame(animate);
        if (controls) {
            controls.update();
        }
        render();
    }
    function render() {
        renderer.render(scene, camera);
    }

    let eclipse;
    export default {
        data() {
            return {
                info: {},
                slider: 500,
                t: 0,
            }
        },
        mounted() {
            let y = this.$route.params.year;
            eclipse = new Eclipse(y);

            this.info = eclipse.info();

            init();
            animate();

            this.sliderChange();
        },
        methods: {
            sliderChange() {
                if(!eclipse){
                    return;
                }
                this.t = this.info.p1 + (this.info.p4 - this.info.p1) * this.slider * 0.001;

                const bessel = eclipse.calc(this.t);

                uniforms2.x.value = bessel.x;
                uniforms2.y.value = bessel.y;
                uniforms2.mu.value = bessel.μ - this.info.deltaT * 1.00273790935 * (2 * PI / 24 / 3600);
                uniforms2.sind.value = Math.sin(bessel.d);
                uniforms2.cosd.value = Math.cos(bessel.d);
                uniforms2.l1.value = bessel.l1;
                uniforms2.l2.value = bessel.l2;
                uniforms2.tanf1.value = bessel.tanF1;
                uniforms2.tanf2.value = bessel.tanF2;
            }
        }
    }
</script>

