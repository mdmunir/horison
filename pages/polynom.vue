<template>
    <lte-content title="Generate Polynomial">
        <lte-card buttons="collapse">
            <form class="form-horizontal">
                <div class="row">
                    <div class="col-lg-6 col-sm-12">
                        <div class="form-group row">
                            <label for="body" class="col-sm-4 col-form-label">Objek</label>
                            <div class="col-sm-8">
                                <select id="body" class="form-control" v-model="model.body">
                                    <option value="sun">Matahari</option>
                                    <option value="moon">Bulan</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="unit" class="col-sm-4 col-form-label">Satuan</label>
                            <div class="col-sm-8">
                                <select id="unit" class="form-control" v-model="model.unit">
                                    <option value="deg">Derajat</option>
                                    <option value="rad">Radian</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="orde" class="col-sm-4 col-form-label">Orde Polinomial</label>
                            <div class="col-sm-8">
                                <select class="form-control" v-model='model.orde'>
                                    <option  v-for="n in 8" :value="n+1">{{n+1}}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 col-sm-12">
                        <div class="form-group row">
                            <label for="T0" class="col-sm-4 col-form-label">T0</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" id="T0" v-model="model.T0"
                                       placeholder="YYYY-MM-dd HH:mm:ss">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="dari" class="col-sm-4 col-form-label">Dari</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" id="dari" v-model="model.from"
                                       placeholder="YYYY-MM-dd HH:mm:ss">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="sampai" class="col-sm-4 col-form-label">Sampai</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" id="sampai" v-model="model.to"
                                       placeholder="YYYY-MM-dd HH:mm:ss">
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <template #footer>
                <div class="form-group row">
                    <button class="btn btn-sm btn-primary" @click="submit()">Generate</button>
                </div>
            </template>
        </lte-card>

        <lte-card title="Result">
            <template #tools>
                <a v-if="valid" class="btn btn-tool" :href="contentDownload" :download="'polynomial-'+names[model.body]+'.txt'">
                    <i class="fas fa-save"></i>
                </a>
            </template>
            <pre>{{output}}</pre>
        </lte-card>
    </lte-content>
</template>

<script>
    import {R2D, Globe} from '@/libs/horison';
    import {Solar, Moon} from '@/libs/position';
    import base from 'astronomia/src/base';

    const BODIES = {sun: new Solar(), moon: new Moon()};
    const PARTS = [
        ['L', 'Lon (unit)', 'lon'],
        ['B', 'Lat (unit)', 'lat'],
        ['R', 'Range (KM)', 'range'],
        ['Ra', 'Ra (unit)', 'ra'],
        ['Dec', 'Dec (unit)', 'dec'],
        ['GHA', 'GHA (unit)', 'gha'],
    ];
    const UNITS = {
        deg: 'Derajat',
        rad: 'Radian',
    }

    export default {
        head: {
            title: 'Generate Polynomial',
        },
        data() {
            return {
                model: {
                    body: 'sun',
                    unit: 'deg',
                    orde: 2,
                    T0: '',
                    from: '',
                    to: '',
                },
                times: {},
                output: '',
                valid: false,
                names: {
                    sun: 'matahari',
                    moon: 'bulan'
                }
            }
        },
        watch: {
            '$route.query': function (v) {
                this.setModel(v);
                this.calcPolynom();
            }
        },
        mounted() {
            this.setModel(this.$route.query);
            this.calcPolynom();
        },
        methods: {
            submit() {
                const query = Object.assign({}, this.$route.query, this.model);
                this.$router.push({query});
            },
            setModel(v) {
                Object.assign(this.model, {
                    body: 'sun',
                    T0: moment().format('YYYY-MM-DD [00:00:00]'),
                    from: moment().format('YYYY-MM-DD [00:00:00]'),
                    to: moment().format('YYYY-MM-DD [23:59:59]'),
                    unit: 'deg',
                    orde: 2,
                }, v);
            },
            calcPolynom() {
                this.valid = false;
                const body = BODIES[this.model.body];
                if (!body) {
                    this.output = 'Err: Object tidak diketahui.';
                    return;
                }
                let T0 = (this.model.from || moment().format('YYYY-MM-DD [00:00:00]')).toDate();
                let begin = (this.model.from || moment().format('YYYY-MM-DD [00:00:00]')).toDate();
                let end = (this.model.to || moment().format('YYYY-MM-DD [23:59:59.99]')).toDate();
                if (T0 && begin && end) {
                    let jT0 = T0.toJD(), jBegin = begin.toJD(), jEnd = end.toJD();
                    if (jBegin >= jEnd) {
                        this.output = 'Err: Waktu "sampai" harus lebih besar waktu "dari".';
                        return;
                    }
                    let range = jEnd - jBegin;
                    if (this.model.body == 'sun' && range > 366) {
                        this.output = 'Err: Range tanggal tidak boleh > 366 hari.';
                        return;
                    } else if (this.model.body == 'moon' && range > 30) {
                        this.output = 'Err: Range tanggal tidak boleh > 30 hari.';
                        return;
                    }

                    let orde = parseInt(this.model.orde);
                    let orders = [...Array(orde + 1).keys()];
                    let suku = orders.slice(2).map(v => `a${v}*t^${v}`).join(' + ')
                    const polynom = body.polynom(jT0, jBegin - jT0, jEnd - jT0, orde);
                    const POLYNOM = polynom.POLYNOM;
                    const errors = polynom.err();


                    let str = `Data           : Polinomial posisi ${this.names[this.model.body]}
T0             : JD ${jT0.toFixed(6).padStart(15, ' ')} = ${moment(T0).utc().format('YYYY-MM-DD HH:mm:ss')} UT
Valid dari     : JD ${jBegin.toFixed(6).padStart(15, ' ')} = ${moment(begin).utc().format('YYYY-MM-DD HH:mm:ss')} UT
Valid sampai   : JD ${jEnd.toFixed(6).padStart(15, ' ')} = ${moment(end).utc().format('YYYY-MM-DD HH:mm:ss')} UT

    *  t = JD - T0
    *  Posisi(JD) = X(t) = a0 + a1*t + ${suku}

***************************************${'*'.padStart(orde * 20, '*')}
     X(t) \\ a      ${orders.map(v => v.toString().padMidle(20, ' ')).join('')}
***************************************${'*'.padStart(orde * 20, '*')}
`;
                    let satuan = UNITS[this.model.unit];
                    let faktor = this.model.unit == 'deg' ? 180 / Math.PI : 1;
                    PARTS.forEach(part => {
                        let [key, label] = part;
                        label = label.replace('(unit)', '(' + satuan + ')').padEnd(15, ' ');
                        str += label + POLYNOM[key].map(v => {
                            if (key != 'R') {
                                v *= faktor;
                            }
                            return v.toScientific(10, 6).padStart(20, ' ');
                        }).join('') + '\n';
                    });
                    str += '*'.padStart(orde * 20+39, '*');
                    str += '\nError:';
                    PARTS.forEach(part => {
                        let [, label, key] = part;
                        label = label.replace('(unit)', '(")').padEnd(15, ' ');
                        str += '\n' + label;
                        let v = errors[key];
                        if (key != 'range') {
                            v *= (180 / Math.PI * 3600);
                        }
                        str += v.toFixed(8).padStart(20, ' ');
                    });
                    this.output = str;
                    this.valid = true;
                } else {
                    this.output = 'Err: Input waktu tidak valid.';
                    return;
                }
            },
        },
        computed: {
            contentDownload() {
                return URL.createObjectURL(new Blob([this.output], {
                    type: 'plain/text',
                }));
            },
        }
    }
</script>