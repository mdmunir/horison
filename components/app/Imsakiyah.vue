<template>
    <table class="table">
        <tr v-for="item in prayerTimes">
            <td></td>
            <td></td>
        </tr>
    </table>
</template>

<script>
    import {PrayerTime, now, R2D, toGlobe} from '@/libs/horison';
    export default {
            data(){

            },
        props: {
            date:{
                default: new Date()
            },

        },
        computed: {
            prayerTimes() {
                const {y, m, d} = now();

            }
        }
    }
</script>
