<template lang="html">
<div id="Header">
    <h1>{{title}}</h1>
    <input id="dash-shell-header-search" type="text" placeholder="search">
</div>
</template>

<script>
export default {
    name     : 'DashHeader',
    computed : {
        title() {
            return this.$store.state.activeFeature;
        }
    }
};
</script>

<style scoped lang="css" >
#Header {
    background: #444;
    box-sizing: border-box;
    color: #bbb;
    display: flex;
    font-style: italic;
    height: 36px;
    justify-content: space-between;
    padding: .35em;
    padding-left: 40px;
    box-shadow: 1px 1px 8px #444;
}

#Header > h1 {
    text-transform: capitalize;
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
