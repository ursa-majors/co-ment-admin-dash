<template lang="html">
<div class="posts-list">
    <div class="card" v-for="(doc, index) in posts">
        <div @click="handleCardClicked(doc)">
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

        /** HANDLE CARD CLICK EVENTS
         *  Route to link on nav button click - WIP
         *  @param     {String}   link   Collection name to route to
         *  @returns   {null}
        */
        handleCardClicked(post) {
            // this.$router.push({ path: `/dash/posts/${post._id}` });
            this.$emit('post', post._id);
        }

    }
};
</script>

<style scoped lang="css">
.posts-list {
    min-height: 0;
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
