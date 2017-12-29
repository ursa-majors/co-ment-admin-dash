<template lang="html">
<div class="list-container">
    <ListNav @gotopage="getConversations"
        :numPages="numPages"
        :count="count"
        :total="total">
    </ListNav>

    <FeatureList>
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
</div>
</template>

<script>
import { getAllConversations } from '@/services/ConversationService';
import LS                      from '@/utils/localStorage';
import ListNav                 from '@/components/dashbody/common/ListNav';
import FeatureList             from '@/components/dashbody/common/FeatureList';

export default {
    name: 'ConversationsList',
    data() {
        return {
            conversations : [],
            total         : null,
            numPages      : null
        };
    },
    computed: {
        count() {
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

        getConversations(pageNum) {
            const itemsPerPage = this.$store.state.itemsPerPage;
            const token = LS.getData('auth_token');
            const page  = pageNum || 1;
            const sort  = this.$route.query.sort;
            const skip  = (page - 1) * itemsPerPage;

            // getAllConversations(token, sort, skip, limit)
            getAllConversations(token, sort, skip, itemsPerPage)
                .then(({ convos, total }) => {
                    this.conversations = convos;
                    this.total = total;
                    this.numPages = Math.ceil(total / itemsPerPage);
                })
                .catch(err => new Error(err));
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
        ListNav,
        FeatureList
    },
    mounted() {
        this.getConversations();
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
