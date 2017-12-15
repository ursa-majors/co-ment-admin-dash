<template lang="html">
<div class="posts">
    <PostsList v-bind:posts="posts" v-on:post="getOnePost"/>
    <PostDetail v-bind:post="post" />
</div>
</template>

<script>
import { getPosts, getOnePost } from '@/services/PostService';
import LS         from '@/utils/localStorage';
import PostsList  from './PostsList';
import PostDetail from './PostDetail';

export default {
    name       : 'Posts',
    components : {
        PostsList,
        PostDetail
    },
    data() {
        return {
            posts : [],
            post  : {}
        };
    },
    methods: {

        /** GET ALL POSTS
         *  @returns  {null}
        */
        getPosts() {
            const token = LS.getData('auth_token');
            getPosts(token)
                .then((docs) => {
                    this.posts = docs;
                })
                .catch(err => new Error(err));
        },

        /** GET ONE POST
         *  @param    {String}  postId  Post _id emitted by PostsList component
         *  @returns  {null}
        */
        getOnePost(postId) {
            const token = LS.getData('auth_token');
            getOnePost(token, postId)
                .then((doc) => {
                    this.post = doc;
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
