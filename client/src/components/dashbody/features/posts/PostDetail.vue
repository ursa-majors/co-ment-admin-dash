<template lang="html">
<FeatureDetail>
    <textarea
        wrap="off"
        readonly="true"
    >{{ JSON.stringify(post, null, 2) }}
    </textarea>
</FeatureDetail>
</template>

<script>
import FeatureDetail  from '@/components/dashbody/common/FeatureDetail';
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
    },
    components: {
        FeatureDetail
    }
};
</script>

<style lang="css">
</style>
