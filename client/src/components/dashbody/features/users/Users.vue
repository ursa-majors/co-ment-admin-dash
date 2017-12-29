<template lang="html">
<div class="users">
    <UsersList/>
    <router-view/>
</div>
</template>

<script>
import UsersList from './UsersList';

export default {
    name       : 'Users',
    components : {
        UsersList
    },
    mounted() {
        this.$store.dispatch('setActiveFeature', 'users');
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
