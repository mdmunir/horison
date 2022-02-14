<template>
    <div :class="['card', 'card-'+type]">
        <div class="card-header" v-if="showHeader">
            <h3 class="card-title" v-html="title"></h3>
            <div class="card-tools">
                <button v-for="btn in toolButtons" type="button" class="btn btn-tool" :data-card-widget="btn.func">
                    <i :class="btn.icon"></i>
                </button>
                <slot name="tools"></slot>
            </div>
        </div>
        <div class="card-body"><slot></slot></div>
        <div class="card-footer" v-if="showFooter"><slot name="footer"></slot></div>
    </div>
</template>
<script>
    const Buttons = {
        maximize: 'fas fa-expand',
        collapse: 'fas fa-minus',
        remove: 'fas fa-times'
    };
    export default {
        props: {
            type: {type: String, default: 'default'},
            title: String,
            buttons: String
        },
        computed: {
            showHeader() {
                return this.$props.title || this.$props.buttons || this.$slots.tools;
            },
            showFooter() {
                return this.$slots.footer;
            },
            toolButtons() {
                let bs = this.$props.buttons;
                if (typeof bs === 'string') {
                    bs = bs.split(/\s*,\s*/);
                }
                
                return bs ? bs.map(function (b) {
                    if (Buttons[b]) {
                        return {func: b, icon: Buttons[b]};
                    } else {
                        return false;
                    }
                }).filter((v) => v) : [];
            }
        }
    }
</script>
