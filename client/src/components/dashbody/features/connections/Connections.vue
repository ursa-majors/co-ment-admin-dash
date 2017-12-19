<template lang="html">
<div class="connections">
    <ConnectionsList v-bind:connections="connections" />
    <router-view/>
</div>
</template>

<script>
import { getConnections } from '@/services/ConnectionService';
import LS                 from '@/utils/localStorage';
import ConnectionsList    from './ConnectionsList';

export default {
    name       : 'Connections',
    components : {
        ConnectionsList
    },
    data() {
        return {
            connections: []
        };
    },
    methods: {

        getConnections() {
            const token = LS.getData('auth_token');
            getConnections(token)
                .then((docs) => {
                    this.connections = docs;
                })
                .catch(err => new Error(err));
        }

    },
    mounted() {
        this.getConnections();
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
