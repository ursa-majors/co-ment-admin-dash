<template lang="html">
<div class="list-container">
    <ListNav @gotopage="getConnections"
        :numPages="numPages"
        :count="count"
        :total="total">
    </ListNav>

    <FeatureList>
        <div class="card" v-for="(doc, index) in connections">
            <div @click="navigateTo({
                    name: 'ConnectionDetail',
                    params: {
                        connectionId: doc._id
                    }
                })">
                <p>Initiator: {{doc.initiator.name}}</p>
                <p>Mentor: {{doc.mentor.name}}</p>
                <p>Mentee: {{doc.mentee.name}}</p>
                <p>_id: {{doc._id}}</p>
            </div>
        </div>
    </FeatureList>
</div>
</template>

<script>
import { getAllConnections } from '@/services/ConnectionService';
import LS                    from '@/utils/localStorage';
import ListNav               from '@/components/dashbody/common/ListNav';
import FeatureList           from '@/components/dashbody/common/FeatureList';

export default {
    name: 'ConnectionsList',
    data() {
        return {
            connections : [],
            total       : null,
            numPages    : null
        };
    },
    computed: {
        count() {
            return this.connections.length;
        },
        sort() {
            return this.$route.query.sort;
        }
    },
    methods: {

        /** HANDLE CARD CLICK
        *  Triggers route to render connection detail component
        *  @param     {Object}   route   Destination route object
        *  @returns   {null}
        */
        navigateTo(route) {
            this.$router.push(route);
        },

        getConnections(pageNum) {
            const itemsPerPage = this.$store.state.itemsPerPage;
            const token = LS.getData('auth_token');
            const page  = pageNum || 1;
            const sort  = this.$route.query.sort;
            const skip  = (page - 1) * itemsPerPage;

            // getAllConnections(token, sort, skip, limit)
            getAllConnections(token, sort, skip, itemsPerPage)
                .then(({ conns, total }) => {
                    this.connections = conns;
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
        this.getConnections();
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
