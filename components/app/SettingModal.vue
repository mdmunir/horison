<template>
    <lte-modal title="Setting" size="lg">
        <lte-card title="Lokasi" buttons="collapse" class="collapsed-card">
            <a-setting-location v-model="location" ref="loc" @modified="changeModified('loc',$event)"></a-setting-location>
            <template #footer>
                <button type="button" class="btn" @click="save('loc')" :class="btnClass('loc')">Simpan</button>
            </template>
        </lte-card>

        <lte-card title="Waktu Shalat" buttons="collapse" class="collapsed-card">
            <a-setting-prayer v-model="prayer" ref="prayer" @modified="changeModified('prayer',$event)"></a-setting-prayer>
            <template #footer>
                <button type="button" class="btn" @click="save('prayer')" :class="btnClass('prayer')">Simpan</button>
            </template>
        </lte-card>

        <lte-card title="Kriteria Hilal" buttons="collapse" class="collapsed-card">
            <a-setting-criteria v-model="criteria" ref="criteria" @modified="changeModified('criteria',$event)"></a-setting-criteria>
            <template #footer>
                <button type="button" class="btn" @click="save('criteria')" :class="btnClass('criteria')">Simpan</button>
            </template>
        </lte-card>
    </lte-modal>
</template>

<script>
    export default {
        data() {
            return {
                isModified: {
                    loc: false,
                    prayer: false,
                    criteria: false,
                },
                location: {},
                prayer: {},
                criteria: {},
            }
        },
        methods: {
            save(part) {
                this.$refs[part].save();
            },
            btnClass(part) {
                return (this.isModified[part]) ? 'btn-primary' : 'btn-default';
            },
            changeModified(part, e) {
                this.isModified[part] = e;
            }
        },
    }
</script>