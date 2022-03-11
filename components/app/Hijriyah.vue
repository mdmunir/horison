<template>
    <table class="table table-bordered" style="text-align: center;">
        <thead>
            <tr>
                <td colspan="7">
                    <div style="font-size: 1.8em;">{{info.name}}</div>
                    <span style="font-size: 0.9em;">{{info.masehi}}</span>
                </td>
            </tr>
            <tr>
                <th v-for="d in dayNames">
                    <span class="d-block d-sm-none">{{d[0]}}</span>
                    <span class="d-none d-sm-block">{{d[1]}}</span>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="row in info.matrix">
                <td v-for="cell in row" :class="{'inactive': !cell.isActive}">
                    <span style="font-size: 0.8em;">{{cell.mDay}}</span>
                    <div style="font-size: 1.7em;">{{cell.dArab}}</div>
                    <span style="font-size: 0.6em;">{{cell.pekan}}</span>
                </td>
            </tr>
        </tbody>
        <tfoot v-if="showNote">
            <tr>
                <td colspan="7" v-html="info.note" style="text-align: left;font-size: 0.8em;"></td>
            </tr>
        </tfoot>
    </table>
</template>
<style>
    .table th, .table td{
        padding: 0px;
    }
    .table td.inactive{
        opacity: 0.25;
    }
    td div{
        margin-bottom: -0.3em;
        margin-top: -0.3em;
    }
</style>
<script>

    import {Hijriah, Criteria, MONTHS} from '@/libs/hijriyah';
    import {Globe, R2D} from '@/libs/horison';

    const DAYS = [
        ['A', 'AHAD'],
        ['S', 'SENIN'],
        ['S', 'SELASA'],
        ['R', 'RABU'],
        ['K', 'KAMIS'],
        ['J', 'JUMAT'],
        ['S', 'SABTU'],
    ];
    const PASARAN = [
        'PON',
        'WAGE',
        'KLIWON',
        'LEGI',
        'PAHING',
    ];

    export default {
        props: {
            year: {
                type: Number,
            },
            month: {
                type: Number,
            },
            criteria: {
                type: Object,
            },
            loc: {
                type: Object,
            },
            showNote: {
                type: Boolean,
                default: false,
            }
        },
        data() {
            return{
                dayNames: DAYS,
            }
        },
        computed: {
            info() {
                const criteria = new Criteria(this.criteria || {});
                const globe = Globe.fromLoc(this.loc || {});
                const h = new Hijriah(criteria);
                const info = h.calcMonth(globe, this.year, this.month);
                let jd = Math.floor(info.jd + 1);
                const dow = (jd + 1) % 7;
                const weeks = Math.floor((dow + info.count) / 7) + 1;
                const matrix = [];
                for (let w = 0; w < weeks; w++) {
                    if (dow == 6 && w == 0) {
                        continue;
                    }
                    const row = [];
                    for (let i = 0; i < 7; i++) {
                        const x = w * 7 + i;
                        let d = x - dow, dd = d;
                        if (d < 1) {
                            dd = d + info.prevCount;
                        } else if (d > info.count) {
                            dd = d - info.count;
                        }

                        let date = (x - dow + jd).toDate();
                        let pekan = (x - dow + jd + 3) % 5;
                        row.push({
                            d, date, dd,
                            dArab: dd.toArab(),
                            mDay: date.getDate(),
                            pekan: PASARAN[pekan],
                            isActive: (d >= 1 && d <= info.count),
                        });
                    }
                    matrix.push(row);
                }
                let masehi = `${moment(jd.toDate()).format('MMMM YYYY')} - ${moment((jd + info.count).toDate()).format('MMMM YYYY')}`;
                let offset = this.loc.offset || 420;
                let sConjuction = moment(info.conjunction.toDate()).utcOffset(offset).format('dddd, D MMMM YYYY [pukul] HH:mm:ss');
                let sSunset = moment(info.sunSet.toDate()).utcOffset(offset).format('D MMM YYYY HH:mm:ss');
                let sAge = info.age > 0 ? (info.age * 24).hms(0, true) : '-';
                let note = `Konjungsi: <b>${sConjuction}</b>.
Pada saat Maghrib tanggal <b>${sSunset}</b>, altitude bulan = <b>${(info.alt * R2D).toFixed(4)}°</b>,
elongasi = <b>${(info.elongation * R2D).toFixed(4)}°</b> dan umur bulan = <b>${sAge}</b>.`;
                return{
                    name: `${MONTHS[info.month - 1].name} ${info.year.toArab()}`,
                    masehi: masehi,
                    matrix: matrix,
                    note,
                }
            }
        }
    }
</script>