<template lang="html">
    <div class="">
        <h1>Login</h1>
        <input
            type="text"
            name="username"
            placeholder="username"
            v-model="username" />
        <input
            type="password"
            name="password"
            placeholder="password"
            v-model="password" />
        <button
            type="button"
            @click="login">
            Login
        </button>
    </div>
</template>

<script>
    import AuthenticationService from '@/services/AuthenticationService';
    import LS                    from '@/utils/localStorage';

    export default {
        name: 'login',
        data() {
            return {
                username: '',
                password: ''
            };
        },
        methods: {
            login () {
                AuthenticationService.login({
                    username: this.username,
                    password: this.password
                })
                .then( response => {
                    LS.setData('auth_token', response.data.token);
                    this.$router.push('dash');
                })
                .catch( err => console.log(err) );
            }
        }
    }
</script>

<style lang="css">
</style>
