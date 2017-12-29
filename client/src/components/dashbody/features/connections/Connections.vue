<template lang="html">
<div class="connections">
    <ConnectionsList/>
    <router-view/>
</div>
</template>

<script>
import ConnectionsList from './ConnectionsList';

export default {
    name       : 'Connections',
    components : {
        ConnectionsList
    },
    mounted() {
        this.$store.dispatch('setActiveFeature', 'connections');
    }
};
</script>

<style scoped lang="css">
.connections {
    display: flex;
    min-height: 0;
    flex: 1;
    padding: 10px;
}
</style>
