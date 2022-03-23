<template>
    <lte-content title="Kalender Hijriyah">
        <div class="row">
            <div class="col-12">
                <ul class="pagination pagination-sm float-right">
                    <li class="page-item" v-for="link in links">
                        <input type="number" v-if="link.inp" v-model.number.lazy="model.y" style="width: 70px;" @change="push">
                        <nuxt-link v-else class="page-link" :to="link.to">{{link.label}}</nuxt-link>
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

    const FORMAT = {note: false};
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
                format: FORMAT,
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
                this.model.y = Math.floor((v.y || y) * 1);
                if(this.model.y < 1){
                    this.model.y = 1;
                }
            },
            push(){
                this.model.y = Math.floor(this.model.y);
                if(this.model.y < 1){
                    this.model.y = 1;
                }
                this.$router.push({query:{y:this.model.y}});
            }
        },
        computed: {
            links() {
                let {y} = this.model;
                return [
                    {to: {query: {y: y - 10}}, label: '<<'},
                    {to: {query: {y: y - 1}}, label: '<'},
                    {to: {query: {y: y}}, label: y, inp: true},
                    {to: {query: {y: y + 1}}, label: '>'},
                    {to: {query: {y: y + 10}}, label: '>>'},
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
