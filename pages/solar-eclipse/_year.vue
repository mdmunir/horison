<template>
    <lte-content title="Eclipse">
        <div class="row">
            <div class="col-12">
                <lte-card :title="sTime">
                    <template #tools>
                        <button class="btn btn-tool" @click="zoom = (zoom<100)?zoom+1:100">
                            <i class="fa fa-search-plus"></i>
                        </button>
                        <button class="btn btn-tool" @click="zoom = (zoom>10)?zoom-1:10">
                            <i class="fa fa-search-minus"></i>
                        </button>
                        <button class="btn btn-tool" @click="simpan">
                            <i class="fas fa-save"></i>
                        </button>
                    </template>
                    <input type="range" min="0" max="1000" style="width: 100%;" v-model="slider"
                           @input="sliderChange(false)"/>

                    <a-globe ref="globe" :zoom="zoom"
                             :uniform="uniform" :camera-pos="cameraPos"
                             :vertex-shader="vertexShader" :fragment-shader="fragmentShader"
                             ></a-globe>
                </lte-card>
            </div>
            <div class="col-md-6 col-12">

            </div>
        </div>
    </lte-content>
</template>
<script>
    import * as THREE from 'three';
    import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';
    import vertexShader from '!raw-loader!./webgl/vertex.c';
    import fragmentShader from '!raw-loader!./webgl/fragment.c';
    //import {sincos, toRad} from 'astronomia/src/base';
    import {Eclipse} from '@/libs/solar-eclipse';

    const {sin, cos, tan, PI} = Math;
    const ESQ = 0.006694381;

    export default {
        data() {
            let y = this.$route.params.year;
            var eclipse = new Eclipse(y);
            var info = eclipse.info();

            return {
                eclipse: eclipse,
                info: info,
                uniform: {
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
                },
                vertexShader: vertexShader,
                fragmentShader: fragmentShader,
                slider: 500,
                cameraPos: {
                    lat: 0,
                    lon: 0,
                    distance: 4,
                },
                t: 0,
                zoom: 100,
                animated: true,
            }
        },
        mounted() {
            this.sliderChange();
        },
        methods: {
            sliderChange(camera = false) {
                if (this.info.type == 0 || !this.animated) {
                    return;
                }
                this.t = this.info.p1 + (this.info.p4 - this.info.p1) * this.slider * 0.001;
                const bessel = this.eclipse.calc(this.t);

                this.updatePath(bessel);
                if (camera) {
                    this.updateCamera(bessel);
            }
            },
            updatePath(bessel) {
                var uniforms2 = this.uniform;
                uniforms2.x.value = bessel.x;
                uniforms2.y.value = bessel.y;
                uniforms2.mu.value = bessel.μ - this.info.deltaT * 1.00273790935 * (2 * PI / 24 / 3600);
                uniforms2.sind.value = sin(bessel.d);
                uniforms2.cosd.value = cos(bessel.d);
                uniforms2.l1.value = bessel.l1;
                uniforms2.l2.value = bessel.l2;
                uniforms2.tanf1.value = bessel.tanF1;
                uniforms2.tanf2.value = bessel.tanF2;
            },
            updateCamera(bessel) {
                this.cameraPos.lon = bessel.μ;
                this.cameraPos.lat = bessel.d;
            },
            async simpan() {
                if (this.info.type == 0) {
                    return;
                }
                this.animated = false;
                var th = this;
                const {p1, p4} = this.info;
                await this.$refs.globe.download(function (i) {
                    var t = p1 + (p4 - p1) * i;
                    const bessel = th.eclipse.calc(t);

                    th.updatePath(bessel);
                    th.updateCamera(bessel);
                }, 15, 15);
                this.animated = true;
            }
        },
        computed: {
            sTime() {
                if (this.info.type > 0) {
                    let jde = this.info.JDE0 + this.t / 24;
                    return moment(jde.toDate()).utc().format('DD MMMM YYYY, hh:mm:ss [UTC]');
                }
            }
        }
    }
</script>

