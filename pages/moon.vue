<template>
    <lte-content title="Posisi Bulan">
        <lte-card buttons="collapse">
            <form class="form-horizontal">
                <div class="row">
                    <div class="col-lg-4 col-sm-12">
                        <div class="form-group row">
                            <label for="dari" class="col-sm-4 col-form-label">Dari</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" id="dari" v-model="from"
                                       placeholder="YYYY-MM-dd HH:mm:ss">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="sampai" class="col-sm-4 col-form-label">Sampai</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" id="sampai" v-model="to"
                                       placeholder="YYYY-MM-dd HH:mm:ss">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="interval" class="col-sm-4 col-form-label">Interval</label>
                            <div class="col-sm-8">
                                <div class="input-group mb-3">
                                    <input type="number" class="form-control" id="interval" v-model="interval">
                                    <div class="input-group-append">
                                        <button type="button" class="btn btn-warning dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                                            {{units[unit].label}}
                                        </button>
                                        <ul class="dropdown-menu" style="">
                                            <li v-for="(v,k) in units"  class="dropdown-item">
                                                <a @click="unit = k" href="javascript:void(0)"><i class="fa fa-check" v-if="unit == k"></i>{{v.label}}</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="offset-sm-4 col-sm-8">
                                <button class="btn btn-sm btn-primary" @click="submit()">Generate</button>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-8 col-sm-12">
                        <div class="row">
                            <div class="col-lg-4" v-for="cols in columnsChunk">
                                <div class="form-check" v-for="col in cols">
                                    <input type="checkbox" class="form-check-input" :id="'ck_'+col.key"  v-model="col.value">
                                    <label class="form-check-label" :for="'ck_'+col.key">{{col.label}}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </lte-card>
        <lte-card title="Result">
            <template #tools>
                <a v-if="rows.length" class="btn btn-tool" :href="contentDownload" download="posisi-bulan.txt">
                    <i class="fas fa-save"></i>
                </a>
            </template>
            <pre>{{rowsStr}}</pre>
        </lte-card>
    </lte-content>
</template>

<script>
    import {moonList, strToJD, R2D, toGlobe} from '@/libs/horison';
    import base from 'astronomia/src/base';
    import julian from 'astronomia/src/julian';

    const units = {
        s: {label: 'Detik', value: 1},
        m: {label: 'Menit', value: 60},
        h: {label: 'Jam', value: 3600},
        d: {label: 'Hari', value: 24 * 3600},
    }
    const columns = [
        {key: 'jd', label: 'Julian Day', value: true, c: '   Julian Day    '},
        {key: 'lon', label: 'Longitude(°)', value: true, c: '   Lon(°)   '},
        {key: 'lat', label: 'Latitude(°)', value: true, c: '   Lat(°)   '},
        {key: 'ra', label: 'RA(°)', value: true, c: '   RA(°)    '},
        {key: 'dec', label: 'Dec(°)', value: true, c: '   Dec(°)   '},
        {key: 'alt', label: 'Altitude(+ref °)', value: true, c: '   Alt(°)   '},
        {key: 'az', label: 'Azimut(selatan °)', value: true, c: '    Az(°)   '},
        {key: 'range', label: 'Jarak(KM)', value: true, c: ' Jarak(KM)  '},
        {key: 'sd', label: 'Semi Diameter(\')', value: true, c: '     SD(\')     '},
        {key: 'phase', label: 'Fase °', value: true, c: '  Fase(°)  '},
        //{key: 'fraction', label: 'Fraksi iluminasi %', value: true, c: '  Fraksi(%) '},
        {key: 'elongation', label: 'Elongasi(°)', value: true, c: 'Elongasi(°) '},
        {key: 'deltaT', label: 'Delta T(detik)', value: true, c: '   deltaT   '},
        {key: 'gst', label: 'GST(°)', value: true, c: '   GST(°)   '},
        {key: 'obliquity', label: 'Obliquity ε(°)', value: true, c: '    ε(°)    '},
    ];

    export default {
        head: {
            title: 'Posisi Bulan',
        },
        data() {
            return {
                from: '',
                to: '',
                unit: 'h',
                interval: 1,
                units: units,
                columns,
                rows: []
            }
        },
        watch: {
            '$route.query': function (v) {
                this.setParams(v);
                this.calcList();
            }
        },
        mounted() {
            this.setParams(this.$route.query);
            this.calcList();
        },
        methods: {
            submit() {
                const query = Object.assign({}, this.$route.query);
                query.from = this.from;
                query.to = this.to;
                query.interval = this.interval;
                query.unit = this.unit;
                this.$router.push({query});
            },
            setParams(v) {
                this.from = v.from ? v.from : moment().format('YYYY-MM-DD [00:00:00]');
                this.to = v.to ? v.to : moment().format('YYYY-MM-DD [23:59:59]');
                this.unit = v.unit ? v.unit : 'h';
                this.interval = v.interval ? v.interval : 1;
            },
            calcList() {
                let jd1 = strToJD(this.from);
                let jd2 = strToJD(this.to);
                if (jd1 && jd2) {
                    let step = this.interval * units[this.unit].value / (24 * 3600);
                    let g = toGlobe(this.$store.state.location);
                    this.rows = moonList(jd1, jd2, step, g).map(v => {
                        v.date = julian.JDToDate(v.jd);
                        v.lon *= R2D;
                        v.lat *= R2D;
                        v.ra *= R2D;
                        v.dec *= R2D;
                        v.alt *= R2D;
                        v.az *= R2D;
                        v.ε *= R2D;
                        v.phase *= R2D;
                        v.elongation *= R2D;
                        v.az = base.pmod(v.az, 360);
                        v.phase = base.pmod(v.phase, 360);
                        v.fraction *= 100;
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
                let n = Math.ceil(columns.length / 3);
                let r = [];
                for (var i = 0; i < 3; i++) {
                    r.push(this.columns.slice(i * n, i * n + n));
                }
                return r;
            },
            rowsStr() {
                let l = [
                    '      Time(UT)      ',
                ];

                for (var i in this.columns) {
                    var col = this.columns[i];
                    if (col.value) {
                        l.push(col.c);
                    }
                }
                l = l.join(' ');

                l += '\n' + '*'.padStart(l.length, '*') + '\n';
                if (this.rows.length) {
                    return l + this.rows.map(row => {
                        let r = [
                            moment(row.date).utc().format('YYYY-MM-DD HH:mm:ss'),
                        ];
                        for (var i in this.columns) {
                            var col = this.columns[i];
                            if (col.value) {
                                switch (col.key) {
                                    case 'jd':
                                        r.push(row.jd.toFixed(6).padStart(15, ' '));
                                        break;
                                    case 'range':
                                        r.push(row.range.toFixed(1).padStart(14, ' '));
                                        break;
                                    case 'obliquity':
                                        r.push(row.ε.toFixed(5).padStart(12, ' '));
                                        break;
                                    case 'sd':
                                        r.push(moment(row.sd).format('   mm[\']ss.SSS["]'));
                                        break;
                                    default:
                                        r.push(row[col.key].toFixed(5).padStart(12, ' '));
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

