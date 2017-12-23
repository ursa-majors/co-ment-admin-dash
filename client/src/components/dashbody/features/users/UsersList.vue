<template lang="html">
    <FeatureList title="Users" :total="total">
        <div class="card" v-for="(doc, index) in users">
            <div @click="navigateTo({
                    name: 'UserDetail',
                    params: {
                        userId: doc._id
                    }
                })">
                <p>Username: {{doc.username}}</p>
                <p>Name: {{doc.name || '{anon}'}}</p>
                <p>_id: {{doc._id}}</p>
            </div>
        </div>
    </FeatureList>
</template>

<script>
import FeatureList from '@/components/dashbody/common/FeatureList';

export default {
    name     : 'UsersList',
    props    : ['users'],
    computed : {
        total() {
            return this.users.length;
        }
    },
    methods: {

        /** HANDLE CARD CLICK
        *  Triggers route to render user detail component
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
