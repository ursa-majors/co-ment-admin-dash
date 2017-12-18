<template lang="html">
<div class="users-list">
    <div class="card" v-for="(doc, index) in users">
        <div @click="navigateTo({
                name: 'UserDetail',
                params: {
                    userId: doc._id
                }
            })">
            <p>Username: {{doc.username}}</p>
            <p>Name: {{doc.name || '{anon}'}}</p>
            <p>_id: {{doc._id}}</p>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name    : 'UsersList',
    props   : ['users'],
    methods : {

        /** HANDLE CARD CLICK
        *  Triggers route to render user detail component
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
.users-list {
    box-sizing: border-box;
    min-height: 0;
    max-width: 50%;
    flex: 1;
    margin-right: 5px;
    overflow-y: auto;
    overflow-x: hidden;
}

.users-list > div {
    background: white;
    border: 1px solid #a9a9a9;
    margin: 0 2px .75em 0;
    padding: .5em;
    cursor: pointer;
}

.users-list > div:last-child {
    margin-bottom: 0;
}

.users-list > div p {
    color: black;
    margin: .15em 0;
}

</style>
