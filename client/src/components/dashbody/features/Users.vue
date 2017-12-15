<template lang="html">
<div class="users">
    <UsersList v-bind:users="users" v-on:user="getOneUser"/>
    <UserDetail v-bind:user="user" />
</div>
</template>

<script>
import UsersList  from '@/components/dashbody/features/partials/UsersList';
import UserDetail from '@/components/dashbody/features/partials/UserDetail';
import LS         from '@/utils/localStorage';
import { getProfiles, getOneProfile } from '@/services/ProfileService';

export default {
    name       : 'Users',
    components : {
        UsersList,
        UserDetail
    },
    data() {
        return {
            users : [],
            user  : {}
        };
    },
    methods: {

        /** GET ALL USERS
        */
        getUsers() {
            const token = LS.getData('auth_token');
            getProfiles(token)
                .then((docs) => {
                    this.users = docs;
                })
                .catch(err => new Error(err));
        },

        /** GET ONE USER
         *  @param  {String}  userId  User _id emitted from UsersList component
        */
        getOneUser(userId) {
            const token = LS.getData('auth_token');
            getOneProfile(token, userId)
                .then((doc) => {
                    this.user = doc;
                })
                .catch(err => new Error(err));
        }

    },
    mounted() {
        this.getUsers();
    }
};
</script>

<style scoped lang="css">
.users {
    display: flex;
    min-height: 0;
    flex: 1;
    padding: 10px;
}
</style>
