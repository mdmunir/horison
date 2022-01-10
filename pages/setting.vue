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
                                       placeholder="Latitude" v-model="location.lat">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="longitude" class="col-sm-4 col-form-label">Longitude</label>
                            <div class="col-sm-8">
                                <input type="number" class="form-control" id="longitude"
                                       placeholder="Longitude" v-model="location.lon">
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="form-group row">
                            <label for="timezone" class="col-sm-4 col-form-label">Timezone</label>
                            <div class="col-sm-8">
                                <input type="number" class="form-control" id="timezone"
                                       placeholder="Timezone" v-model="location.timezone">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="height" class="col-sm-4 col-form-label">Ketinggian</label>
                            <div class="col-sm-8">
                                <input type="number" class="form-control" id="height"
                                       placeholder="Ketinggian" v-model="location.height">
                            </div>
                        </div>
                    </div>
                </div>
            </form>
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
                                       placeholder="Koreksi subuh" v-model="prayer.subuh">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="dzuhur" class="col-sm-4 col-form-label">Dzuhur</label>
                            <div class="col-sm-8">
                                <input type="number" class="form-control" id="dzuhur"
                                       placeholder="Koreksi dzuhur" v-model="prayer.dzuhur">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="ashar" class="col-sm-4 col-form-label">Ashar</label>
                            <div class="col-sm-8">
                                <input type="number" class="form-control" id="ashar"
                                       placeholder="Koreksi ashar" v-model="prayer.ashar">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="maghrib" class="col-sm-4 col-form-label">Maghrib</label>
                            <div class="col-sm-8">
                                <input type="number" class="form-control" id="maghrib"
                                       placeholder="Koreksi maghrib" v-model="prayer.maghrib">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="isya" class="col-sm-4 col-form-label">Isya</label>
                            <div class="col-sm-8">
                                <input type="number" class="form-control" id="isya"
                                       placeholder="Koreksi isya" v-model="prayer.isya">
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        Altitude matahari.
                        <div class="form-group row">
                            <label for="alt_subuh" class="col-sm-4 col-form-label">Altitude Subuh</label>
                            <div class="col-sm-8">
                                <input type="number" class="form-control" id="alt_subuh"
                                       placeholder="Altitude subuh" v-model="prayer.alt_subuh">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="alt_isya" class="col-sm-4 col-form-label">Altitude isya</label>
                            <div class="col-sm-8">
                                <input type="number" class="form-control" id="alt_isya"
                                       placeholder="Altitude isya" v-model="prayer.alt_isya">
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="offset-sm-4 col-sm-8">
                                <div class="form-check">
                                    <input type="checkbox" class="form-check-input" id="koreksi_height" v-model="prayer.height">
                                    <label class="form-check-label" for="koreksi_height">Koreksi ketinggian</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
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
        watch: {
            location: {
                deep: true,
                handler(value) {
                    this.$store.commit('location/change', value);
                }
            },
            prayer: {
                deep: true,
                handler(value) {
                    this.$store.commit('prayer/change', value);
                }
            },
        },
    }
</script>
