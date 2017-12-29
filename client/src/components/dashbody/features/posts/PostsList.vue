<template lang="html">
<div class="list-container">
    <ListNav @gotopage="getPosts"
        :numPages="numPages"
        :count="count"
        :total="total">
    </ListNav>

    <FeatureList>
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
    </FeatureList>
</div>
</template>

<script>
import { getAllPosts } from '@/services/PostService';
import LS              from '@/utils/localStorage';
import ListNav         from '@/components/dashbody/common/ListNav';
import FeatureList     from '@/components/dashbody/common/FeatureList';

export default {
    name: 'PostsList',
    data() {
        return {
            posts    : [],
            total    : null,
            numPages : null
        };
    },
    computed: {
        count() {
            return this.posts.length;
        }
    },
    methods: {

        /** HANDLE CARD CLICK
        *  Triggers route to render post detail component
        *  @param     {Object}   route   Destination route object
        *  @returns   {null}
        */
        navigateTo(route) {
            this.$router.push(route);
        },

        getPosts(pageNum) {
            const itemsPerPage = this.$store.state.itemsPerPage;
            const token = LS.getData('auth_token');
            const page  = pageNum || 1;
            const sort  = this.$route.query.sort;
            const skip  = (page - 1) * itemsPerPage;

            // getProfiles(token, sort, skip, limit)
            getAllPosts(token, sort, skip, itemsPerPage)
                .then(({ posts, total }) => {
                    this.posts = posts;
                    this.total = total;
                    this.numPages = Math.ceil(total / itemsPerPage);
                })
                .catch(err => new Error(err));
        }

    },
    components: {
        ListNav,
        FeatureList
    },
    mounted() {
        this.getPosts();
    }
};
</script>

<style scoped lang="css">
.list-container {
    min-height: 0;
    max-width: 320px;
    flex: 1;
    margin-right: .25em;
    overflow-y: auto;
    overflow-x: hidden;
}
</style>
