<template>
    <div class="row">
        <div class="col-12">
            <lte-card :title="sTime" @resize="$refs.map.resize(300)">
                <template #tools>
                    <button class="btn btn-tool" @click="simpan">
                        <i class="fas fa-save"></i>
                    </button>
                </template>
                <div class="row">
                    <div class="col-12">
                        <button class="btn btn-sm btn-flat" @click="run">
                            <i class="fas" :class="{ 'fa-play': !onPlay, 'fa-stop': onPlay }"></i>
                        </button>
                        <input type="range" min="0" max="1000" style="width: 90%;" v-model.number="slider" />
                    </div>
                    <div class="col-12 col-lg-6">
                        <input type="range" min="20" max="100" style="width: 100%;" v-model.number="scale" />
                    </div>
                    <div class="col-4 col-lg-2">
                        <select class="form-control" v-model="options.model">
                            <option value="globe">Globe</option>
                            <option value="mer">Mercator</option>
                            <option value="ae">AE</option>
                        </select>
                    </div>
                    <div class="col-4 col-lg-2" v-if="options.model == 'globe'">
                        <div class="form-check">
                            <input type="checkbox" class="form-check-input" v-model="options.rotation" id="ck_rotation">
                            <label class="form-check-label" for="ck_rotation">Rotasi</label>
                        </div>
                    </div>
                    <div class="col-4 col-lg-2" >
                        <select class="form-control" v-model="options.part">
                            <option value="all">Path&Shadow</option>
                            <option value="shadow">Shadow</option>
                            <option value="path">Path</option>
                        </select>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <a-se-map :type="options.model" ref="map" :scale="scale" :control="!options.rotation"
                            :uniform="uniform" :camera-pos="cameraPos" :part="options.part"></a-se-map>
                    </div>
                </div>
            </lte-card>
        </div>
        <portal to="modals">
            <lte-modal size="sm" ref="popupSave" data-backdrop="static" @hide="save.cancel = true" title="Download GIF">
                <p>{{ save.progress }}% Complete</p>
                <div class="progress">
                    <div class="progress-bar bg-primary progress-bar-striped" role="progressbar"
                        :aria-valuenow="save.progress" aria-valuemin="0" aria-valuemax="100"
                        :style="{ 'width': save.progress + '%' }">
                        <span class="sr-only">{{ save.progress }}% Complete</span>
                    </div>
                </div>
            </lte-modal>
        </portal>
    </div>
</template>
<script>
const { sin, cos, tan, PI, abs } = Math;
const ESQ = 0.006694381;
import base, { horner, pmod } from 'astronomia/src/base';


export default {
    props: {
        eclipse: Object,
        info: {
            type: Object,
            default() {
                return { type: 0, date: null };
            }
        },
    },
    data() {
        var info = this.info;
        var deltaTMu = this.info.deltaT * 1.00273790935 * (2 * PI / 24 / 3600);
        return {
            deltaTMu,
            uniform: {
                time:{value: 0},
                tanF1: { value: info.tanF1 },
                tanF2: { value: info.tanF2 },
                deltaTMu: {value: deltaTMu},
                X: { value: info.x.slice(0,4) },
                Y: { value: info.y.slice(0,4) },
                D: { value: info.d.slice(0,4) },
                MU: { value: info.μ.slice(0,4) },
                L1: { value: info.l1.slice(0,4) },
                L2: { value: info.l2.slice(0,4) },
                DX:{value: info.x.slice(1,5).map((v,i) => v*(i+1))},
                DY:{value: info.y.slice(1,5).map((v,i) => v*(i+1))},
                DD:{value: info.d.slice(1,5).map((v,i) => v*(i+1))},
                DMU:{value: info.μ.slice(1,5).map((v,i) => v*(i+1))},
            },
            slider: 500,
            cameraPos: {
                lat: 0,
                lon: 0,
                distance: 4,
            },
            scale: 100,
            options: {
                model: 'globe',
                rotation: true,
                part: 'all',
            },
            save: {
                progress: 0,
                cancel: false,
            },
            intervalID: null,
        }
    },
    mounted() {
        this.updatePath(this.time);
    },
    methods: {
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
        updatePath(time) {
            var uniforms2 = this.uniform;
            uniforms2.time.value = time;

            if (this.options.rotation) {
                this.cameraPos.lon = this.cameraLon;
                this.cameraPos.lat = this.cameraLat;
            }
        },
        async simpan() {
            var th = this;
            const { p1, p4 } = this.info;
            const opts = {
                duration: 30,
                fps: 10,
                filename: `solar-eclipse-${th.info.date}.gif`,
            };
            this.save.cancel = false;
            this.$refs.popupSave.modal('show');
            await this.$refs.map.download(function (i) {
                th.slider = 1000 * i;
                th.save.progress = Math.floor(i * 100);
                if (th.save.cancel) {
                    return false;
                }
            }, opts);
            this.$refs.popupSave.modal('hide');
        }
    },
    computed: {
        time() {
            const { p1, p4 } = this.info;
            return p1 + (p4 - p1) * this.slider / 1000;
        },
        sTime() {
            let jde = this.info.JDE0 + (this.time - this.info.deltaT / 3600) / 24;
            return moment(jde.toDate()).utc().format('DD MMMM YYYY, hh:mm:ss [UTC]');
        },
        cameraLon(){
            var result = horner(this.time, this.info.μ);
            return pmod(result, 2 * PI);
        },
        cameraLat(){
            return horner(this.time, this.info.d);
        },
        onPlay() {
            return this.intervalID != null;
        },
    },
    watch: {
        'options.rotation': function (v) {
            if (v) {
                this.cameraPos.lon = this.cameraLon;
                this.cameraPos.lat = this.cameraLat;
            }
        },
        slider() {
            this.updatePath(this.time);
        },
    }
}
</script>

<style>
table.element th {
    margin-left: 5px;
}
</style>