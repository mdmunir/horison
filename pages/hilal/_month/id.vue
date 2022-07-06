<template>
    <div>
        <lte-card buttons="collapse">
            <div class="row">
                <div class="col-md-4 col-sm-6 col-12">
                    <div class="form-horizontal">
                        <div class="form-group row">
                            <label for="day" class="col-4 col-form-label">Tanggal</label>
                            <div class="col-8">
                                <select class="form-control" id="day" v-model="day">
                                    <option :value="0">0</option>
                                    <option :value="1">1</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="altitude" class="col-4 col-form-label">Altitude</label>
                            <div class="col-8">
                                <select class="form-control" id="altitude" v-model="method.alt">
                                    <option value="g">Geosentris</option>
                                    <option value="t">Toposentris</option>
                                    <option value="a">Apparent</option>
                                    <option value="au">Apparent Upper</option>
                                    <option value="al">Apparent Lower</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="elongation" class="col-4 col-form-label">Elongation</label>
                            <div class="col-8">
                                <select class="form-control" id="elongation" v-model="method.elongation">
                                    <option value="g">Geosentris</option>
                                    <option value="t">Toposentris</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </lte-card>
        <lte-card>
            <template #tools>
                <a v-if="rows.length" class="btn btn-tool" :href="contentDownload" download="hilal-wilayah-indonesia.txt">
                    <i class="fas fa-save"></i>
                </a>
            </template>
            <pre>{{rowsStr}}</pre>
        </lte-card>
    </div>
</template>

<script>
    import {R2D, D2R, Globe} from '@/libs/horison';
    import locations from '@/libs/location';
    import base from 'astronomia/src/base';
    import rise from 'astronomia/src/rise';

    const {floor, PI, sin, cos, asin, acos, atan, atan2} = Math;
    const METHOD = {
        alt: 'a',
        elongation: 'g'
    };

    const columns = [
        {key: 'name', label: 'Lokasi'},
        {key: 'lat', label: 'Lintang'},
        {key: 'lon', label: 'Bujur'},
        {key: 'zone', label: 'Timezone'},
        {key: 'date', label: 'Tanggal'},
        {key: 'sunSet', label: 'Sunset'},
        {key: 'sunSet2', label: 'Sunset2'},
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
        props: {
            hilal: Object,
            year: Number,
            month: Number,
            monthName: String,
        },
        data() {
            return {
                method: METHOD,
                columns: columns,
                day: 0,
            }
        },
        computed: {
            rows() {
                const method = this.method || {};
                const hilal = this.hilal;
                const result = [];
                const d = Math.floor(this.day);
                const fragment = hilal.fragment(d);
                const T0 = fragment.T0;
                
                locations.forEach((loc) => {
                    let offset = parseFloat(loc.zone) * 60;
                    const g = Globe.fromLoc(loc);
                    const info = hilal.calc(g, d, method);
                    const sunSet = Date.fromJD(info.sunSet);
                    let t = g.lon / (2 * PI) - fragment.eot;
                    
                    let delta = base.horner(t, fragment.SDec);
                    let tHA = rise.hourAngle(g.lat, -0.833 * D2R, delta) / (2 * PI);
                    t = t + tHA;
                    let mHA = base.horner(t, fragment.MHa);
                    let mDec = base.horner(t, fragment.MDec);
                    let altM = asin(sin(mDec)*sin(g.lat) + cos(mDec)*cos(g.lat)*cos(mHA-g.lon));
                    altM = altM - fragment.hp * cos(altM) + 34/60 * D2R;
                    let sHA = base.horner(t, fragment.SHa);
                    let sDec = base.horner(t, fragment.SDec);
                    let altS = asin(sin(sDec)*sin(g.lat) + cos(sDec)*cos(g.lat)*cos(sHA-g.lon));
                    altS = altS + 0.83 * D2R;
                    const row = {
                        name: loc.name, lat: loc.lat, lon: loc.lon,
                        zone: 'GMT' + loc.zone,
                        date: moment(sunSet).utcOffset(offset).format('YYYY-MM-DD'),
                        sunSet: altS * R2D,
                        sunSet2: (altM-altS) * R2D,
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
                return result;
            },
            rowsStr() {
                if (!this.rows.length) {
                    return '';
                }
                const {conjunction, meeusConjunction, equatorConjunction} = this.hilal.info();
                let lb = columns.map((v, i) => {
                    return i == 0 ? v.label.padMidle(45) : v.label.padMidle(15);
                }).join('');
                let garis = '*'.padStart(lb.length, '*');

                let l = `Data                : Hilal Wilayah Indonesia
Bulan               : ${this.monthName}
Konjungsi(VSOP&ELP) : ${moment(conjunction.toDate()).utc().format('YYYY-MM-DD HH:mm:ss.S')} UT
                    : ${moment(conjunction.toDate()).utcOffset(60 * 7).format('YYYY-MM-DD HH:mm:ss.S')} WIB
                    : ${moment(conjunction.toDate()).utcOffset(60 * 8).format('YYYY-MM-DD HH:mm:ss.S')} WITA
                    : ${moment(conjunction.toDate()).utcOffset(60 * 9).format('YYYY-MM-DD HH:mm:ss.S')} WIT
Konjungsi(Meeus)    : ${moment(meeusConjunction.toDate()).utc().format('YYYY-MM-DD HH:mm:ss.S')} UT
Konjungsi(Ekuator)  : ${moment(equatorConjunction.toDate()).utc().format('YYYY-MM-DD HH:mm:ss.S')} UT
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