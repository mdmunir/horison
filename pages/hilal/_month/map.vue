<template>    
    <div class="row">
        <div class="col-12">
            <lte-card @resize="$refs.map.resize(300)">
                <template #tools>
                    <button class="btn btn-tool" @click="simpan">
                        <i class="fas fa-save"></i>
                    </button>
                </template>
                <div class="row">
                    <div class="col-12 col-lg-4">
                        <input type="range" min="20" max="100" style="width: 100%;" v-model.number="scale"/>
                    </div>
                    <div class="col-6 col-lg-4">
                        <select class="form-control" v-model="model">
                            <option value="mer">Mercator</option>
                            <option value="globe">Globe</option>
                        </select>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <a-hilal-map :type="model" ref="map" :scale="scale" :uniform="uniform"></a-hilal-map>
                    </div>
                </div>
            </lte-card>
        </div>
        <portal to="modals">
            <lte-modal size="sm" ref="popupSave" data-backdrop="static"
                       @hide="save.cancel=true" title="Download GIF">
                <p>{{save.progress}}% Complete</p>
                <div class="progress">
                    <div class="progress-bar bg-primary progress-bar-striped" role="progressbar"
                         :aria-valuenow="save.progress" aria-valuemin="0" aria-valuemax="100"
                         :style="{'width': save.progress+'%'}">
                        <span class="sr-only">{{save.progress}}% Complete</span>
                    </div>
                </div>
            </lte-modal>
        </portal>
    </div>
</template>
<script>
    const {sin, cos, tan, PI, abs} = Math;

    export default {
        props: {
            hilal: Object,
            year: Number,
            month: Number,
            monthName: String,
        },
        data() {
            return {
                uniform: {
                    eot: {value: 0},
                    hp: {value: 0},
                    altitude: {value: 3},
                    elongation: {value: 6.4},
                    SHa: {value: [0]},
                    SDec: {value: [0]},
                    MHa: {value: [0]},
                    MDec: {value: [0]},
                },
                scale: 100,
                model: 'mer',
                save:{
                    progress:0,
                }
            }
        },
        mounted() {
            this.updateDay(0);
        },
        methods: {
            updateDay(day) {
                var fragment = this.hilal.fragment(day);
                var uniforms2 = this.uniform;
                uniforms2.eot.value = fragment.eot;
                uniforms2.hp.value = fragment.hp;
                uniforms2.SHa.value = fragment.SHa;
                uniforms2.SDec.value = fragment.SDec;
                uniforms2.MHa.value = fragment.MHa;
                uniforms2.MDec.value = fragment.MDec;
            },
            simpan(){
                this.$refs.map.download({filename:`peta-hilal-${this.monthName}.png`});
            }
        },
    }
</script>

<style>
    table.element th{
        margin-left: 5px;
    }
</style>