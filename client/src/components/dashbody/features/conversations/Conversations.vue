<template lang="html">
<div class="conversations">
    <ConversationsList v-bind:conversations="conversations" />
    <router-view/>
</div>
</template>

<script>
import { getConversations } from '@/services/ConversationService';
import LS                   from '@/utils/localStorage';
import ConversationsList    from './ConversationsList';

export default {
    name       : 'Conversations',
    components : {
        ConversationsList
    },
    data() {
        return {
            conversations: []
        };
    },
    methods: {

        getConversations() {
            const token = LS.getData('auth_token');
            getConversations(token)
                .then((docs) => {
                    this.conversations = docs;
                })
                .catch(err => new Error(err));
        }

    },
    mounted() {
        this.getConversations();
    }
};
</script>

<style scoped lang="css">
.conversations {
    display: flex;
    min-height: 0;
    flex: 1;
    padding: 10px;
}
</style>
