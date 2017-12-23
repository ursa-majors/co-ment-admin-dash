<template lang="html">
<div class="detail">
    <slot>
        <!-- feature detail contents -->
    </slot>
</div>
</template>

<script>
export default {
    name: 'FeatureDetail'
};
</script>

<style scoped lang="css">
.detail {
    flex: 1;
    margin: 0 3px 3px;
}

.detail textarea {
    background: black;
    border: none;
    color: white;
    font-family: monospace;
    font-size: 12px;
    height: 100%;
    resize: none;
    outline: none;
    overflow: auto;
    width: 100%;
}
</style>
