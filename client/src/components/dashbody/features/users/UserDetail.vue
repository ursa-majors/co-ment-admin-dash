<template lang="html">
<div class="user-detail">
    <textarea
        wrap="off"
        readonly="true"
    >{{ JSON.stringify(user, null, 2) }}
    </textarea>
</div>
</template>

<script>
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
    }
};
</script>

<style lang="css">
.user-detail {
    flex: 1;
    margin: 0 3px 3px;
}

.user-detail textarea {
    background: black;
    border: none;
    color: white;
    font-family: monospace;
    font-size: 10px;
    height: 100%;
    resize: none;
    outline: none;
    overflow: auto;
    width: 100%;
}

.user-detail img {
    max-width: 100%;
}
</style>
