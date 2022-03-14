<template>
    <div class="modal fade">
        <div class="modal-dialog" :class="sizeClass">
            <div class="modal-content">
                <div class="modal-header" v-if="showHeader">
                    <h4 class="modal-title" v-html="title"></h4>
                    <slot name="buttons"></slot>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" v-if="closeBtn">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body"><slot></slot></div>
                <div class="modal-footer" :class="footerClass" v-if="$slots.footer"><slot name="footer"></slot></div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        created() {
//            const component = this.$mount();
//            document.querySelector('body').appendChild(component.$el);
        },
        props: {
            size: String,
            title: String,
            closeBtn: {
                type: Boolean,
                default: true,
            },
            footerClass: {},
        },
        mounted() {
            const events = ['show', 'shown', 'hide', 'hiden'];
            var vm = this;
            var $modal = $(this.$el);
            events.forEach(name => {
                $modal.on(`${name}.bs.modal`, function (e) {
                    vm.$emit(name, e);
                });
            });
        },
        computed: {
            showHeader() {
                return this.$props.title || this.$slots.buttons;
            },
            sizeClass() {
                return this.size ? 'modal-' + this.size : '';
            }
        },
        methods: {
            modal(opts) {
                $(this.$el).modal(opts || 'show');
            }
        },
    }
</script>
