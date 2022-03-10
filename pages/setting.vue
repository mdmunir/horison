<template>
    <lte-content title="Setting">
        <lte-card title="Lokasi" buttons="collapse">
            <a-setting-location v-model="location" ref="loc" @modified="changeModified('loc',$event)"></a-setting-location>
            <template #footer>
                <button type="button" class="btn" @click="save('loc')" :class="btnClass('loc')">Simpan</button>
            </template>
        </lte-card>

        <lte-card title="Waktu Shalat" buttons="collapse">
            <a-setting-prayer v-model="prayer" ref="prayer" @modified="changeModified('prayer',$event)"></a-setting-prayer>
            <template #footer>
                <button type="button" class="btn" @click="save('prayer')" :class="btnClass('prayer')">Simpan</button>
            </template>
        </lte-card>

        <lte-card title="Kriteria Hilal" buttons="collapse">
            <a-setting-criteria v-model="criteria" ref="criteria" @modified="changeModified('criteria',$event)"></a-setting-criteria>
            <template #footer>
                <button type="button" class="btn" @click="save('criteria')" :class="btnClass('criteria')">Simpan</button>
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
                isModified:{},
                location: {},
                prayer: {},
                criteria: {},
            }
        },
        methods: {
            save(part){
                this.$refs[part].save();
            },
            btnClass(part) {
                return (this.isModified[part]) ? 'btn-primary' : 'btn-default';
            },
            changeModified(part, e){
                this.isModified[part] = e;
            }
        },
    }
</script>
