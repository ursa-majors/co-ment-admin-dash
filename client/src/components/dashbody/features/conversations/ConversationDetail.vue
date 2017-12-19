<template lang="html">
<div class="conversation-detail">
    <textarea
        wrap="off"
        readonly="true"
    >{{ JSON.stringify(conversation, null, 2) }}
    </textarea>
</div>
</template>

<script>
import { getOneConversation } from '@/services/ConversationService';
import LS                   from '@/utils/localStorage';

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
    }
};
</script>

<style lang="css">
.conversation-detail {
    flex: 1;
    margin: 0 3px 3px;
}

.conversation-detail textarea {
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
