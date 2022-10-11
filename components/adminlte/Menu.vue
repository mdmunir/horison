<template>
    <ul>
        <li v-for="item in items" :class="isHeader(item) ? 'nav-header':'nav-item'">
            <template v-if="isHeader(item)">
                {{item}}
            </template>
            <template v-else>
                <a :href="item.url ? item.url : '#'" class="nav-link" v-if="isExternalLink(item.url)">
                    <i :class="item.icon" v-if="item.icon"></i>
                    <p>{{item.label}}
                        <i class="right fas fa-angle-left" v-if="item.children && item.children.length"></i>
                        <span :class="['badge', 'right', 'badge-'+item.badge.type]" v-if="item.badge">{{item.badge.text}}</span>
                    </p>
                </a>
                <NuxtLink :to="item.url" :class="{'nav-link':true,'active':isActive(item)}" v-else>
                    <i :class="item.icon" v-if="item.icon"></i>
                    <p>{{item.label}}
                        <i class="right fas fa-angle-left" v-if="item.children && item.children.length"></i>
                        <span :class="['badge', 'right', 'badge-'+item.badge.type]" v-if="item.badge">{{item.badge.text}}</span>
                    </p>
                </NuxtLink>
                <lte-menu v-if="item.children" :items="item.children" class="nav nav-treeview"></lte-menu>
            </template>
        </li>
    </ul>
</template>
<script>
    function isActive(item, route){
        let active = item.url == route.path
            || (item.name && item.name==route.name)
            || (item.names && item.names.includes(route.name));
        if(!active && item.children){
            for(let i in item.children){
                if(isActive(item.children[i], route)){
                    return true;
                }
            }
        }
        return active;
    }

    export default {
        props: ['items'],
        methods: {
            isExternalLink(url) {
                return !url || (url.match(/^http(s)?:\/\//))
            },
            isHeader(item) {
                return typeof item !== 'object';
            },
            isActive(item) {
                return isActive(item, this.$route);
            },
        },
    }
</script>