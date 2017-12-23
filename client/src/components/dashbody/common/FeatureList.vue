<template lang="html">
<div class="list">
    <h2>{{title}}</h2>
    <p>Total Records: {{total}}</p>
    <slot>
        <!-- feature list contents -->
    </slot>
</div>
</template>

<script>
export default {
    name  : 'FeatureList',
    props : ['title', 'total']
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

.list > h2 {
    display: inline-block;
    color: #333;
    margin: 0 0 .1em;
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: 1px;
}

.list > p {
    display: inline-block;
    /* border: 1px solid red; */
    margin-left: 1em;
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
