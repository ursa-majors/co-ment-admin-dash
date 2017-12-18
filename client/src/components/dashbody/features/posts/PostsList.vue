<template lang="html">
<div class="posts-list">
    <div class="card" v-for="(doc, index) in posts">
        <div @click="navigateTo({
                name: 'PostDetail',
                params: {
                    postId: doc._id
                }
            })">
            <p>Author: {{doc.author.username}}</p>
            <p>Title: {{doc.title}}</p>
            <p>_id: {{doc._id}}</p>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name    : 'PostsList',
    props   : ['posts'],
    methods : {

        /** HANDLE CARD CLICK
        *  Triggers route to render post detail component
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
.posts-list {
    box-sizing: border-box;
    min-height: 0;
    max-width: 50%;
    flex: 1;
    margin-right: .5em;
    overflow-y: auto;
    overflow-x: hidden;
}

.posts-list > div {
    background: white;
    border: 1px solid #a9a9a9;
    margin: 0 2px .75em 0;
    padding: .5em;
    cursor: pointer;
}

.posts-list > div:last-child {
    margin-bottom: 0;
}

.posts-list > div p {
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
