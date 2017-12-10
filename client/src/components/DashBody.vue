<template lang="html">
    <div class="dash-body">
        <DashBodyNav />
        <DashBodyList v-bind:documents="documents" />
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
        },
        props: ['documents']
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
