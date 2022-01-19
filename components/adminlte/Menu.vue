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
    function _isChildActive(items, path) {
        let active = false;
        for (let i in items) {
            if ((items[i].url && items[i].url == path) || (items[i].children && _isChildActive(items[i].children, path))) {
                active = true;
                break;
            }
        }
        return active;
    }

    export default {
        computed: {
            isChildActive() {
                return _isChildActive(this.items, this.$route.path);
            }
        },
        props: ['items'],
        methods: {
            isExternalLink(url) {
                return !url || (url.match(/^http(s)?:\/\//))
            },
            isHeader(item) {
                return typeof item !== 'object';
            },
            isActive(item) {
                return (item.url == this.$route.path) ||
                    (item.children && _isChildActive(item.children, this.$route.path));
            },
        },
    }
</script>