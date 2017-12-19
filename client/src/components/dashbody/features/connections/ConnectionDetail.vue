<template lang="html">
<div class="connection-detail">
    <textarea
        wrap="off"
        readonly="true"
    >{{ JSON.stringify(connection, null, 2) }}
    </textarea>
</div>
</template>

<script>
import { getOneConnection } from '@/services/ConnectionService';
import LS                   from '@/utils/localStorage';

export default {
    name: 'ConnectionDetail',
    data() {
        return {
            connection: {}
        };
    },
    watch: {
        $route: 'fetchConnection'
    },
    methods: {

        /** GET ONE CONNECTION
         *  Triggered on 1st mount and on changes to the route
        */
        fetchConnection() {
            const token = LS.getData('auth_token');
            getOneConnection(token, this.$route.params.connectionId)
                .then((doc) => {
                    this.connection = doc;
                })
                .catch(err => new Error(err));
        }

    },
    mounted() {
        this.fetchConnection();
    }
};
</script>

<style lang="css">
.connection-detail {
    flex: 1;
    margin: 0 3px 3px;
}

.connection-detail textarea {
    background: black;
    border: none;
    color: white;
    font-family: monospace;
    font-size: 10px;
    height: 100%;
    resize: none;
    outline: none;
    overflow: auto;
    width: 100%;
}
</style>
