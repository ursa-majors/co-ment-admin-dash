<template>
<div id="app" class="dash">
    <router-view/>
</div>
</template>

<script>
export default {
    name: 'app'
};
</script>

<style>
.dash {
    height: 100%;
}

::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background: rgba(112,112,112,0.7);
}

::-webkit-scrollbar-corner {
    display: none;
}
</style>
