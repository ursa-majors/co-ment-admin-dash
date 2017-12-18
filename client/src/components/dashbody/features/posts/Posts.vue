<template lang="html">
<div class="posts">
    <PostsList v-bind:posts="posts" />
    <router-view/>
</div>
</template>

<script>
import { getPosts } from '@/services/PostService';
import LS         from '@/utils/localStorage';
import PostsList  from './PostsList';

export default {
    name       : 'Posts',
    components : {
        PostsList
    },
    data() {
        return {
            posts: []
        };
    },
    methods: {

        getPosts() {
            const token = LS.getData('auth_token');
            getPosts(token)
                .then((docs) => {
                    this.posts = docs;
                })
                .catch(err => new Error(err));
        }

    },
    mounted() {
        this.getPosts();
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
