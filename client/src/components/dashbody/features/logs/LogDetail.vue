<template lang="html">
<FeatureDetail>
    <textarea
        wrap="off"
        readonly="true"
    >{{ JSON.stringify(log, null, 2) }}
    </textarea>
</FeatureDetail>
</template>

<script>
import FeatureDetail from '@/components/dashbody/common/FeatureDetail';
import { getOneLog } from '@/services/LogService';
import LS            from '@/utils/localStorage';

export default {
    name: 'LogDetail',
    data() {
        return {
            log: {}
        };
    },
    watch: {
        $route: 'fetchLog'
    },
    methods: {

        /** GET ONE LOG
         *  Triggered on 1st mount and on changes to the route
        */
        fetchLog() {
            const token = LS.getData('auth_token');
            getOneLog(token, this.$route.params.logId)
                .then((doc) => {
                    this.log = doc;
                })
                .catch(err => new Error(err));
        }

    },
    mounted() {
        this.fetchLog();
    },
    components: {
        FeatureDetail
    }
};
</script>

<style lang="css">
</style>
