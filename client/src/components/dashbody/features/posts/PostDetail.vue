<template lang="html">
<div class="post-detail">
    <textarea
        wrap="off"
        readonly="true"
    >{{ JSON.stringify(post, null, 2) }}
    </textarea>
</div>
</template>

<script>
import { getOnePost } from '@/services/PostService';
import LS             from '@/utils/localStorage';

export default {
    name: 'PostDetail',
    data() {
        return {
            post: {}
        };
    },
    watch: {
        $route: 'fetchPost'
    },
    methods: {

        /** GET ONE POST
         *  Triggered on 1st mount and on changes to the route
        */
        fetchPost() {
            const token = LS.getData('auth_token');
            getOnePost(token, this.$route.params.postId)
                .then((doc) => {
                    this.post = doc;
                })
                .catch(err => new Error(err));
        }

    },
    mounted() {
        this.fetchPost();
    }
};
</script>

<style lang="css">
.post-detail {
    flex: 1;
    margin: 0 3px 3px;
}

.post-detail textarea {
    background: black;
    border: none;
    color: white;
    font-family: monospace;
    font-size: 10px;
    height: 100%;
    resize: none;
    outline: none;
    overflow: auto;
    width: 100%;
}
</style>
