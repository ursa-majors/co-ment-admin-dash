<template lang="html">
<FeatureList :total="total">
    <div class="card" v-for="(doc, index) in connections">
        <div @click="navigateTo({
                name: 'ConnectionDetail',
                params: {
                    connectionId: doc._id
                }
            })">
            <p>Initiator: {{doc.initiator.name}}</p>
            <p>Mentor: {{doc.mentor.name}}</p>
            <p>Mentee: {{doc.mentee.name}}</p>
            <p>_id: {{doc._id}}</p>
        </div>
    </div>
</FeatureList>
</template>

<script>
import FeatureList from '@/components/dashbody/common/FeatureList';

export default {
    name     : 'ConnectionsList',
    props    : ['connections'],
    computed : {
        total() {
            return this.connections.length;
        }
    },
    methods: {

        /** HANDLE CARD CLICK
        *  Triggers route to render connection detail component
        *  @param     {Object}   route   Destination route object
        *  @returns   {null}
        */
        navigateTo(route) {
            this.$router.push(route);
        }

    },
    components: {
        FeatureList
    }
};
</script>

<style lang="css">
</style>
