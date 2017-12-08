<template lang="html">
    <div id="Header">
        <h1>co/ment admin dash</h1>
        <input id="dash-shell-header-search" type="text" placeholder="search">
    </div>
</template>

<script>
    export default {
        name: 'Header'
    }
</script>

<style lang="css">
    #Header {
        background: #444;
        box-sizing: border-box;
        color: white;
        display: flex;
        font-style: italic;
        justify-content: space-between;
        padding: .35em;
        padding-left: 50px;
        box-shadow: 1px 1px 8px #444;
    }

    input {
        width: 360px;
        border: none;
        background: #e9e9e9;
        color: black;
        line-height: 1em;
        padding: 0 .5em;
        box-sizing: border-box;

    }
</style>
