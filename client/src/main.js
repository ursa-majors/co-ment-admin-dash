// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue      from 'vue';
import store    from '@/store/store';
import { sync } from 'vuex-router-sync';
import App      from './App';
import router   from './router';

Vue.config.productionTip = false;

sync(store, router);

/* eslint-disable no-new */
new Vue({
    el         : '#app',
    router,
    store,
    template   : '<App/>',
    components : { App }
});
