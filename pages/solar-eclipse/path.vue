<template>
    <lte-content :title="'Gerhana Matahari '+(info.date || '')">
        <div v-if="!isValid">
            Gerhana tidak ditemukan.
        </div>
        <div class="row" v-else>
            <div class="col-12 col-md-6">
                <lte-card :title="sTime" buttons="maximize" @resize="$refs.globe.resize(300)">
                    <template #tools>
                        <button class="btn btn-tool" @click="simpan">
                            <i class="fas fa-save"></i>
                        </button>
                    </template>
                    <div class="row">
                        <div class="col-12">
                            <button class="btn btn-sm btn-flat" @click="run">
                                <i class="fas" :class="{'fa-play':!onPlay, 'fa-stop':onPlay}"></i>
                            </button>
                            <input type="range" min="0" max="1000" style="width: 90%;" v-model.number="slider"/>
                        </div>
                        <div class="col-6">
                            <input type="range" min="20" max="100" style="width: 100%;" v-model.number="zoom"/>
                        </div>
                        <div class="col-6">
                            <div class="form-check">
                                <input type="checkbox" class="form-check-input"  v-model="options.rotation" id="ck_rotation">
                                <label class="form-check-label" for="ck_rotation">Rotasi</label>
                            </div>
                        </div>
                    </div>
                    <a-globe ref="globe" :zoom="zoom" :control="!options.rotations"
                             :uniform="uniform" :camera-pos="cameraPos"
                             :vertex-shader="vertexShader" :fragment-shader="fragmentShader"
                             ></a-globe>
                </lte-card>
            </div>
            <div class="col-md-6 col-12">

            </div>
        </div>
        <portal to="modals">
            <lte-modal size="sm" ref="popupSave" data-backdrop="static" 
                       @hide="cancelGif=true" title="Download GIF">
                <p>{{progressSave}}% Complete</p>
                <div class="progress">
                    <div class="progress-bar bg-primary progress-bar-striped" role="progressbar"
                         :aria-valuenow="progressSave" aria-valuemin="0" aria-valuemax="100"
                         :style="{'width': progressSave+'%'}">
                        <span class="sr-only">{{progressSave}}% Complete</span>
                    </div>
                </div>
            </lte-modal>
        </portal>
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
        head: {
            title: 'Gerhana Matahari',
        },
        created() {
            this.eclipse = null;
        },
        data() {
            return {
                info: {type: 0, date: null},
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
                zoom: 100,
                options: {
                    sun: true,
                    moon: true,
                    line: true,
                    rotation: true,
                },
                intervalID: null,
                progressSave: 0,
                cancelGif: false,
            }
        },
        mounted() {
            this.update(this.$route.query.date);
        },
        methods: {
            update(date) {
                this.eclipse = new Eclipse(date);
                var info = this.eclipse.info();
                //Object.assign(this.info, info);
                this.info = info;
            },
            run() {
                if (this.onPlay) {
                    clearInterval(this.intervalID);
                    this.intervalID = null;
                } else {
                    let th = this;
                    this.intervalID = setInterval(function () {
                        th.slider += 1;
                        if (th.slider >= 1000) {
                            clearInterval(th.intervalID);
                            th.intervalID = null;
                        }
                    }, 100);
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

                if (this.options.rotation) {
                    this.cameraPos.lon = bessel.μ;
                    this.cameraPos.lat = bessel.d;
                }
            },
            async simpan() {
                if (!this.isValid) {
                    return;
                }
                var th = this;
                const {p1, p4} = this.info;
                const opts = {
                    duration: 30,
                    fps: 10,
                    filename: `solar-eclipse-${th.info.date}.gif`,
                };
                this.cancelGif = false;
                this.$refs.popupSave.modal('show');
                await this.$refs.globe.download(function (i) {
                    th.slider = 1000 * i;
                    th.progressSave = Math.floor(i * 100);
                    if (th.cancelGif) {
                        return false;
                    }
                }, opts);
                this.$refs.popupSave.modal('hide');
            }
        },
        computed: {
            isValid() {
                return this.info.type > 0;
            },
            time() {
                if (this.isValid) {
                    const {p1, p4} = this.info;
                    return p1 + (p4 - p1) * this.slider / 1000;
                }
            },
            sTime() {
                if (this.isValid) {
                    let jde = this.info.JDE0 + (this.time - this.info.deltaT / 3600) / 24;
                    return moment(jde.toDate()).utc().format('DD MMMM YYYY, hh:mm:ss [UTC]');
                }
            },
            bessel() {
                if (this.isValid) {
                    return this.eclipse.calc(this.time);
                }
            },
            onPlay() {
                return this.intervalID != null;
            }
        },
        watch: {
            'options.rotation': function (v) {
                if (v) {
                    this.updatePath(this.bessel);
                }
            },
            slider() {
                if (this.isValid) {
                    this.updatePath(this.bessel);
                }
            },
            '$route.query.date': function (date) {
                this.update(date);
            },
            'info.date': function () {
                if (this.isValid) {
                    this.slider = (this.slider == 500 ? 501 : 500);
                    this.updatePath(this.bessel);
                }
            }
        }
    }
</script>

