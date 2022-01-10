<template>
    <lte-content :title="false">
        <lte-card title="Waktu Shalat">
            <table class="table">
                <tr v-for="item in prayerTimes">
                    <td>{{item.label}}</td>
                    <td>{{item.time}}</td>
                </tr>
            </table>
        </lte-card>
    </lte-content>
</template>

<script>
    import {PrayerTime, now, R2D, toGlobe} from '@/libs/horison';
    export default {
        head: {
            title: 'Horison'
        },
        computed: {
            prayerTimes() {
                const {y, m, d} = now();
                const loc = this.$store.state.location;
                const config = this.$store.state.prayer;
                const zone = loc.timezone || 0;
                const PT = new PrayerTime(y, m, config);
                return PT.calc(d, toGlobe(loc)).map(v => {
                    v.time = moment(v.date).utcOffset(zone).format('HH:mm');
                    return v;
                });
            }
        },
    }
</script>
