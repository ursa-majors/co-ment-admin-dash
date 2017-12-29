<template lang="html">
<FeatureDetail>
    <textarea
        wrap="off"
        readonly="true"
    >{{ JSON.stringify(conversation, null, 2) }}
    </textarea>
</FeatureDetail>
</template>

<script>
import FeatureDetail          from '@/components/dashbody/common/FeatureDetail';
import { getOneConversation } from '@/services/ConversationService';
import LS                     from '@/utils/localStorage';

export default {
    name: 'ConversationDetail',
    data() {
        return {
            conversation: {}
        };
    },
    watch: {
        $route: 'fetchConversation'
    },
    methods: {

        /** GET ONE CONNECTION
         *  Triggered on 1st mount and on changes to the route
        */
        fetchConversation() {
            const token = LS.getData('auth_token');
            getOneConversation(token, this.$route.params.conversationId)
                .then((doc) => {
                    this.conversation = doc;
                })
                .catch(err => new Error(err));
        }

    },
    mounted() {
        this.fetchConversation();
    },
    components: {
        FeatureDetail
    }
};
</script>

<style lang="css">
</style>
