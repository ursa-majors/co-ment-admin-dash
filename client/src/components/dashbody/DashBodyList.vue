<template lang="html">
<section class="dash-list">
    <div class="card" v-for="(doc, index) in documents">
        <p>Username: {{doc.username}}</p>
        <p>Name: {{doc.name || '{anon}'}}</p>
        <p>_id: {{doc._id}}</p>
    </div>
</section>
</template>

<script>
export default {
    props: ['documents']
}
</script>

<style lang="css">
</style>
