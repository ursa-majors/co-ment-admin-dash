<template lang="html">
<div class="conversations-list">
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
</div>
</template>

<script>
export default {
    name    : 'ConversationsList',
    props   : ['conversations'],
    methods : {

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

    }
};
</script>

<style scoped lang="css">
.conversations-list {
    box-sizing: border-box;
    min-height: 0;
    max-width: 50%;
    flex: 1;
    margin-right: .5em;
    overflow-y: auto;
    overflow-x: hidden;
}

.conversations-list > div {
    background: white;
    border: 1px solid #a9a9a9;
    margin: 0 2px .75em 0;
    padding: .5em;
    cursor: pointer;
}

.conversations-list > div:last-child {
    margin-bottom: 0;
}

.conversations-list > div p {
    color: black;
    margin: .15em 0;
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
}

::-webkit-scrollbar {
    width: 5px;
    height: 5px;
}

::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background: rgba(112,112,112,0.7);
}

::-webkit-scrollbar-corner {
    display: none;
}
</style>
