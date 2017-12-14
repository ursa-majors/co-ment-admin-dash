<template lang="html">
<div class="user-detail">
    <p>{{ JSON.stringify(user, null, 2) }}</p>
</div>
</template>

<script>
export default {
    name: 'UserDetail',
    props: ['user']
}
</script>

<style lang="css">
.user-detail {
    flex: 1;
    margin-left: .5em;
}
.user-detail p {
    display: block;
    height: 100%;
    font-family: monospace;
    white-space: pre-wrap;
    overflow: auto;
}

.user-detail img {
    max-width: 100%;
}
</style>
