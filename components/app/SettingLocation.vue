<template>
    <form class="form-horizontal">
        <div class="row">
            <div class="col-sm-6">
                <div class="form-group row">
                    <label for="location" class="col-4 col-form-label">Lokasi</label>
                    <div class="col-8">
                        <select2 class="form-control" id="location"
                                 v-model="model.id" @selection="locationChange"
                                 :options="locations">
                        </select2>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="latitude" class="col-4 col-form-label">Latitude</label>
                    <div class="col-8">
                        <input type="number" step="any" class="form-control" id="latitude"
                               placeholder="Latitude" v-model.number="model.lat">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="longitude" class="col-4 col-form-label">Longitude</label>
                    <div class="col-8">
                        <input type="number" step="any" class="form-control" id="longitude"
                               placeholder="Longitude" v-model.number="model.lon">
                    </div>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="form-group row">
                    <label for="timezone" class="col-4 col-form-label">Timezone</label>
                    <div class="col-8">
                        <select2 id='timezone' v-model='model.timezone' :options="timezones"
                                 class="form-control" @selection="timezoneChange"></select2>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="height" class="col-4 col-form-label">Ketinggian</label>
                    <div class="col-8">
                        <input type="number" step="any" class="form-control" id="height"
                               placeholder="Ketinggian" v-model.number="model.height">
                    </div>
                </div>
            </div>
        </div>
    </form>
</template>
<script>
    import locations from '@/libs/location2';
    import timezones from '@/libs/timezone';

    export default {
        props: ['value'],
        data() {
            return {
                model: Object.assign({
                    id: 163,
                    name: '',
                    lat: -6.170167,
                    lon: 106.831,
                    timezone: 'Asia/Jakarta',
                    offset: 420,
                    height: 10,
                }, this.$store.state.location),
                locations: locations,
                timezones: timezones,
                modified: false,
            }
        },
        watch: {
            value: {
                deep: true,
                handler(v) {
                    Object.assign(this.model, v);
                }
            },
            model: {
                deep: true,
                handler(v) {
                    this.modified = true;
                    this.$emit('modified', this.modified);
                    this.$emit('input', v);
                }
            },
        },
        methods: {
            save() {
                if (this.modified) {
                    this.$store.commit('location/change', this.model);
                    this.modified = false;
                    this.$emit('modified', this.modified);
                }
            },
            locationChange(v) {
                if (v) {
                    this.model.name = v.name,
                        this.model.lon = v.lon;
                    this.model.lat = v.lat;
                    this.model.timezone = v.zone_name;
                }
            },
            timezoneChange(v) {
                if (v) {
                    this.model.offset = v.offset;
                }
            }
        }
    }
</script>