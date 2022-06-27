<template>
    <lte-content title="Gerhana Matahari">
        <div class="row">
            <div class="col-12">
                <ul class="pagination pagination-sm float-right">
                    <li class="page-item" v-for="link in links">
                        <input type="number" v-if="link.inp" v-model.number.lazy="dekade" style="width: 70px;" @change="push">
                    <nuxt-link v-else class="page-link" :to="link.to">{{link.label}}</nuxt-link>
                    </li>
                </ul>
            </div>
            <div class="col-12">
                <lte-card>
                    <table class="table table-bordered table-striped text-center">
                        <thead>
                            <tr>
                                <th>Lunasi</th>
                                <th>Tanggal</th>
                                <th>Tipe</th>
                                <th>Gamma</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="row in rows">
                                <td>
                        <nuxt-link :to="row.link">{{row.k}}</nuxt-link>
                        </td>
                        <td>{{row.stime}}</td>
                        <td>{{row.stype}}</td>
                        <td  style="text-align: right;">{{row.distance.toFixed(8)}}</td>
                        </tr>
                        </tbody>
                    </table>
                </lte-card>
            </div>
        </div>
    </lte-content>
</template>

<script>
    import {EclipseDecade} from '@/libs/solar-eclipse';

    const DMIN = 1900;
    const DMAX = 2100;
    export default {
        head: {
            title: 'Gerhana Matahari'
        },
        data() {
            return {
                y: Math.floor((new Date).getFullYear() / 10) * 10,
            }
        },
        watch: {
            '$route.query': function (v) {
                this.setData(v);
            },
        },
        mounted() {
            this.setData(this.$route.query);
        },
        methods: {
            setData(v) {
                this.y = v.y;
            },
            push() {
                this.$router.push({query: {dekade: this.dekade}});
            }
        },
        computed: {
            dekade() {
                let dekade = Math.floor((this.y || (new Date).getFullYear()) / 10) * 10;
                if (dekade < DMIN) {
                    dekade = DMIN;
                } else if (dekade > DMAX) {
                    dekade = DMAX;
                }
                return dekade;
            },
            links() {
                let y = this.dekade;
                const DMIN_ = DMIN + 10;
                const DMAX_ = DMAX - 10;
                return [
                    {to: {query: {y: DMIN}}, label: '<<'},
                    {to: {query: {y: y >= DMIN_ ? y - 10 : DMIN}}, label: '<'},
                    {to: {query: {y: y}}, label: y, inp: true},
                    {to: {query: {y: y <= DMAX_ ? y + 10 : DMAX}}, label: '>'},
                    {to: {query: {y: DMAX}}, label: '>>'},
                ];
            },
            rows() {
                const types = ['None', 'Partial', 'Annular', 'Annular Total', 'Penumbral', 'Umbral', 'Total'];
                const ED = new EclipseDecade(this.dekade);
                return ED.rows.map(e => {
                    let info = e.info();
                    let date = (info.jdeMax - info.deltaT / 86400).toDate();
                    let sdate = moment(date).utc().format('YYYY-MM-DD');
                    const row = {
                        ...info,
                        stime: moment(date).utc().format('dddd, D MMMM YYYY,  HH:mm:ss [UT]'),
                        date: sdate,
                        stype: types[info.type],
                        link: {path: `/solar-eclipse/${sdate}/path`},
                    }
                    return row;
                });
            }
        }
    }
</script>
