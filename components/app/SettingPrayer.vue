<template>
    <form class="form-horizontal">
        <div class="row">
            <div class="col-sm-6">
                Koreksi waktu.
                <div class="form-group row">
                    <label for="subuh" class="col-4 col-form-label">Subuh</label>
                    <div class="col-8">
                        <input type="number" step="any" class="form-control" id="subuh"
                               placeholder="Koreksi subuh" v-model.number="model.subuh">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="terbit" class="col-4 col-form-label">Terbit</label>
                    <div class="col-8">
                        <input type="number" step="any" class="form-control" id="terbit"
                               placeholder="Koreksi terbit" v-model.number="model.terbit">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="dhuha" class="col-4 col-form-label">Dhuha</label>
                    <div class="col-8">
                        <input type="number" step="any" class="form-control" id="dhuha"
                               placeholder="Koreksi dhuha" v-model.number="model.dhuha">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="dzuhur" class="col-4 col-form-label">Dzuhur</label>
                    <div class="col-8">
                        <input type="number" step="any" class="form-control" id="dzuhur"
                               placeholder="Koreksi dzuhur" v-model.number="model.dzuhur">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="ashar" class="col-4 col-form-label">Ashar</label>
                    <div class="col-8">
                        <input type="number" step="any" class="form-control" id="ashar"
                               placeholder="Koreksi ashar" v-model.number="model.ashar">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="maghrib" class="col-4 col-form-label">Maghrib</label>
                    <div class="col-8">
                        <input type="number" step="any" class="form-control" id="maghrib"
                               placeholder="Koreksi maghrib" v-model.number="model.maghrib">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="isya" class="col-4 col-form-label">Isya</label>
                    <div class="col-8">
                        <input type="number" step="any" class="form-control" id="isya"
                               placeholder="Koreksi isya" v-model.number="model.isya">
                    </div>
                </div>
            </div>
            <div class="col-sm-6">
                Altitude matahari.
                <div class="form-group row">
                    <label for="alt_subuh" class="col-4 col-form-label">Altitude Subuh</label>
                    <div class="col-8">
                        <input type="number" step="any" class="form-control" id="alt_subuh"
                               placeholder="Altitude subuh" v-model.number="model.alt_subuh">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="alt_isya" class="col-4 col-form-label">Altitude isya</label>
                    <div class="col-8">
                        <input type="number" step="any" class="form-control" id="alt_isya"
                               placeholder="Altitude isya" v-model.number="model.alt_isya">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="alt_dhuha" class="col-4 col-form-label">Altitude dhuha</label>
                    <div class="col-8">
                        <input type="number" step="any" class="form-control" id="alt_dhuha"
                               placeholder="Altitude dhuha" v-model.number="model.alt_dhuha">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="alt_ashar" class="col-4 col-form-label">Waktu Ashar</label>
                    <div class="col-8">
                        <select class="form-control" id="alt_ashar" v-model="model.alt_ashar">
                            <option :value="1">Jumhur</option>
                            <option :value="2">Hanafy</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    </form>
</template>
<script>
    export default {
        props: ['value'],
        data() {
            return {
                model: Object.assign({
                    alt_subuh: -20,
                    alt_isya: -18,
                    alt_dhuha: 4.5,
                    alt_ashar: 1,
                    subuh: 2,
                    dhuha: 2,
                    dzuhur: 2,
                    ashar: 2,
                    maghrib: 2,
                    isya: 2,
                    terbit: -2,
                }, this.$store.state.prayer),
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
                    this.$store.commit('prayer/change', this.model);
                    this.modified = false;
                    this.$emit('modified', this.modified);
                }
            },
        }
    }
</script>