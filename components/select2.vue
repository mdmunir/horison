<template>
    <select><slot></slot></select>
</template>
<script>

    const EVENTS = ['closing', 'close', 'opening', 'open', 'clearing', 'clear'];
    export default {
        props: {
            settings: {
                type: Object,
                default: () => {
                },
            },
            options: {
                type: Array,
                default: () => [],
            },
            value: null,
            multiple: Boolean,
        },
        data() {
            return {
                select2: null,
                state:true,
            };
        },
        mounted() {
            var vm = this;
            this.select2 = $(this.$el).select2({
                ...this.settings,
                multiple: this.multiple,
                data: this.options,
            }).val(this.value);
            this.select2
                .trigger("change")
                .on('change', function(){
                    vm.$emit('selection', vm.selection());
                })
                .on("select2:select select2:unselect", function (ev) {
                    vm.state = false;
                    vm.$emit("input", vm.select2.val());
                    vm.$emit('select', ev.params.data);
                    vm.$emit('selection', vm.selection());
                });
            EVENTS.forEach((name) => {
                vm.select2.on(`select2:${name}`, (ev) => {
                    vm.$emit(name, ev);
                });
            });
        },
        watch: {
            value(v) {
                this.setValue(v);
            },
            options(val) {
                this.setOption(val);
            }
        },
        methods: {
            selection() {
                let data = this.select2.select2('data');
                return this.multiple ? data : data[0];
            },
            setValue(v) {
                this.select2.val(v);
                if(this.state){
                    this.select2.trigger("change");
                }
                this.state = true;
            },
            setOption(val) {
                this.select2.empty().select2({
                    ...this.settings,
                    multiple: this.multiple,
                    data: val,
                });
                this.setValue(this.value);
            },
        },
        destroyed() {
            this.select2.off().select2("destroy");
        },
    }
</script>