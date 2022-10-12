<template>
    <lte-content :title="'Gerhana Matahari '+(info.date || '')" :links='breadcrumbs'>
        <div v-if="!isValid">
            Gerhana tidak ditemukan.
        </div>
        <div v-else>
            <ul class="nav nav-tabs">
                <li class="nav-item" v-for="child in children">
                <nuxt-link class="nav-link" :to="child.link" :class="{active:child.active}">
                    {{child.label}}
                </nuxt-link>                
                </li>
            </ul>
            <div class="tab-content">
                <router-view :eclipse="eclipse" :info="info"></router-view>
            </div>

        </div>
    </lte-content>
</template>
<script>
    import {Eclipse} from '@/libs/solar-eclipse';

    export default {
        head: {
            title: 'Gerhana Matahari',
        },
        data() {
            let date = this.$route.params.date;
            const eclipse = new Eclipse(date);
            return {
                eclipse,
                info: eclipse.info(),
            }
        },
        computed: {
            breadcrumbs() {
                if (this.isValid) {
                    let y = this.info.date.toDate().getFullYear();
                    y = Math.floor(y / 10) * 10;
                    return [
                        {label: 'List Gerhana', url: {path: '/solar-eclipse', query: {y}}},
                        {label: this.info.date, active: true}
                    ];
                }
                return [
                    {label: 'List Gerhana', url: {path: '/solar-eclipse'}},
                ];
            },
            children() {
                const parent = 'solar-eclipse-date';
                const children = [
                    {name: '', label: 'Info'},
                    {name: 'map', label: 'Peta'},
                    //{name: 'path', label: 'Path'},
                ];
                let name = this.$route.name;
                let date = this.info.date;
                return children.map(v => {
                    let cname = v.name ? parent + '-' + v.name : parent;
                    if (cname == name) {
                        v.active = true;
                    }
                    v.link = {name: cname, params: {date: date}};
                    return v;
                });
            },
            isValid() {
                return this.eclipse.isValid();
            }
        },
        watch: {
            '$route.params.date': function (date) {
                this.eclipse = new Eclipse(date);
                this.info = this.eclipse.info();
            }
        }
    }
</script>
