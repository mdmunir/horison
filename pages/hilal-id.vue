<template>
    <lte-content title="Hilal Wilayah Indonesia">
        <lte-card>
            <template #tools>
                <ul class="pagination pagination-sm float-left">
                    <li class="page-item" v-for="link in links">
                    <nuxt-link class="page-link" :to="link.to">{{link.label}}</nuxt-link>
                    </li>
                </ul>
                <ul class="pagination pagination-sm float-left">
                    <li class="page-item" v-for="d in 3" :class="{'active':model.d == (d-2)}">
                        <a href="javascript:void(0)" class="page-link" @click="setDay(d-2)">{{d-2}}</a>
                    </li>
                </ul>
                <a v-if="rows.length" class="btn btn-tool" :href="contentDownload" download="hilal-wilayah-indonesia.txt">
                    <i class="fas fa-save"></i>
                </a>
            </template>
            <div class="row">
                <div class="col-md-4 col-sm-6 col-12">
                    <div class="form-horizontal">
                        <div class="form-group row">
                            <label for="altitude" class="col-4 col-form-label">Altitude</label>
                            <div class="col-8">
                                <select class="form-control" id="altitude" v-model="model.altMethod" @change="calcList">
                                    <option value="g">Geosentris</option>
                                    <option value="t">Toposentris</option>
                                    <option value="a">Apparent</option>
                                    <option value="au">Apparent Upper</option>
                                    <option value="al">Apparent Lower</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <pre>{{rowsStr}}</pre>
        </lte-card>
    </lte-content>
</template>

