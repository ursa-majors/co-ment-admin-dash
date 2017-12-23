<template lang="html">
<div class="list">
    <p>Showing {{limited}} of {{total}} total records</p>
    <slot>
        <!-- feature list contents -->
    </slot>
</div>
</template>

<script>
export default {
    name  : 'FeatureList',
    props : ['total', 'limited']
};
</script>

<style scoped lang="css">
.list {
    min-height: 0;
    max-width: 320px;
    flex: 1;
    margin-right: .5em;
    overflow-y: auto;
    overflow-x: hidden;
}

.list > p {
    box-sizing: border-box;
    color: #444;
    display: block;
    margin-bottom: 6px;
    text-align: center;
}

.list > div {
    background: white;
    border: 1px solid #a9a9a9;
    margin: 0 2px .75em 0;
    padding: .5em;
    cursor: pointer;
}

.list > div:last-child {
    margin-bottom: 0;
}

.list > div p {
    font-size: 12px;
    color: black;
    margin: .15em 0;
}
</style>
