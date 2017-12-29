<template lang="html">
<div class="list-container">
    <ListNav @gotopage="getUsers"
        :numPages="numPages"
        :count="count"
        :total="total">
    </ListNav>

    <FeatureList>
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
</div>
</template>

<script>
import { getAllProfiles } from '@/services/ProfileService';
import LS              from '@/utils/localStorage';
import ListNav         from '@/components/dashbody/common/ListNav';
import FeatureList     from '@/components/dashbody/common/FeatureList';

export default {
    name: 'UsersList',
    data() {
        return {
            users    : [],
            total    : null,
            numPages : null
        };
    },
    computed: {
        count() {
            return this.users.length;
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

        getUsers(pageNum) {
            const itemsPerPage = this.$store.state.itemsPerPage;
            const token = LS.getData('auth_token');
            const page  = pageNum || 1;
            const sort  = this.$route.query.sort;
            const skip  = (page - 1) * itemsPerPage;

            // getAllProfiles(token, sort, skip, limit)
            getAllProfiles(token, sort, skip, itemsPerPage)
                .then(({ users, total }) => {
                    this.users = users;
                    this.total = total;
                    this.numPages = Math.ceil(total / itemsPerPage);
                })
                .catch(err => new Error(err));
        }

    },
    mounted() {
        this.getUsers();
    },
    components: {
        ListNav,
        FeatureList
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