<script>
    import {R2D, Globe} from '@/libs/horison';
    import {Hilal, currentMonth, MONTHS} from '@/libs/hijriyah';
    import locations from '@/libs/location';
    import base from 'astronomia/src/base';

    const {floor} = Math;

    const columns = [
        {key: 'name', label: 'Lokasi'},
        {key: 'lat', label: 'Lintang'},
        {key: 'lon', label: 'Bujur'},
        {key: 'zone', label: 'Timezone'},
        {key: 'date', label: 'Tanggal'},
        {key: 'sunSet', label: 'Sunset'},
        {key: 'sunAz', label: 'Az Matahari'},
        {key: 'moonAz', label: 'Az Bulan'},
        {key: 'moonAlt', label: 'Alt Bulan'},
        {key: 'elongation', label: 'Elongasi'},
        {key: 'age', label: 'Umur Bulan'},
        {key: 'fraction', label: 'FIB(%)'},
        {key: 'limb', label: 'Bright Limb'},
        {key: 'moonSet', label: 'Moonset'},
        {key: 'duration', label: 'Lama Bulan'},
    ];
    export default {
        head: {
            title: 'Hilal Wilayah Indonesia',
        },
        data() {
            const [y, m] = currentMonth();
            return {
                model: {
                    m: m,
                    y: y,
                    d: 0,
                    altMethod:'a',
                },
                columns: columns,
                rows: [],
                info: {},
            }
        },
        watch: {
            '$route.query': function (v) {
                this.setData(v);
                this.model.d = 0;
                this.calcList();
            }
        },
        mounted() {
            this.setData(this.$route.query);
            this.calcList();
        },
        methods: {
            setDay(v) {
                this.model.d = v;
                this.calcList();
            },
            setData(v) {
                const [y, m] = currentMonth();
                this.model.y = (v.y || y) * 1;
                this.model.m = (v.m || m) * 1;

                this.model.y = floor(this.model.y);
                this.model.m = floor(this.model.m);
                if (this.model.m < 1) {
                    this.model.m = 1;
                }
                if (this.model.m > 12) {
                    this.model.m = 12;
                }
            },
            calcList() {
                const {y, m, d, altMethod} = this.model;
                const hilal = Hilal.create(y, m);
                const {conjunction, meeusConjunction, equatorConjunction} = hilal.info();
                this.info.conjunction = Date.fromJD(conjunction);
                this.info.meeusConjunction = Date.fromJD(meeusConjunction);
                this.info.equatorConjunction = Date.fromJD(equatorConjunction);
                this.info.year = y;
                this.info.month = MONTHS[m - 1].name;
                const result = [];
                locations.forEach(loc => {
                    let offset = parseFloat(loc.zone) * 60;
                    const g = Globe.fromLoc(loc);
                    const info = hilal.calc(g, d, altMethod);
                    const sunSet = Date.fromJD(info.sunSet);
                    const row = {
                        name: loc.name, lat: loc.lat, lon: loc.lon,
                        zone: 'GMT' + loc.zone,
                        date: moment(sunSet).utcOffset(offset).format('YYYY-MM-DD'),
                        sunSet: moment(sunSet).utcOffset(offset).format('HH:mm:ss'),
                        moonSet: moment(Date.fromJD(info.moonSet)).utcOffset(offset).format('HH:mm:ss'),
                        age: '-',
                        duration: '-',
                        moonAlt: info.moonPos.alt * R2D,
                        moonAz: base.pmod(info.moonPos.az * R2D + 180, 360),
                        sunAz: base.pmod(info.sunPos.az * R2D + 180, 360),
                        elongation: info.elongation * R2D,
                        fraction: info.fraction * 100,
                        limb: info.limb * R2D - 180,
                    }
                    if (info.age > 0) {
                        row.age = (info.age * 24).hms(0, true);
                    }
                    if (info.duration > 0) {
                        row.duration = (info.duration * 24).hms(0, true);
                    }

                    result.push(row);
                });
                this.rows = result;
            },
        },
        computed: {
            links() {
                let {y, m} = this.model;
                return [
                    {to: {query: {y: y - 1, m: m}}, label: '«'},
                    {to: {query: {y: (m <= 1 ? y - 1 : y), m: (m <= 1 ? 12 : m - 1)}}, label: '<'},
                    {to: {query: {y, m}}, label: `${MONTHS[m - 1].name} ${y}`},
                    {to: {query: {y: (m >= 12 ? y + 1 : y), m: (m >= 12 ? 1 : m + 1)}}, label: '>'},
                    {to: {query: {y: y + 1, m: m}}, label: '»'},
                ];
            },
            rowsStr() {
                if (!this.rows.length) {
                    return '';
                }
                const {y, m} = this.model;
                let lb = columns.map((v, i) => {
                    return i == 0 ? v.label.padMidle(45) : v.label.padMidle(15);
                }).join('');
                let garis = '*'.padStart(lb.length, '*');

                let l = `Data                : Hilal Wilayah Indonesia
Bulan               : ${this.info.month} ${this.info.year}
Konjungsi(VSOP&ELP) : ${moment(this.info.conjunction).utc().format('YYYY-MM-DD HH:mm:ss.S')} UT
                    : ${moment(this.info.conjunction).utcOffset(60 * 7).format('YYYY-MM-DD HH:mm:ss.S')} WIB
                    : ${moment(this.info.conjunction).utcOffset(60 * 8).format('YYYY-MM-DD HH:mm:ss.S')} WITA
                    : ${moment(this.info.conjunction).utcOffset(60 * 9).format('YYYY-MM-DD HH:mm:ss.S')} WIT
Konjungsi(Meeus)    : ${moment(this.info.meeusConjunction).utc().format('YYYY-MM-DD HH:mm:ss.S')} UT
Konjungsi(Ekuator)  : ${moment(this.info.equatorConjunction).utc().format('YYYY-MM-DD HH:mm:ss.S')} UT
${garis}
${lb}
${garis}\n`;

                return l + this.rows.map(row => {
                    return columns.map((v) => {
                        let key = v.key;
                        let val = row[key];
                        switch (key) {
                            case 'name':
                                return val.padEnd(45, ' ');
                            default:
                                if (typeof val === 'number') {
                                    return val.toFixed(6).padStart(15, ' ');
                                }
                                return val.padStart(15, ' ');
                        }
                    }).join('');
                }).join('\n');
            },
            contentDownload() {
                return URL.createObjectURL(new Blob([this.rowsStr], {
                    type: 'plain/text',
                }));
            },
        }
    }
</script>