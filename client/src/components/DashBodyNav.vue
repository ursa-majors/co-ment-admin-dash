<template lang="html">
    <nav class="dash-nav">
        <ul class="dash-nav-links">
            <div>
                <li v-for="(link, index) in nav_links">
                    <a :href="`#/${link}`" :title="link">
                        <img :src="require(`../assets/${link}.svg`)" :alt="link">
                    </a>
                </li>

            </div>
            <li>
                <a href="#/logout" title="Logout">
                    <img class="last" src="../assets/logout.svg" alt="Logout">
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
        padding: 0;
        box-shadow: 1px 1px 4px #444;
    }

    .dash-nav ul {
        list-style: none;
        margin: 0;
        padding: 0;
        height: 100%;
        display: flex;
        flex-flow: column nowrap;
    }

    .dash-nav ul div {
        flex: 1;
    }

    .dash-nav-links img {
        box-sizing: border-box;
        width: 100%;
        margin-bottom: 1.5em;
        padding: .25em;
        border: 4px solid transparent;
        vertical-align:top;
    }

    .dash-nav-links img:hover {
        border: 4px solid #3ec1c1;
    }

    .dash-nav-links img.first {
        margin-top: 0;
    }

    .dash-nav-links img.last {
        margin-bottom: 0;
    }

    .dash-nav-links img.last:hover {
        margin-bottom: 0;
        border: 4px solid #cb4747;
    }

    .dash-nav-links img.active {
        border: 4px solid #3ec1c1;
    }
</style>
