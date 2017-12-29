<template lang="html">
<div class="conversations">
    <ConversationsList/>
    <router-view/>
</div>
</template>

<script>
import ConversationsList from './ConversationsList';

export default {
    name       : 'Conversations',
    components : {
        ConversationsList
    },
    mounted() {
        this.$store.dispatch('setActiveFeature', 'conversations');
    }
};
</script>

<style scoped lang="css">
.conversations {
    display: flex;
    min-height: 0;
    flex: 1;
    padding: 10px;
}
</style>
