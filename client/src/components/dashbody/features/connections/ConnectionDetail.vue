<template lang="html">
<FeatureDetail>
    <textarea
        wrap="off"
        readonly="true"
    >{{ JSON.stringify(connection, null, 2) }}
    </textarea>
</FeatureDetail>
</template>

<script>
import FeatureDetail from '@/components/dashbody/common/FeatureDetail';
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
    },
    components: {
        FeatureDetail
    }
};
</script>

<style lang="css">
</style>
