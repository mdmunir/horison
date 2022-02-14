<template>
    <nav class="main-header navbar navbar-expand navbar-white navbar-light">
        <ul class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
            </li>
            <li class="nav-item d-inline-block d-sm-none">
                <NuxtLink to="/" class="nav-link">Home</nuxtlink>
            </li>
        </ul>

        <ul class="navbar-nav ml-auto">
            <li class="nav-item" v-if="updated">
                <a class="nav-link" href="#" role="button" @click="update">
                    <i class="fas fa-sync-alt"></i>
                </a>
            </li>
        </ul>
    </nav>
</template>
<script>
    export default {
        data() {
            return {
                updated: false,
            }
        },
        async mounted() {
            const vm = this;
            const workbox = await window.$workbox;
            if (workbox) {
                workbox.addEventListener('installed', (event) => {
                    if (event.isUpdate) {
                        vm.updated = true;
                    }
                });
            }
        },
        methods: {
            update() {
                window.location.reload();
            }
        },
    }
</script>