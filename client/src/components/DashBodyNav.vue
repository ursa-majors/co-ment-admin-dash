<template lang="html">
    <nav class="dash-nav">
        <ul class="dash-nav-links">
            <div>
                <li v-for="(link, index) in nav_links">
                    <a :href="`#/${link}`">
                        <img :src="require(`../assets/${link}.svg`)" :alt="link">
                        <p>{{link}}</p>
                    </a>
                </li>

            </div>
            <li>
                <a href="#/logout" class="last">
                    <img src="../assets/logout.svg" alt="Logout">
                    <p>Logout</p>
                </a>
            </li>
        </ul>
    </nav>
</template>

<script>
    export default {
        data() {
            return {
                nav_links: [
                    'users', 'posts', 'connections', 'conversations', 'logs'
                ]
            };
        }
    }
</script>

<style lang="css">
    .dash-nav {
        flex: 0 0 50px;
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

    .dash-nav-links a {
        box-sizing: border-box;
        display: block;
        margin-bottom: 1.5em;
        border: 4px solid transparent;
    }

    .dash-nav-links a:hover,
    .dash-nav-links a:active {
        border: 4px solid #3ec1c1;
    }

    .dash-nav-links a img {
        display: block;
        width: 100%;
    }

    .dash-nav-links a p {
        background: #333;
        border-radius: .2em;
        color: white;
        display: block;
        letter-spacing: 2px;
        font-weight: bold;
        left: 55px;
        margin-top: -25px;
        opacity: 0;
        padding: .4em .75em;
        position: absolute;
        transition: visibility 0s, opacity 0.2s linear;
        visibility: hidden;
    }

    .dash-nav-links a:hover p {
        visibility: visible;
        opacity: 1;
    }

    .dash-nav-links a.last {
        margin-bottom: 0;
    }

    .dash-nav-links a.last:hover {
        border: 4px solid #cb4747;
    }

    .dash-nav-links a.active {
        border: 4px solid #3ec1c1;
    }
</style>
