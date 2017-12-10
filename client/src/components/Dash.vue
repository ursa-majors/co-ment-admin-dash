<template>
    <div id="app" class="dash">
        <DashHeader />
        <DashBody v-bind:documents="documents" />
        <DashFooter />
    </div>
</template>

<script>
    import DashHeader     from '@/components/Header.vue';
    import DashFooter     from '@/components/Footer.vue';
    import DashBody       from '@/components/DashBody.vue';
    import LS             from '@/utils/localStorage';
    import ProfileService from '@/services/ProfileService';

    export default {
        name: 'Dash',
        components: {
            DashHeader,
            DashBody,
            DashFooter
        },
        data() {
            return {
                documents: []
            };
        },
        methods: {
            getSomeStuff() {
                let token = LS.getData('auth_token');
                ProfileService.getProfiles(token)
                    .then( docs => this.documents = docs.data)
                    .catch( err => console.log(err) );
            }
        },
        mounted() {
            this.getSomeStuff();
        }
    };
</script>

<style>
    .dash {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        height: 100vh;
    }

    .dash h1,
    .dash p {
        margin: 0;
    }

</style>
