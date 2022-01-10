<template>
    <div class="wrapper">
        <div class="preloader flex-column justify-content-center align-items-center">
            <img class="animation__shake" src="dist/img/AdminLTELogo.png" alt="AdminLTELogo" height="60" width="60">
        </div>
        <lte-navbar></lte-navbar>
        <lte-sidebar ></lte-sidebar>
        <Nuxt></Nuxt>
        <lte-footer ></lte-footer>
    </div>
</template>