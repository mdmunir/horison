<template>
    <div class="content-wrapper">
        <div class="content-header" v-if="showHeader">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0">{{title}}</h1>
                    </div>
                </div>
            </div>
        </div>
        <section class="content">
            <div class="container-fluid">
                <slot></slot>
            </div>
        </section>
    </div>
</template>
<script>
    export default {
        props: ['title'],
        computed: {
            showHeader() {
                return this.$props.title || this.$props.title === '';
            }
        }
    }
</script>
