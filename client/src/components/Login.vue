<template lang="html">
<div class="login-container">
    <form action="">
        <h1>co/ment admin dashboard</h1>
        <input
            type="text"
            name="username"
            placeholder="username"
            @keyup="clearError"
            v-model="username">
        <input
            type="password"
            name="password"
            placeholder="password"
            @keyup="clearError"
            @keyup.enter="login"
            v-model="password">
        <button
            type="button"
            @click="login">
            Login
        </button>
        <p v-if="error" class="login-error">{{error}}</p>
    </form>
</div>
</template>

<script>
import AuthService from '@/services/AuthService';
import LS          from '@/utils/localStorage';

export default {
    name: 'login',
    data() {
        return {
            username : '',
            password : '',
            error    : false
        };
    },
    methods: {

        /** LOGIN
         *  Calls auth service login method with username & password.
         *  On success: stores JWT in local storage and routes to dash.
         *  On failure: sets 'error' property to API error response string.
        */
        login() {
            AuthService.login({
                username : this.username,
                password : this.password
            })
            .then(response => {
                LS.setData('auth_token', response.token);
                this.$router.push('dash');
            })
            .catch(err => this.error = err.response.data.message);
        },

        /** CLEAR ERROR
         *  Sets 'error' property to 'false'
        */
        clearError() {
            this.error = false;
        }

    }
};
</script>

<style scoped lang="css">
.login-container {
    height: 100%;
    background: url(/static/splash.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
}

.login-container > form {
    background: #f9f9f9;
    color: black;
    padding: 1em 2em 1.5em 2em;
    box-shadow: 0 0 20px #333;
}

.login-container > form h1 {
    font-size: 2em;
    font-weight: 100;
    margin: 0 0 .5em 0;
    text-align: center;
    font-style: italic;
    letter-spacing: 2px
}

.login-container > form input[type="text"],
.login-container > form input[type="password"] {
    width: 194px;
    border: 1px solid #444;
    background: #eee;
    margin: .25em;
    padding: .25em .4em;
    line-height: 1.6em;
}

.login-container > form input:focus {
    outline-style: none;
    border: 1px solid #3ec1c1;
    box-shadow: 0 0 10px #3ec1c1;
}

.login-container > form button {
    box-sizing: border-box;
    border: 1px solid #444;
    outline: none;
    padding: .25em .75em;
    line-height: 1.6em;
}

/* remove border around button text in FF */
.login-container > form button::-moz-focus-inner {
    border: 0;
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

.login-error {
    margin: 0;
    padding-top: 1em;
    text-align: right;
    color: rgba(200,50,50,.8);
}
</style>
