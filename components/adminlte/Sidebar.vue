<template>
    <aside class="main-sidebar sidebar-light-lightblue elevation-4">
        <!-- Brand Logo -->
        <nuxt-link to='/' class="brand-link">
            <img src="icon.png" alt="Horison Logo" class="brand-image img-circle elevation-3" style="opacity: .8">
            <span class="brand-text font-weight-light">HORISON</span>
        </nuxt-link>

        <!-- Sidebar -->
        <div class="sidebar">            
            <nav class="mt-2">
                <lte-menu class="nav nav-pills nav-sidebar flex-column"
                      data-widget="treeview" role="menu" data-accordion="false"
                      :items="items"></lte-menu>
            </nav>
        </div>
        <!-- /.sidebar -->
    </aside>
</template>
<script>
    import menus from '@/libs/menu.js'
    export default {
        data() {
            return {
                items: menus
            };
        },
        mounted() {
            $('[data-widget="treeview"]').Treeview('init');
        }
    }
</script>