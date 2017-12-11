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
        margin-right: 2px;
        overflow-y: auto;
        overflow-x: hidden;
    }

    .dash-list > div {
        background: white;
        border: 1px solid #a9a9a9;
        margin: 0 2px .75em 0;
        padding: .5em;
    }

    .dash-list > div:last-child {
        margin-bottom: 0;
    }

    .dash-list > div p {
        color: black;
        margin: .15em 0;
    }

    ::-webkit-scrollbar {
        width: 5px;
        height: 5px;
    }

    ::-webkit-scrollbar-thumb {
        border-radius: 3px;
        background: rgba(112,112,112,0.7);
    }

    ::-webkit-scrollbar-corner {
        display: none;
    }
</style>
