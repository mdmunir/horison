<template>
    <div :class="['card', 'card-'+type]">
        <div class="card-header" v-if="showHeader">
            <h3 class="card-title" v-html="title"></h3>
            <div class="card-tools">
                <slot name="tools"></slot>
                <button v-for="btn in toolButtons" type="button" class="btn btn-tool" :data-card-widget="btn.func">
                    <i :class="btn.icon"></i>
                </button>
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
            buttons: String,
        },
        mounted() {
            let $card = $(this.$el);
            if ($card.hasClass('collapsed-card')) {
                $card.children('.card-header')
                    .find('[data-card-widget="collapse"]')
                    .html('<i class="fas fa-plus"></i>');
            }
            let th = this;
            const events = ['expanded', 'collapsed', 'maximized', 'minimized', 'removed'];
            events.forEach(function(name){
                $card.on(`${name}.lte.cardwidget`, function(){
                    th.$emit(name);
                    th.$emit('resize', name);
                });
            });
        },
        computed: {
            showHeader() {
                return this.$props.title || this.toolButtons.length || this.$slots.tools;
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
