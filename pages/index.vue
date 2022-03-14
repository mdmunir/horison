<template>
    <lte-content :title="false">
        <h5>{{latLon}}</h5>
        <div class="row">
            <div class="col-md-2 col-4" v-for="item in times">
                <div class="info-box bg-success">
                    <div class="info-box-content">
                        <span class="info-box-text">{{item.label}}</span>
                        <span class="info-box-number">{{item.stime}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <lte-card>
                    <a-hijriyah v-bind="hijriyah" @nav="navClick"></a-hijriyah>
                </lte-card>
            </div>
        </div>
    </lte-content>
</template>

<script>
    import {now, Globe} from '@/libs/horison';
    import calcPrayer from '@/libs/prayer';

    const LABELS = {
        subuh: 'Subuh',
        terbit: 'Terbit',
        dzuhur: 'Dzuhur',
        ashar: 'Ashar',
        maghrib: 'Maghrib',
        isya: 'Isya',
    }

    const MONTH = {
        year: undefined,
        month: undefined,
    };
    export default {
        head: {
            title: 'Horison'
        },
        data() {
            return {
                model: MONTH,
            }
        },
        computed: {
            times() {
                const {y, m, d} = now();
                const loc = this.$store.state.location;
                const config = this.$store.state.prayer;
                const zone = loc.offset || 420;
                let list = calcPrayer(y, m, d, loc, config);
                return list.map(v => {
                    if (LABELS[v.name]) {
                        v.stime = moment(v.time).utcOffset(zone).format('HH:mm');
                        v.label = LABELS[v.name]
                        return v;
                    }
                    return false;
                }).filter(v => v);
            },
            latLon() {
                return Globe.fromLoc(this.$store.state.location).toString();
            },
            hijriyah() {
                const loc = this.$store.state.location || {};
                const criteria = this.$store.state.criteria || {};
                const info = {
                    ...this.model,
                    loc: {...loc},
                    criteria: {...criteria},
                    showNav: true,
                };
                return info;
            }
        },
        methods: {
            navClick(v) {
                this.model.year = v.year;
                this.model.month = v.month;
            }
        }
    }
</script>
