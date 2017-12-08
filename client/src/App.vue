<template>
    <div id="app" class="dash">
        <DashHeader />
        <DashBody />
        <DashFooter />

        <!-- <router-view/> -->
    </div>
</template>

<script>
    import DashHeader   from './components/Header.vue';
    import DashFooter   from './components/Footer.vue';
    import DashBody from './components/DashBody.vue';

    export default {
        name: 'app',
        components: {
            DashHeader,
            DashBody,
            DashFooter
        }
    };
</script>

<style>
    .dash {
        display: flex;
        min-height: 100vh;
        flex-direction: column;
        box-sizing: border-box;
    }

    .dash h1,
    .dash p {
        margin: 0;
    }

</style>
