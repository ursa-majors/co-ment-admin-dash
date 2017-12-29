<template lang="html">
<div class="logs">
    <LogsList/>
    <router-view/>
</div>
</template>

<script>
import LogsList from './LogsList';

export default {
    name       : 'Logs',
    components : {
        LogsList
    },
    mounted() {
        this.$store.dispatch('setActiveFeature', 'logs');
    }
};
</script>

<style scoped lang="css">
.logs {
    display: flex;
    min-height: 0;
    flex: 1;
    padding: 10px;
}
</style>
