<template lang="html">
<FeatureList title="Posts" :total="total">
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
</template>

<script>
import FeatureList from '@/components/dashbody/common/FeatureList';

export default {
    name     : 'PostsList',
    props    : ['posts'],
    computed : {
        total() {
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
        }

    },
    components: {
        FeatureList
    }
};
</script>

<style lang="css">
</style>
