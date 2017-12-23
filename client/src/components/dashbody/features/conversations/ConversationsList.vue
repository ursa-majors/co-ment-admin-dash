<template lang="html">
<FeatureList :total="total">
    <div class="card" v-for="(doc, index) in conversations">
        <div @click="navigateTo({
                name: 'ConversationDetail',
                params: {
                    conversationId: doc._id
                }
            })">
            <p>Participants: {{mapParticipants(doc.participants)}}</p>
            <p>Subject: {{doc.subject}}</p>
            <p>_id: {{doc._id}}</p>
        </div>
    </div>
</FeatureList>
</template>

<script>
import FeatureList from '@/components/dashbody/common/FeatureList';

export default {
    name     : 'ConversationsList',
    props    : ['conversations'],
    computed : {
        total() {
            return this.conversations.length;
        }
    },
    methods: {

        /** HANDLE CARD CLICK
        *  Triggers route to render conversation detail component
        *  @param     {Object}   route   Destination route object
        *  @returns   {null}
        */
        navigateTo(route) {
            this.$router.push(route);
        },

        /** MAP PARTICIPANTS
         *  Creates formatted string from participants array
         *  @param    {Array}   parts  Array of participants from Conversation
         *  @returns  {String}         Participants separated by comma
        */
        mapParticipants(parts) {
            return parts
                .map(p => p.username)
                .join(', ');
        }

    },
    components: {
        FeatureList
    }
};
</script>

<style lang="css">
</style>
