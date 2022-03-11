<template>
    <lte-content title="Kalender Hijriyah">
        <div class="row">
            <div class="col-12">
                <ul class="pagination pagination-sm float-right">
                    <li class="page-item" v-for="link in links">
                    <nuxt-link class="page-link" :to="link.to">{{link.label}}</nuxt-link>
                    </li>
                </ul>
                <label><input type="checkbox" v-model="format.note"> Keterangan</label>
            </div>
        </div>
        <div class="row">
            <div class="col-12 col-lg-6" v-for="info in months">
                <lte-card>
                    <a-hijriyah v-bind="info" :show-note="format.note"></a-hijriyah>
                </lte-card>
            </div>
        </div>
    </lte-content>
</template>

<script>
    import {currentMonth} from '@/libs/hijriyah';

    export default {
        head: {
            title: 'Kalender Hijriyah'
        },
        data() {
            const [y, ] = currentMonth();
            return {
                model: {
                    y: y,
                },
                format: {
                    note: true,
                },
            }
        },
        watch: {
            '$route.query': function (v) {
                this.setData(v);
            }
        },
        mounted() {
            this.setData(this.$route.query);
        },
        methods: {
            setData(v) {
                const [y, ] = currentMonth();
                this.model.y = (v.y || y) * 1;
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
            months() {
                const {y} = this.model;
                const loc = this.$store.state.location || {};
                const criteria = this.$store.state.criteria || {};
                const result = [];
                for (let i = 1; i <= 12; i++) {
                    result.push({
                        year: y,
                        month: i,
                        loc: {...loc},
                        criteria: {...criteria},
                    });
                }
                return result;
            },
        }
    }
</script>
