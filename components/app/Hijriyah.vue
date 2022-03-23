<template>
    <table class="table table-bordered" style="text-align: center;">
        <thead>
            <tr>
                <td colspan="7">
                    <a class="btn btn-sm float-left" @click="navClick(0)" v-if="showNav" title="Today">
                        <i class="fas fa-calendar-day"></i></a>
                    <div style="font-size: 1.8em;">
                        <a class="btn btn-sm" @click="navClick(-1)" v-if="showNav">&lt;</a>
                        {{info.name}}
                        <a class="btn btn-sm" @click="navClick(1)" v-if="showNav">&gt;</a>
                    </div>
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
                <td colspan="7" style="text-align: left;font-size: 0.8em;">
                    Konjungsi: <b>{{info.conjuction}}</b>.
                    Pada saat Maghrib tanggal <b>{{info.sunset}}</b>, altitude bulan = <b>{{info.alt}}°</b>,
                    elongasi = <b>{{info.elongation}}°</b> dan umur bulan = <b>{{info.age}}</b>.
                </td>
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
        margin-bottom: -0.4em;
        margin-top: -0.4em;
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
    const WEEKDAYS = [...moment.weekdays()];
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
            },
            showNav: {
                type: Boolean,
                default: false,
            }
        },
        data() {
            return{
                dayNames: DAYS,
                current: {}
            }
        },
        computed: {
            info() {
                const criteria = new Criteria(this.criteria || {});
                const globe = Globe.fromLoc(this.loc || {});
                const h = new Hijriah(criteria);
                const info = h.calcMonth(globe, this.year, this.month);
                this.current.year = info.year;
                this.current.month = info.month;

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
                        let {day} = (x - dow + jd).toCalendar();
                        let pekan = (x - dow + jd + 3) % 5;
                        row.push({
                            d, dd,
                            dArab: dd.toArab(),
                            mDay: Math.floor(day),
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

                return{
                    name: `${MONTHS[info.month - 1].name} ${info.year.toArab()}`,
                    masehi: masehi,
                    matrix: matrix,
                    conjuction: sConjuction,
                    sunset: sSunset,
                    alt: (info.alt * R2D).toFixed(4),
                    elongation: (info.elongation * R2D).toFixed(4),
                    age: sAge,
                }
            }
        },
        methods: {
            navClick(v) {
                let {year, month} = this.current;
                if (v == -1) {
                    month--;
                    if (month < 1) {
                        year--;
                        month = 12;
                    }
                } else if (v == 1) {
                    month++;
                    if (month > 12) {
                        year++;
                        month = 1;
                    }
                } else {
                    year = undefined;
                    month = undefined;
                }
                this.$emit('nav', {year, month});
            }
        }
    }
</script>