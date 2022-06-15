<template>
    <lte-content title="Eclipse">
        <div class="row">
            <div class="offset-lg-2 col-lg-8 col-12">
                <div id="container" style="margin-left: 10px"></div>
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
            x: {value: 0.3},
            y: {value: 0.3},
            sind: {value: 0.6},
            cosd: {value: 0.8},
            mu: {value: 0},
            l1: {value: 0.4},
            l2: {value: 0.008},
            tanf1: {value: 0.0047434},
            tanf2: {value: 0.0047198},
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

    function calcRotation(r, lat,lon){
        const [slon, clon] = sincos(toRad(lon));
        const [slat, clat] = sincos(toRad(lat));
        return [
            r * clat * clon,
            r * slat,
            r * clat * slon,
        ]
    }

    function rotate(dT){
        let {x,y,z} = camera.position;
        let r = Math.hypot(x,y,z);
        let lat = Math.asin(y/r);
        let lon = Math.atan2(z,x);
        
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

    export default {
        mounted() {
            init();
            animate();
            //setInterval(rotate, 500);
        }
    }
</script>
