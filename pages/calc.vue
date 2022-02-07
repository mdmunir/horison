<template>
    <lte-content title="Kalkulator">
        <lte-card buttons="collapse">
            <div class="row">
                <div class="col-lg-4 col-sm-12">
                    <form class="form-horizontal">
                        <div class="form-group row">
                            <label for="time" class="col-sm-4 col-form-label">Waktu</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" id="time" v-model="model.time"
                                       placeholder="YYYY-MM-dd HH:mm:ss">
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="offset-sm-4 col-sm-8">
                                <button class="btn btn-sm btn-primary" @click="submit()">Generate</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </lte-card>
        <lte-card >
            <template #tools>
                <a v-if="rawStr" class="btn btn-tool" :href="contentDownload" download="calc.txt">
                    <i class="fas fa-save"></i>
                </a>
            </template>
            <pre>{{rawStr}}</pre>
        </lte-card>
    </lte-content>
</template>

<script>
    import {now, deltaTJD, obliquity, GST, R2D} from '@/libs/horison';
    import eqtime from 'astronomia/src/eqtime';

    export default {
        data() {
            return {
                model: {
                    time: ''
                },
                values: null,
            }
        },
        head: {
            title: 'Kalkulator'
        },
        mounted() {
            this.setModel(this.$route.query);
            this.calcValue();
        },
        watch: {
            '$route.query': function (v) {
                this.setModel(v);
                this.calcValue();
            }
        },
        methods: {
            submit() {
                const query = Object.assign({}, this.$route.query, this.model);
                this.$router.push({query});
            },
            setModel(v) {
                this.model.time = v.time;
            },
            calcValue() {
                let time = this.model.time ? this.model.time.toDate() : new Date;
                let jd = time.toJD();
                let deltaT = deltaTJD(jd);
                let jde = jd + deltaT / 86400;
                const [ε, Δψ, Δε] = obliquity(jde);
                this.values = {
                    jd, time, deltaT,
                    ε: ε * R2D,
                    Δψ:Δψ*R2D*3600,
                    Δε:Δε*R2D*3600,
                    EoT: eqtime.eSmart(jde) / (2 * Math.PI) * 86400000,
                    gst: GST(jd) * R2D,
                };
            },
        },
        computed: {
            rawStr() {
                if (!this.values) {
                    return '';
                }
                const {time, deltaT, jd, ε, EoT, gst, Δψ, Δε} = this.values;
                const _EoT = EoT < 0 ? '-' : '';

                let str = `JD               : ${jd.toFixed(6)}
Time (UT)        : ${moment(time).utc().format('YYYY-MM-DD HH:mm:ss')}
DeltaT           : ${deltaT.toFixed(2)}
Obliquity(ε)     : ${ε.toFixed(5)}°
Nutasi Lon (Δψ)  : ${Δψ.toFixed(6)}"
Nutasi ε(Δε)     : ${Δε.toFixed(6)}"
EoT              : ${_EoT}${moment(Math.abs(EoT)).format('mm:ss.S')}
GST              : ${gst.toFixed(5)}°
`;
                return str;
            },
            contentDownload() {
                return URL.createObjectURL(new Blob([this.rawStr], {
                    type: 'plain/text',
                }));
            },
        },
    }
</script>
