<template>
    <lte-content title="Setting">
        <lte-card title="Lokasi" buttons="collapse">
            <form class="form-horizontal">
                <div class="row">
                    <div class="col-sm-6">
                        <div class="form-group row">
                            <label for="latitude" class="col-sm-4 col-form-label">Latitude</label>
                            <div class="col-sm-8">
                                <input type="number" class="form-control" id="latitude"
                                       placeholder="Latitude" v-model.number="location.lat">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="longitude" class="col-sm-4 col-form-label">Longitude</label>
                            <div class="col-sm-8">
                                <input type="number" class="form-control" id="longitude"
                                       placeholder="Longitude" v-model.number="location.lon">
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="form-group row">
                            <label for="timezone" class="col-sm-4 col-form-label">Timezone</label>
                            <div class="col-sm-8">
                                <input type="number" class="form-control" id="timezone"
                                       placeholder="Timezone" v-model.number="location.timezone">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="height" class="col-sm-4 col-form-label">Ketinggian</label>
                            <div class="col-sm-8">
                                <input type="number" class="form-control" id="height"
                                       placeholder="Ketinggian" v-model.number="location.height">
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <template #footer>
                <button type="button" class="btn btn-primary" @click='saveLoc'>Simpan</button>
            </template>
        </lte-card>

        <lte-card title="Waktu Shalat" buttons="collapse">
            <form class="form-horizontal">
                <div class="row">
                    <div class="col-sm-6">
                        Koreksi waktu.
                        <div class="form-group row">
                            <label for="subuh" class="col-sm-4 col-form-label">Subuh</label>
                            <div class="col-sm-8">
                                <input type="number" class="form-control" id="subuh"
                                       placeholder="Koreksi subuh" v-model.number="prayer.subuh">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="terbit" class="col-sm-4 col-form-label">Terbit</label>
                            <div class="col-sm-8">
                                <input type="number" class="form-control" id="terbit"
                                       placeholder="Koreksi terbit" v-model.number="prayer.terbit">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="dzuhur" class="col-sm-4 col-form-label">Dzuhur</label>
                            <div class="col-sm-8">
                                <input type="number" class="form-control" id="dzuhur"
                                       placeholder="Koreksi dzuhur" v-model.number="prayer.dzuhur">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="ashar" class="col-sm-4 col-form-label">Ashar</label>
                            <div class="col-sm-8">
                                <input type="number" class="form-control" id="ashar"
                                       placeholder="Koreksi ashar" v-model.number="prayer.ashar">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="maghrib" class="col-sm-4 col-form-label">Maghrib</label>
                            <div class="col-sm-8">
                                <input type="number" class="form-control" id="maghrib"
                                       placeholder="Koreksi maghrib" v-model.number="prayer.maghrib">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="isya" class="col-sm-4 col-form-label">Isya</label>
                            <div class="col-sm-8">
                                <input type="number" class="form-control" id="isya"
                                       placeholder="Koreksi isya" v-model.number="prayer.isya">
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        Altitude matahari.
                        <div class="form-group row">
                            <label for="alt_subuh" class="col-sm-4 col-form-label">Altitude Subuh</label>
                            <div class="col-sm-8">
                                <input type="number" class="form-control" id="alt_subuh"
                                       placeholder="Altitude subuh" v-model.number="prayer.alt_subuh">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="alt_isya" class="col-sm-4 col-form-label">Altitude isya</label>
                            <div class="col-sm-8">
                                <input type="number" class="form-control" id="alt_isya"
                                       placeholder="Altitude isya" v-model.number="prayer.alt_isya">
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <template #footer>
                <button type="button" class="btn btn-primary" @click='savePrayer'>Simpan</button>
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
                location: Object.assign({}, this.$store.state.location),
                prayer: Object.assign({}, this.$store.state.prayer),
            }
        },
        methods:{
            saveLoc(){
                this.$store.commit('location/change', this.location);
            },
            savePrayer(){
                this.$store.commit('prayer/change', this.prayer);
            },
        },
    }
</script>
