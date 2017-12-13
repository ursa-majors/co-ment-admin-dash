<template lang="html">
<p>ello?</p>
</template>

<script>
import LS             from '@/utils/localStorage';
import ProfileService from '@/services/ProfileService';

export default {
    name: 'BodyHome',
    data() {
        return {
            documents: []
        };
    },
    methods: {
        getProfiles() {
            let token = LS.getData('auth_token');
            ProfileService.getProfiles(token)
                .then( docs => this.documents = docs)
                .catch( err => console.log(err) );
        }
    },
    mounted() {
        this.getProfiles();
    }
}
</script>

<style lang="css">
</style>
