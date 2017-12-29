<template lang="html">
<div class="list">
    <slot>
        <!-- feature list contents -->
    </slot>
</div>
</template>

<script>
export default {
    name: 'FeatureList'
};
</script>

<style scoped lang="css">
.list > div {
    background: white;
    border: 1px solid #a9a9a9;
    margin: 0 .5em .75em 0;
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
