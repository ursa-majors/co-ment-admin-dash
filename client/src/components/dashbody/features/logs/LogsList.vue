<template lang="html">
<div class="list-container">
    <ListNav @gotopage="getLogs"
        :numPages="numPages"
        :count="count"
        :total="total">
    </ListNav>

    <FeatureList :total="total">
        <div class="card" v-for="(doc, index) in logs">
            <div @click="navigateTo({
                    name: 'LogDetail',
                    params: {
                        logId: doc._id
                    }
                })">
                <p>Date: {{parseDate(doc.createdAt)}}</p>
                <p>Category: {{doc.category}}</p>
                <p>Action: {{doc.actionTaken}}</p>
                <p>_id: {{doc._id}}</p>
            </div>
        </div>
    </FeatureList>
</div>
</template>

<script>
import { getAllLogs } from '@/services/LogService';
import LS             from '@/utils/localStorage';
import ListNav        from '@/components/dashbody/common/ListNav';
import FeatureList    from '@/components/dashbody/common/FeatureList';
import parseDate      from '@/utils/parseDates';

export default {
    name: 'LogsList',
    data() {
        return {
            logs     : [],
            total    : null,
            numPages : null
        };
    },
    computed: {
        count() {
            return this.logs.length;
        }
    },
    methods: {

        /** ROUTE NAVIGATION CLICK HANDLER
         *  @param     {Object}   route   Destination route object
         *  @returns   {null}
        */
        navigateTo(route) {
            this.$router.push(route);
        },

        getLogs(pageNum) {
            const itemsPerPage = this.$store.state.itemsPerPage;
            const token = LS.getData('auth_token');
            const page  = pageNum || 1;
            const sort  = this.$route.query.sort;
            const skip  = (page - 1) * itemsPerPage;

            // getAllLogs(token, sort, skip, limit)
            getAllLogs(token, sort, skip, itemsPerPage)
                .then(({ logs, total }) => {
                    this.logs = logs;
                    this.total = total;
                    this.numPages = Math.ceil(total / itemsPerPage);
                })
                .catch(err => new Error(err));
        },

        parseDate

    },
    components: {
        ListNav,
        FeatureList
    },
    mounted() {
        this.getLogs();
    }
};
</script>

<style scoped lang="css">
.list-container {
    min-height: 0;
    max-width: 320px;
    flex: 1;
    margin-right: .25em;
    overflow-y: auto;
    overflow-x: hidden;
}
</style>
