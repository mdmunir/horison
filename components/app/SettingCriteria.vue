<template>
    <form class="form-horizontal">
        <div class="row">
            <div class="col-sm-6">
                <div class="form-group row">
                    <label for="alt" class="col-4 col-form-label">Altitude</label>
                    <div class="col-8">
                        <input type="number" step="any" class="form-control" id="alt"
                               placeholder="Altitude" v-model.number="model.alt">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="elongation" class="col-4 col-form-label">Elongasi</label>
                    <div class="col-8">
                        <input type="number" step="any" class="form-control" id="elongation"
                               placeholder="Elongasi" v-model.number="model.elongation">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="age" class="col-4 col-form-label">Umur Bulan</label>
                    <div class="col-8">
                        <input type="number" step="any" class="form-control" id="age"
                               placeholder="" v-model.number="model.age">
                    </div>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="form-group row">
                    <label for="method_alt" class="col-4 col-form-label">Altitude</label>
                    <div class="col-8">
                        <select class="form-control" id="method_alt" v-model="model.method_alt">
                            <option value="g">Geosentris</option>
                            <option value="t">Toposentris</option>
                            <option value="a">Apparent</option>
                            <option value="au">Apparent Upper</option>
                            <option value="al">Apparent Lower</option>
                        </select>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="method_elongation" class="col-4 col-form-label">Elongasi</label>
                    <div class="col-8">
                        <select class="form-control" id="method_elongation" v-model="model.method_elongation">
                            <option value="g">Geosentris</option>
                            <option value="t">Toposentris</option>
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
                    alt: 2,
                    elongation: 3,
                    age: 8,
                    method_elongation: 'g',
                    method_alt: 'a',
                }, this.$store.state.criteria),
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
                    this.$store.commit('criteria/change', this.model);
                    this.modified = false;
                    this.$emit('modified', this.modified);
                }
            },
        }
    }
</script>