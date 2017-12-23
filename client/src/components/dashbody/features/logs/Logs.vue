<template lang="html">
<div class="logs">
    <LogsList v-bind:logs="logs" />
    <router-view/>
</div>
</template>

<script>
import { getLogs } from '@/services/LogService';
import LS          from '@/utils/localStorage';
import LogsList    from './LogsList';

export default {
    name       : 'Logs',
    components : {
        LogsList
    },
    data() {
        return {
            logs: []
        };
    },
    methods: {

        getLogs() {
            const token = LS.getData('auth_token');
            getLogs(token)
                .then((docs) => {
                    this.logs = docs;
                })
                .catch(err => new Error(err));
        }

    },
    mounted() {
        this.getLogs();
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
