<template lang="html">
<div class="quote">
    <p>"It is impossible for a man to learn what he thinks he already knows." - Epictetus</p>
</div>
</template>

<script>
export default {
    name: 'BodyHome',
    mounted() {
        this.$store.dispatch('setActiveFeature', 'home');
    }
};
</script>

<style scoped lang="css">
.quote {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    width: 100%;
}

.quote p {
    text-align: center;
    color: #999;
}
</style>
