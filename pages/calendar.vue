<template>
    <lte-content title="Kalender Hijriah">
        <lte-card>
            <template #tools>
                <ul class="pagination pagination-sm float-left">
                    <li class="page-item" v-for="link in links">
                    <nuxt-link class="page-link" :to="link.to">{{link.label}}</nuxt-link>
                    </li>
                </ul>
            </template>
            <div class="row">
                <div class="col-12" v-for="info in months">
                    <a-hijriah v-bind="info"></a-hijriah>
                </div>
            </div>
        </lte-card>
    </lte-content>
</template>

<script>
    import {currentMonth} from '@/libs/hijriyah';

    export default {
        head: {
            title: 'Kalender'
        },
        data() {
            const [y, ] = currentMonth();
            return {
                model: {
                    y: y,
                },
                months: []
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
                const [y, ] = currentMonth();
                this.model.y = (v.y || y) * 1;
            },
            calcList() {
                const {y} = this.model;
                const {lon, lat} = this.$store.state.location;
                const {alt, elongation, age} = this.$store.state.criteria;
                const result = [];
                for (let i = 1; i <= 12; i++) {
                    result.push({
                        year: y,
                        month: i,
                        lon, lat,
                        alt, elongation, age
                    });
                }
                this.months = result;
            },
        },
        computed: {
            links() {
                let {y} = this.model;
                return [
                    {to: {query: {y: y - 10}}, label: '«'},
                    {to: {query: {y: y - 1}}, label: '<'},
                    {to: {query: {y: y}}, label: y},
                    {to: {query: {y: y + 1}}, label: '>'},
                    {to: {query: {y: y + 10}}, label: '»'},
                ];
            },
        }
    }
</script>
