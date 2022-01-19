<template>
    <lte-content :title="false">
        <lte-card title="Waktu Shalat">
            <table class="table">
                <tr v-for="item in times">
                    <td>{{item.label}}</td>
                    <td style="text-align: right;">{{item.stime}}</td>
                </tr>
            </table>
        </lte-card>
    </lte-content>
</template>

<script>
    import {now} from '@/libs/horison';
    import calcPrayer from '@/libs/prayer';

    const LABELS = {
        subuh: 'Subuh',
        terbit: 'Terbit',
        dzuhur: 'Dzuhur',
        ashar: 'Ashar',
        maghrib: 'Maghrib',
        isya: 'Isya',
        tengah: 'Pertengahan Malam',
        pertiga: 'Sepertiga Malam Akhir',
    }
    export default {
        head: {
            title: 'Horison'
        },
        computed: {
            times() {
                const {y, m, d} = now();
                const loc = this.$store.state.location;
                const config = this.$store.state.prayer;
                const zone = loc.timezone;
                let list = calcPrayer(y, m, d, loc, config);
                return list.map(v => {
                    v.stime = moment(v.time).utcOffset(zone).format('HH:mm');
                    v.label = LABELS[v.name]
                    return v;
                });
            }
        },
    }
</script>
