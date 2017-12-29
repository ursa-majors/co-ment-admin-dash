<template lang="html">
<FeatureDetail>
    <textarea
        wrap="off"
        readonly="true"
    >{{ JSON.stringify(user, null, 2) }}
    </textarea>
</FeatureDetail>
</template>

<script>
import FeatureDetail     from '@/components/dashbody/common/FeatureDetail';
import { getOneProfile } from '@/services/ProfileService';
import LS                from '@/utils/localStorage';

export default {
    name: 'UserDetail',
    data() {
        return {
            user: {}
        };
    },
    watch: {
        $route: 'fetchUser'
    },
    methods: {
        /** GET ONE USER
         *  @param    {String}  userId  User _id emitted by UsersList component
         *  @returns  {null}
        */
        fetchUser() {
            const token = LS.getData('auth_token');
            getOneProfile(token, this.$route.params.userId)
                .then((doc) => {
                    this.user = doc;
                })
                .catch(err => new Error(err));
        }

    },
    mounted() {
        this.fetchUser();
    },
    components: {
        FeatureDetail
    }
};
</script>

<style lang="css">
</style>
