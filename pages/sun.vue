<template>
    <lte-content title="Posisi Matahari">
        <lte-card buttons="collapse">
            <div class="row">
                <div class="col-lg-4 col-sm-12">
                    <lte-card>
                        <form class="form-horizontal">
                            <div class="form-group row">
                                <label for="latitude" class="col-sm-4 col-form-label">Latitude</label>
                                <div class="col-sm-8">
                                    <input type="number" class="form-control" id="latitude" v-model.number="model.lat"
                                           placeholder="Latitude">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="longitude" class="col-sm-4 col-form-label">Longitude</label>
                                <div class="col-sm-8">
                                    <input type="number" class="form-control" id="longitude" v-model.number="model.lon"
                                           placeholder="Longitude">
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
                            <div class="form-group row">
                                <label for="interval" class="col-sm-4 col-form-label">Interval</label>
                                <div class="col-sm-8">
                                    <div class="input-group">
                                        <input type="number" class="form-control" id="interval" v-model.number="model.interval">
                                        <select class="form-control" v-model='model.unit'>
                                            <option  v-for="(v,k) in units"  :value="k">{{v.label}}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="offset-sm-4 col-sm-8">
                                    <button class="btn btn-sm btn-primary" @click="submit()">Generate</button>
                                </div>
                            </div>
                        </form>
                    </lte-card>
                </div>
                <div class="col-lg-8 col-sm-12">
                    <lte-card>
                        <form class="form-horizontal">
                            <div class="row">
                                <div class="col-lg-4">
                                    <div class="form-group row">
                                        <label for="sudut" class="col-sm-6 col-form-label">Format Sudut</label>
                                        <div class="col-sm-6">
                                            <select class="form-control" id="latitude" v-model="format.sudut">
                                                <option value="decimal">Desimal</option>
                                                <option value="dms">Dms</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-4" v-for="cols in columnsChunk">
                                    <div class="form-check" v-for="col in cols">
                                        <input type="checkbox" class="form-check-input" :id="'ck_'+col.key"  v-model="col.value">
                                        <label class="form-check-label" :for="'ck_'+col.key">{{col.label}}</label>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </lte-card>
                </div>
            </div>
        </lte-card>

        <lte-card title="Result">
            <template #tools>
                <a v-if="rows.length" class="btn btn-tool" :href="contentDownload" download="posisi-matahari.txt">
                    <i class="fas fa-save"></i>
                </a>
            </template>
            <pre>{{rowsStr}}</pre>
        </lte-card>
    </lte-content>
</template>

