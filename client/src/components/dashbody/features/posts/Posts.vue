<template lang="html">
<div class="posts">
    <PostsList/>
    <router-view/>
</div>
</template>

<script>
import PostsList from './PostsList';

export default {
    name       : 'Posts',
    components : {
        PostsList
    },
    mounted() {
        this.$store.dispatch('setActiveFeature', 'posts');
    }
};
</script>

<style scoped lang="css">
.posts {
    display: flex;
    min-height: 0;
    flex: 1;
    padding: 10px;
}
</style>
