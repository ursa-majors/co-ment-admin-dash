<template lang="html">
<div class="users">
    <UsersList :users="users" />
    <router-view/>
</div>
</template>

<script>
import { getProfiles } from '@/services/ProfileService';
import LS              from '@/utils/localStorage';
import UsersList       from './UsersList';

export default {
    name       : 'Users',
    components : {
        UsersList
    },
    data() {
        return {
            users: []
        };
    },
    methods: {

        getUsers() {
            const token = LS.getData('auth_token');
            getProfiles(token)
                .then((docs) => {
                    this.users = docs;
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
