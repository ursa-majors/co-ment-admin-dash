<template lang="html">
    <div class="dash-body">
        <DashBodyNav />
        <router-view/>
    </div>
</div>
</template>

<script>
    import DashBodyNav from './DashBodyNav.vue';

    export default {
        name: 'DashBody',
        components: {
            DashBodyNav
        }
    }
</script>

<style lang="css">
    .dash-body {
        border-right: .35em solid #444;
        display: flex;
        flex: 1 1 auto;
        height: 0;
    }
</style>
