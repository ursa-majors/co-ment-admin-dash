<template>
    <div id="app" class="dash">
        <DashHeader />
        <DashBody />
        <DashFooter />
    </div>
</template>

<script>
import DashHeader from '@/components/Header';
import DashFooter from '@/components/Footer';
import DashBody   from '@/components/dashbody/DashBody';

export default {
    name       : 'Dash',
    components : {
        DashHeader,
        DashBody,
        DashFooter
    }
};
</script>

<style>
    .dash {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        height: 100vh;
    }

    .dash h1,
    .dash p {
        margin: 0;
    }

</style>
