<template lang="html">
    <div class="users-list">
        <div class="card" v-for="(doc, index) in users">
            <div @click="handleCardClicked(doc)">
                <p>Username: {{doc.username}}</p>
                <p>Name: {{doc.name || '{anon}'}}</p>
                <p>_id: {{doc._id}}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'UsersList',
    props: ['users'],
    methods: {

        /** HANDLE
         *  Route to link on nav button click - WIP
         *  @param     {String}   link   Collection name to route to
         *  @returns   {null}
        */
        handleCardClicked(user) {
            console.log('user card clicked', user._id);
            // this.$router.push({ path: `/dash/users/${user._id}` });
            this.$emit('user', user._id);
        },

    }
}
</script>

<style scoped lang="css">
    .users-list {
        min-height: 0;
        flex: 1;
        margin-right: .5em;
        overflow-y: auto;
        overflow-x: hidden;
    }

    .users-list > div {
        background: white;
        border: 1px solid #a9a9a9;
        margin: 0 2px .75em 0;
        padding: .5em;
    }

    .users-list > div:last-child {
        margin-bottom: 0;
    }

    .users-list > div p {
        color: black;
        margin: .15em 0;
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
