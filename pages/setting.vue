<template>
    <lte-content title="Setting">
        <lte-card title="Lokasi" buttons="collapse">
            <a-setting-location v-model="location" ref="loc" @modified="locModified=$event"></a-setting-location>
            <template #footer>
                <button type="button" class="btn" @click="saveLoc" :class="locBtnClass">Simpan</button>
            </template>
        </lte-card>

        <lte-card title="Waktu Shalat" buttons="collapse">
            <a-setting-prayer v-model="prayer" ref="prayer" @modified="prayerModified=$event"></a-setting-prayer>
            <template #footer>
                <button type="button" class="btn" @click='savePrayer' :class="prayerBtnClass">Simpan</button>
            </template>
        </lte-card>
    </lte-content>
</template>

<script>

    export default {
        head: {
            title: 'Setting'
        },
        data() {
            return {
                locModified: false,
                prayerModified: false,
                location:{},
                prayer: {},
            }
        },
        methods: {
            saveLoc() {
                this.$refs.loc.save();
            },
            savePrayer() {
                this.$refs.prayer.save();
            },
        },
        computed: {
            locBtnClass() {
                return (this.locModified) ? 'btn-primary' : 'btn-default';
            },
            prayerBtnClass() {
                return (this.prayerModified) ? 'btn-primary' : 'btn-default';
            },
        }
    }
</script>
