<template lang="html">
<nav class="dash-nav">
    <ul class="dash-nav-links">
        <div>
            <li v-for="(link, index) in navLinks" :ref="`nav-${link}`">
                <button
                    :class="{active : isActive(link)}"
                    @click="handleLink(link)">
                    <img :src="require(`@/assets/${link}.svg`)" :alt="link">
                    <p>{{link}}</p>
                </button>
            </li>
        </div>
        <li>
            <button @click="handleLogout()" class="last">
                <img src="../../assets/logout.svg" alt="Logout">
                <p>Logout</p>
            </button>
        </li>
    </ul>
</nav>
</template>

<script>
import { logout } from '@/utils/auth';

export default {
    data() {
        return {
            active   : false,
            navLinks : ['users', 'posts', 'connections', 'conversations', 'logs']
        };
    },
    methods: {

        /** CHECK IF BUTTON IS ACTIVE
        */
        isActive(link) {
            return this.active === link;
        },

        /** HANDLE LINK
         *  Route to link on nav button click - WIP
         *  @param     {String}   link   Collection name to route to
         *  @returns   {null}
        */
        handleLink(link) {
            // eslint-disable-next-line
            console.log(this.$refs);
            this.active = link;
            this.$router.push({ path: `/dash/${link}` });
        },

        /** HANDLE LOGOUT
         *  Auth utility 'logout' method deletes JWT and routes to '/'
         *  @returns   {null}
        */
        handleLogout() {
            logout();
        }

    }
};
</script>

<style lang="css">
.dash-nav {
    flex: 0 0 40px;
    background: #444;
    color: white;
    box-shadow: 1px 1px 4px #444;
}

.dash-nav ul {
    list-style: none;
    margin: 0;
    padding: 0;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
}

.dash-nav-links button {
    background: transparent;
    width: 100%;
    padding: 0;
    box-sizing: border-box;
    display: block;
    margin-bottom: 1.5em;
    border: 4px solid transparent;
}

.dash-nav-links button:hover,
.dash-nav-links button:active {
    cursor: pointer;
    border: 4px solid #3ec1c1;
}

.dash-nav-links button img {
    display: block;
    width: 100%;
}

.dash-nav-links button p {
    background: #444;
    border-radius: 0.2em;
    color: white;
    display: block;
    height: 20px;
    letter-spacing: 2px;
    left: 45px;
    line-height: 1.3em;
    margin-top: -31px;
    opacity: 0;
    padding: 0.4em 0.75em;
    position: absolute;
    text-transform: capitalize;
    transition: visibility 0s, opacity 0.2s linear;
    visibility: hidden;
}

.dash-nav-links button:hover p {
    visibility: visible;
    opacity: 1;
}

.dash-nav-links button.last {
    margin-bottom: 0;
}

.dash-nav-links button.last:hover {
    border: 4px solid #cb4747;
}

.dash-nav-links button.active {
    border: 4px solid #3ec1c1;
}
</style>
