<template>
    <div class="row">
        <div class="col-12">
            <lte-card title="Info" >
                <template #tools>
                    <a v-if="rowsStr" class="btn btn-tool" :href="contentDownload" download="hilal-lokal.txt">
                        <i class="fas fa-save"></i>
                    </a>
                </template>
                <pre>{{rowsStr}}</pre>
            </lte-card>
        </div>
    </div>
</template>

<script>
    import {R2D, D2R, Globe} from '@/libs/horison';
    import base from 'astronomia/src/base';

    const {floor, PI, sin, cos, asin, acos, atan, atan2} = Math;

    export default {
        props: {
            hilal: Object,
            year: Number,
            month: Number,
            monthName: String,
        },
        computed: {
            rowsStr() {
                const hilal = this.hilal;
                const globe = Globe.fromLoc(this.$store.state.location);
                const offset = this.$store.state.location.offset || 420;
                const {conjunction, meeusConjunction, equatorConjunction} = this.hilal.info();
                let zone = offset >= 0 ? '+' + (offset / 60) : (offset / 60);

                let result = `Data                : Hilal
Lokasi              : ${globe}
Bulan               : ${this.monthName}
Konjungsi(VSOP&ELP) : ${moment(conjunction.toDate()).utc().format('YYYY-MM-DD HH:mm:ss.S')} UT
                    : ${moment(conjunction.toDate()).utcOffset(offset).format('YYYY-MM-DD HH:mm:ss.S')} UTC ${zone}
Konjungsi(Meeus)    : ${moment(meeusConjunction.toDate()).utc().format('YYYY-MM-DD HH:mm:ss.S')} UT
Konjungsi(Ekuator)  : ${moment(equatorConjunction.toDate()).utc().format('YYYY-MM-DD HH:mm:ss.S')} UT
`;

                const columns = [
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
                result += '\n'.padStart(15 * columns.length, '=');
                result += columns.map(c => {
                    return c.label.padMidle(15);
                }).join('') + '\n';
                result += '\n'.padStart(15 * columns.length, '=');

                for (let d = -1; d <= 1; d++) {
                    const info = hilal.calc(globe, d, 'a');
                    const sunSet = Date.fromJD(info.sunSet);
                    const row = {
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

                    result += columns.map(c => {
                        let val = row[c.key];
                        if (typeof val === 'number') {
                            return val.toFixed(6).padStart(15, ' ');
                        }
                        return val.padStart(15, ' ');
                    }).join('') + '\n';
                }
                return result;
            },
            contentDownload() {
                return URL.createObjectURL(new Blob([this.rowsStr], {
                    type: 'plain/text',
                }));
            },
        }
    }
</script>
