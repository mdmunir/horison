<template>
    <lte-content title="Waktu Shalat">        
        <lte-card>
            <template #tools>
                <ul class="pagination pagination-sm float-left">
                    <li class="page-item" v-for="link in links">
                    <nuxt-link class="page-link" :to="link.to">{{link.label}}</nuxt-link>
                    </li>
                </ul>
                <a v-if="rows.length" class="btn btn-tool" :href="contentDownload" download="waktu-shalat.txt">
                    <i class="fas fa-save"></i>
                </a>
            </template>
            <pre>{{rowsStr}}</pre>
        </lte-card>
    </lte-content>
</template>

<script>
    import {locToStr, now} from '@/libs/horison';

    import calcPrayer from '@/libs/prayer';
    import base from 'astronomia/src/base';
    import julian from 'astronomia/src/julian';

    const CHUNK = 2;

    const columns = [
        {key: 'subuh', label: 'Subuh', value: true, },
        {key: 'terbit', label: 'Terbit', value: true, },
        {key: 'dzuhur', label: 'Dzuhur', value: true, },
        {key: 'ashar', label: 'Ashar', value: true, },
        {key: 'maghrib', label: 'Maghrib', value: true, },
        {key: 'isya', label: 'Isya', value: true, },
        {key: 'tengah', label: 'Tengah Malam', value: true, },
        {key: 'pertiga', label: 'Pertiga Akhir', value: true, },
    ];

    const LABELS = {
        subuh: 'Subuh',
        terbit: 'Terbit',
        dzuhur: 'Dzuhur',
        ashar: 'Ashar',
        maghrib: 'Maghrib',
        isya: 'Isya',
        tengah: 'Tengah Malam',
        pertiga: 'Pertiga Akhir',
    }

    function padStr(v, l) {
        let n = (l + v.length) / 2;
        let r = v.padStart(n, ' ');
        return r.padEnd(l, ' ');
    }

    export default {
        head: {
            title: 'Waktu Shalat',
        },
        data() {
            const {y, m} = now();
            return {
                model: {
                    m: m,
                    y: y,
                },
                columns: columns,
                rows: []
            }
        },
        watch: {
            '$route.query': function (v) {
                this.setData(v);
                this.calcList();
            }
        },
        mounted() {
            this.setData(this.$route.query);
            this.calcList();
        },
        methods: {
            setData(v) {
                const {y, m} = now();
                this.model.y = (v.y || y) * 1;
                this.model.m = (v.m || m) * 1;
                if(this.model.m < 1){
                    this.model.m = 1;
                }
                if(this.model.m > 12){
                    this.model.m = 12;
                }
            },
            calcList() {
                const {y, m} = this.model;
                const last = (new Date(y, m, 0)).getDate();
                const result = [];
                const loc = this.$store.state.location;
                const config = this.$store.state.prayer;
                for (let d = 1; d <= last; d++) {
                    let times = calcPrayer(y, m, d, loc, config);
                    result.push({day: d, times});
                }
                this.rows = result;
            },
        },
        computed: {
            links() {
                let {y, m} = this.model;
                return [
                    {to: {query: {y: y - 1, m: m}}, label: '«'},
                    {to: {query: {y: (m <= 1 ? y - 1 : y), m: (m <= 1 ? 12 : m - 1)}}, label: '<'},
                    {to: {query: {y, m}}, label: moment(new Date(y, m - 1, 1)).format('MMMM YYYY')},
                    {to: {query: {y: (m >= 12 ? y + 1 : y), m: (m >= 12 ? 1 : m + 1)}}, label: '>'},
                    {to: {query: {y: y + 1, m: m}}, label: '»'},
                ];
            },
            rowsStr() {
                if (!this.rows.length) {
                    return '';
                }
                const loc = this.$store.state.location;
                const {y, m} = this.model;
                let l = [
                    ' Tanggal ',
                ];

                this.rows[0].times.forEach(time => {
                    if (LABELS[time.name]) {
                        l.push(padStr(LABELS[time.name], 15));
                    }
                });

                l = l.join(' ');
                let garis = '*'.padStart(l.length, '*');
                l = `Data         : Waktu Shalat
Lokasi       : ${locToStr(loc)}
Bulan        : ${moment(new Date(y, m - 1, 1)).format('MMMM YYYY')}
${garis}
${l}
${garis}\n`;
                if (this.rows.length) {
                    return l + this.rows.map(row => {
                        let r = [
                            `${row.day}  `.padStart(9, ' '),
                        ];
                        row.times.forEach(time => {
                            if (LABELS[time.name]) {
                                r.push(moment(time.time).utcOffset(loc.timezone)
                                    .format('HH:mm   ').padStart(15, ' '));
                            }
                        });

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