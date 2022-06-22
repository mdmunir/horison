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
            <li class="nav-item">
                <a class="nav-link" data-toggle="modal" data-target="#setting-modal" role="button">
                    <i class="fas fa-tools"></i>
                </a>
            </li>
        </ul>     
    </nav>
</template>

<script>
    export default {
        mounted() {
            let th = this;
            $('[data-widget="pushmenu"]').on('collapsed.lte.pushmenu shown.lte.pushmenu', function (e) {
                th.$nuxt.$emit('pushmenu-click', e.type);
            });
        }
    }
</script>