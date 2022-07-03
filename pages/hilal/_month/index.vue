<template>
    <div class="row">
        <div class="col-md-6 col-12">
            <lte-card title="Info" >
                {{monthName}}
            </lte-card>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            hilal: Object,
            year: Number,
            month: Number,
            monthName: String,
        },
    }
</script>
