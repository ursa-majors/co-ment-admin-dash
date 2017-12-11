<template lang="html">
    <div class="login-container">
        <form action="">
            <h1>co/ment admin dashboard</h1>
            <input
                type="text"
                name="username"
                placeholder="username"
                v-model="username">
            <input
                type="password"
                name="password"
                placeholder="password"
                v-model="password">
            <button
                type="button"
                @click="login">
                Login
            </button>
        </form>
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
                    LS.setData('auth_token', response.token);
                    this.$router.push('dash');
                })
                .catch( err => console.log(err) );
            }
        }
    }
</script>

<style lang="css">
    .login-container {
        height: 100%;
        background: #444;
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        justify-content: center;
    }

    .login-container > form {
        background: #f9f9f9;
        color: black;
        padding: 1.75em 2em 2em 2em;
        border-radius: 3px;
    }

    .login-container > form h1 {
            font-size: 2em;
        font-weight: 100;
        margin: 0 0 .5em 0;
        text-align: center;
        font-style: italic;
        letter-spacing: 2px
    }

    .login-container > form input[type=text],
    .login-container > form input[type=password]{
        width: 194px;
        border: 1px solid #eee;
        background: #eee;
        margin: .25em;
        padding: .25em .4em;
        font-size: 1.3em;
    }

    .login-container > form input:focus {
        outline-style: none;
        border: 1px solid #3ec1c1;
        box-shadow: 0 0 10px #3ec1c1;
    }

    .login-container > form button {
        box-sizing: border-box;
        border: 1px solid #444;
        padding: .25em .75em;
        font-size: 1.3em;
    }

    .login-container > form button:hover,
    .login-container > form button:focus {
        outline-style: none;
        cursor: pointer;
        border: 1px solid #3ec1c1;
        box-shadow: 0 0 10px #3ec1c1;
    }

    .login-container > form input:-moz-focusring {
        outline-color: #3ec1c1;
    }
</style>
