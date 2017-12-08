<template lang="html">
    <div class="dash-body">
        <DashBodyNav />
        <DashBodyList />
        <DashBodyDetail />
    </section>
</div>
</template>

<script>
    import DashBodyNav    from './DashBodyNav.vue';
    import DashBodyList   from './DashBodyList.vue';
    import DashBodyDetail from './DashBodyDetail.vue';

    export default {
        name: 'DashBody',
        components: {
            DashBodyNav,
            DashBodyList,
            DashBodyDetail
        }
    }
</script>

<style lang="css">
    .dash-body {
        display: flex;
        flex: 1;
        border-right: .35em solid #444;
    }
</style>
