<template lang="html">
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
</template>

<script>
import FeatureList from '@/components/dashbody/common/FeatureList';
import parseDate   from '@/utils/parseDates';

export default {
    name     : 'LogsList',
    props    : ['logs'],
    computed : {
        total() {
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

        parseDate

    },
    components: {
        FeatureList
    }
};
</script>

<style lang="css">
</style>
