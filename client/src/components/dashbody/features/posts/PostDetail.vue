<template lang="html">
<div class="post-detail">
    <p>{{ JSON.stringify(post, null, 2) }}</p>
</div>
</template>

<script>
export default {
    name  : 'PostDetail',
    props : ['post']
};
</script>

<style lang="css">
.post-detail {
    flex: 1;
    margin-left: .5em;
}
.post-detail p {
    display: block;
    height: 100%;
    font-family: monospace;
    white-space: pre-wrap;
    overflow: auto;
}

.post-detail img {
    max-width: 100%;
}
</style>
