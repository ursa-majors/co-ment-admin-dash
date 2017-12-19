<template lang="html">
<div class="connections-list">
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
</div>
</template>

<script>
export default {
    name    : 'ConnectionsList',
    props   : ['connections'],
    methods : {

        /** HANDLE CARD CLICK
        *  Triggers route to render connection detail component
        *  @param     {Object}   route   Destination route object
        *  @returns   {null}
        */
        navigateTo(route) {
            this.$router.push(route);
        }

    }
};
</script>

<style scoped lang="css">
.connections-list {
    box-sizing: border-box;
    min-height: 0;
    max-width: 50%;
    flex: 1;
    margin-right: .5em;
    overflow-y: auto;
    overflow-x: hidden;
}

.connections-list > div {
    background: white;
    border: 1px solid #a9a9a9;
    margin: 0 2px .75em 0;
    padding: .5em;
    cursor: pointer;
}

.connections-list > div:last-child {
    margin-bottom: 0;
}

.connections-list > div p {
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
