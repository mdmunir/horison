
<template>
    <lte-content :title="name" :links='breadcrumbs'>
        <div v-if="!isValid">
            Bulan tidak valid.
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
                <router-view :hilal="hilal" :year="y" :month="m" :month-name="name"></router-view>
            </div>
        </div>
    </lte-content>
</template>
<script>
    import {Hilal, currentMonth, MONTHS} from '@/libs/hijriyah';

    const MONTH_REGEX = /^(\d{4})-(\d{1,2})$/

    export default {
        head(){
            return {
                title:this.name,
            }
        },
        data() {
            let month = this.$route.params.month;
            let hilal, y, m;
            if (MONTH_REGEX.test(month)) {
                let match = month.match(MONTH_REGEX);
                y = match[1] * 1;
                m = match[2] * 1;
                hilal = Hilal.create(y * 1, m * 1);
            }
            return {
                hilal,
                y,
                m,
            }
        },
        computed: {
            breadcrumbs() {
                if (this.isValid) {
                    return [
                        {label: 'Fase Bulan', url: {path: '/hilal', query: {y:this.y}}},
                        {label: this.name, active: true}
                    ];
                }
                return [
                    {label: 'Fase Bulan', url: {path: '/hilal'}},
                ];
            },
            children() {
                const parent = 'hilal-month';
                const children = [
                    {name: '', label: 'Info'},
                    {name: 'id', label: 'Wilayah Indonesia'},
                        //{name: 'path', label: 'Path'},
                ];
                let name = this.$route.name;
                let month = this.$route.params.month;
                return children.map(v => {
                    let cname = v.name ? parent + '-' + v.name : parent;
                    if (cname == name) {
                        v.active = true;
                    }
                    v.link = {name: cname, params: {month: month}};
                    return v;
                });
            },
            isValid() {
                return !!this.hilal;
            },
            name() {
                if (this.y && this.m) {
                    return `${MONTHS[this.m - 1].name} ${this.y}`;
                }
                return 'Invalid!!';
            },
        },
        watch: {
            '$route.params.month': function (month) {
                if (MONTH_REGEX.test(month)) {
                    let match = month.match(MONTH_REGEX);
                    this.y = match[1] * 1;
                    this.m = match[2] * 1;
                    this.hilal = Hilal.create(this.y * 1, this.m * 1);
                } else {
                    this.hilal = null;
                    this.y = null;
                    this.m = null;
                }
            }
        }
    }
</script>
