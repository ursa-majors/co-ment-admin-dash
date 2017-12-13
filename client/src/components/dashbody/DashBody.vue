<template lang="html">
    <div class="dash-body">
        <DashBodyNav />
        <router-view/>
    </section>
</div>
</template>

<script>
    import DashBodyNav    from './DashBodyNav.vue';

    export default {
        name: 'DashBody',
        components: {
            DashBodyNav
        }
    }
</script>

<style lang="css">
    .dash-body {
        /*position: static;*/
        height: 0;
        display: flex;
        flex: 1 1 auto;
        border-right: .35em solid #444;
    }
</style>
