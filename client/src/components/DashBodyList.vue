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
    .dash-list {
        min-height: 0;
        flex: 1;
        margin: 10px;
        margin-right: 0px;
        overflow-y: auto;
        overflow-x: hidden;
    }

    .dash-list > div {
        background: white;
        border: 1px solid #a9a9a9;
        margin: 0 .5em .75em 0;
        padding: .5em;
    }

    .dash-list > div:last-child {
        margin-bottom: 0;
    }

    .dash-list > div p {
        color: black;
        margin: .15em 0;
    }
</style>