<script>
    import {sunList, strToJD, R2D, toGlobe, locToStr, filterObj, formatAngle} from '@/libs/horison';
    import base from 'astronomia/src/base';
    import julian from 'astronomia/src/julian';

    const CHUNK = 2;
    const units = {
        s: {label: 'Detik', value: 1},
        m: {label: 'Menit', value: 60},
        h: {label: 'Jam', value: 3600},
        d: {label: 'Hari', value: 24 * 3600},
    }
    const columns = [
        {key: 'jd', label: 'Julian Day', value: true, c: 'Julian Day'},
        {key: 'lon', label: 'Longitude(°)', value: true, c: 'Lon(°)'},
        {key: 'lat', label: 'Latitude(")', value: true, c: 'Lat(")'},
        {key: 'ra', label: 'RA(°)', value: true, c: 'RA(°)'},
        {key: 'dec', label: 'Dec(°)', value: true, c: 'Dec(°)'},
        {key: 'alt', label: 'Altitude(+ref °)', value: true, c: 'Alt(°)'},
        {key: 'az', label: 'Azimut(selatan °)', value: true, c: 'Az(°)'},
        {key: 'range', label: 'Jarak(KM)', value: true, c: 'Jarak(KM)'},
        {key: 'sd', label: 'Semi Diameter(\')', value: true, c: 'SD(\')'},
        {key: 'deltaT', label: 'Delta T(detik)', value: true, c: 'deltaT'},
        {key: 'gst', label: 'GST(°)', value: true, c: 'GST(°)'},
        {key: 'ε', label: 'Obliquity ε(°)', value: true, c: 'ε(°)'},
    ];

    function padStr(v, l) {
        let n = (l + v.length) / 2;
        let r = v.padStart(n, ' ');
        return r.padEnd(l, ' ');
    }

    export default {
        head: {
            title: 'Posisi Matahari',
        },
        data() {
            return {
                model: {
                    lat: '',
                    lon: '',
                    from: '',
                    to: '',
                    unit: 'h',
                    interval: 1,
                },
                format: {
                    sudut: 'decimal',
                },
                loc: {},
                units: units,
                columns,
                rows: []
            }
        },
        watch: {
            '$route.query': function (v) {
                this.setModel(v);
                this.calcList();
            }
        },
        mounted() {
            this.setModel(this.$route.query);
            this.calcList();
        },
        methods: {
            submit() {
                const query = filterObj(Object.assign({}, this.$route.query, this.model));
                this.$router.push({query});
            },
            setModel(v) {
                Object.assign(this.model, {
                    lat: this.$store.state.location.lat,
                    lon: this.$store.state.location.lon,
                    from: moment().format('YYYY-MM-DD [00:00:00]'),
                    to: moment().format('YYYY-MM-DD [23:59:59]'),
                    unit: 'h',
                    interval: 1,
                }, filterObj(v));
            },
            calcList() {
                this.loc = {lat: this.model.lat, lon: this.model.lon};
                let jd1 = strToJD(this.model.from || moment().format('YYYY-MM-DD [00:00:00]'));
                let jd2 = strToJD(this.model.to || moment().format('YYYY-MM-DD [23:59:59.999]'));
                if (jd1 && jd2) {
                    let step = this.model.interval * units[this.model.unit].value / (24 * 3600);
                    this.rows = sunList(jd1, jd2, step, toGlobe(this.loc)).map(v => {
                        v.date = julian.JDToDate(v.jd);
                        v.lon *= R2D;
                        v.lat *= R2D * 3600;
                        v.ra *= R2D;
                        v.dec *= R2D;
                        v.alt *= R2D;
                        v.az *= R2D;
                        v.ε *= R2D;
                        v.az = base.pmod(v.az, 360);
                        v.sd *= R2D * 3600000;
                        return v;
                    });
                } else {
                    this.rows = [];
                }
            },
        },
        computed: {
            columnsChunk() {
                let n = Math.ceil(columns.length / CHUNK);
                let r = [];
                for (var i = 0; i < CHUNK; i++) {
                    r.push(this.columns.slice(i * n, i * n + n));
                }
                return r;
            },
            rowsStr() {
                let l = [
                    '      Time(UT)       ',
                ];

                for (var i in this.columns) {
                    var col = this.columns[i];
                    if (col.value) {
                        l.push(padStr(col.c, 15));
                    }
                }
                l = l.join(' ');
                let garis = '*'.padStart(l.length, '*');
                l = `Data         : Posisi Matahari
Lokasi       : ${locToStr(this.loc)}
${garis}
${l}
${garis}\n`;
                if (this.rows.length) {
                    return l + this.rows.map(row => {
                        let r = [
                            moment(row.date).utc().format('YYYY-MM-DD HH:mm:ss '),
                        ];
                        for (var i in this.columns) {
                            var col = this.columns[i];
                            if (col.value) {
                                switch (col.key) {
                                    case 'jd':
                                        r.push(formatAngle('decimal', row.jd, 6, 15));
                                        break;
                                    case 'deltaT':
                                        r.push(formatAngle('decimal', row.deltaT, 2, 15));
                                        break;
                                    case 'range':
                                        r.push(formatAngle('decimal', row.range, 1, 15));
                                        break;
                                    case 'lat':
                                        r.push(formatAngle('decimal', row.lat, 5, 15));
                                        break;
                                    case 'sd':
                                        r.push(moment(row.sd).format('mm[\']ss.SSS["] ').padStart(15, ' '));
                                        break;
                                    default:
                                        r.push(formatAngle(this.format.sudut, row[col.key], 5, 15));
                                        break;
                                }
                            }
                        }

                        return r.join(' ');
                    }).join('\n');
                }
                return '';
            },
            contentDownload() {
                return URL.createObjectURL(new Blob([this.rowsStr], {
                    type: 'plain/text',
                }));
            },
        }
    }
</script>