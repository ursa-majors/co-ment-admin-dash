<template lang="html">
<div class="users">
    <UsersList v-bind:users="users" v-on:user="setUserId"/>
    <UserDetail v-bind:user="user" />
</div>
</template>

<script>
import UsersList       from '@/components/dashbody/views/partials/UsersList';
import UserDetail      from '@/components/dashbody/views/partials/UserDetail';
import LS              from '@/utils/localStorage';
import { getProfiles } from '@/services/ProfileService';

export default {
    name: 'Users',
    components: {
        UsersList,
        UserDetail
    },
    data() {
        return {
            users: [],
            userId: ''
        };
    },
    computed: {
        user: function() {
            return this.users.filter( el => el._id === this.userId)[0];
        }
    },
    methods: {

        /** GET USERS
        */
        getUsers() {
            let token = LS.getData('auth_token');
            getProfiles(token)
                .then( docs => this.users = docs)
                .catch( err => console.log(err) );
        },

        /** RENDER USER DETAIL
        */
        setUserId(userId) {
            this.userId = userId;
        }
    },
    mounted() {
        this.getUsers();
    }
}
</script>

<style scoped lang="css">
.users {
    display: flex;
    min-height: 0;
    flex: 1;
    padding: 10px;
}
</style>
