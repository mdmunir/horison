<template>
    <lte-content title="Hilal">
        <div class="row">
            <div class="col-12">
                <ul class="pagination pagination-sm float-right">
                    <li class="page-item" v-for="link in links">
                        <input type="number" v-if="link.inp" v-model.number.lazy="y" style="width: 70px;" @change="push">
                    <nuxt-link v-else class="page-link" :to="link.to">{{link.label}}</nuxt-link>
                    </li>
                </ul>
            </div>
            <div class="col-12">
                <lte-card>
                    <table class="table table-bordered table-striped text-center">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Bulan</th>
                                <th>Konjungsi</th>
                                <th>Kuarter Pertama</th>
                                <th>Purnama</th>
                                <th>Kuarter Ketiga</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="row in rows">
                                <td>{{row.m}}</td>
                                <td>
                                    <nuxt-link :to="row.link">{{row.name}} {{y}}</nuxt-link>
                                </td>
                                <td v-for="time in row.times">{{time}}</td>
                            </tr>
                        </tbody>
                    </table>
                </lte-card>
            </div>
        </div>
    </lte-content>
</template>

<script>
    import {currentMonth, MONTHS, moonPhases} from '@/libs/hijriyah';

    const DMIN = 1;
    const DMAX = 2000;
    export default {
        head: {
            title: 'Hijriyah'
        },
        data() {
            let [y, ] = currentMonth();
            return {
                y: Math.floor(this.$route.params.y || y),
            }
        },
        watch: {
            '$route.query': function (v) {
                let [y, ] = currentMonth();
                this.y = Math.floor(v.y || y);
            },
        },
        methods: {
            push() {
                this.$router.push({query: {y: this.y}});
            }
        },
        computed: {
            links() {
                let y = this.y;
                const DMIN_ = DMIN + 10;
                const DMAX_ = DMAX - 10;
                return [
                    {to: {query: {y: y >= DMIN_ ? y - 10 : DMIN}}, label: '<<'},
                    {to: {query: {y: y > DMIN ? y - 1 : DMIN}}, label: '<'},
                    {to: {query: {y: y}}, label: y, inp: true},
                    {to: {query: {y: y < DMAX ? y + 1 : DMAX}}, label: '>'},
                    {to: {query: {y: y <= DMAX_ ? y + 10 : DMAX}}, label: '>>'},
                ];
            },
            rows() {
                const result = moonPhases(this.y);
                return result.map(row => {
                    let dt = row.deltaT / 86400;
                    row.link = {path:`/hilal/${row.y}-${row.m}`};
                    row.name = MONTHS[row.m - 1].name;
                    row.times = row.phases.map(v => {
                        return moment((v - dt).toDate()).utc().format('D MMM YYYY, HH:mm:ss [UT]');
                    });
                    return row;
                });
            }
        }
    }
</script>
