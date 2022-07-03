<template>
    <div class="content-wrapper">
        <div class="content-header" v-if="showHeader">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0">{{title}}</h1>
                    </div>
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right" v-if="links && links.length ">
                            <li v-for="link in links" class="breadcrumb-item" :class="{active:link.active}">
                                <NuxtLink v-if='link.url' :to='link.url'>{{link.label}}</NuxtLink>
                                <template v-else>{{link.label}}</template>
                            </li>
                        </ol>
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
        props: {
            title:String,
            links:{
                type:Array,
                default(){
                    return [];
                }
            }
        },
        computed: {
            showHeader() {
                return this.$props.title || this.$props.title === '';
            }
        }
    }
</script>
