<template lang="html">
<div class="log-detail">
    <textarea
        wrap="off"
        readonly="true"
    >{{ JSON.stringify(log, null, 2) }}
    </textarea>
</div>
</template>

<script>
import { getOneLog } from '@/services/LogService';
import LS            from '@/utils/localStorage';

export default {
    name: 'LogDetail',
    data() {
        return {
            log: {}
        };
    },
    watch: {
        $route: 'fetchLog'
    },
    methods: {

        /** GET ONE LOG
         *  Triggered on 1st mount and on changes to the route
        */
        fetchLog() {
            const token = LS.getData('auth_token');
            getOneLog(token, this.$route.params.logId)
                .then((doc) => {
                    this.log = doc;
                })
                .catch(err => new Error(err));
        }

    },
    mounted() {
        this.fetchLog();
    }
};
</script>

<style lang="css">
.log-detail {
    flex: 1;
    margin: 0 3px 3px;
}

.log-detail textarea {
    background: black;
    border: none;
    color: white;
    font-family: monospace;
    font-size: 10px;
    height: 100%;
    resize: none;
    outline: none;
    overflow: auto;
    width: 100%;
}
</style>
