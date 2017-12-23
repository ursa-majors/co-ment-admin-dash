import Vue  from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    strict  : true,
    plugins : [],
    state   : {
        activeFeature  : null,
        token          : null,
        user           : null,
        isUserLoggedIn : false
    },
    mutations: {
        setActiveFeature(state, feature) {
            state.activeFeature = feature;
        },
        setToken(state, token) {
            state.token = token;
            if (token) {
                state.isUserLoggedIn = true;
            } else {
                state.isUserLoggedIn = false;
            }
        },
        setUser(state, user) {
            state.user = user;
        }
    },
    actions: {
        setActiveFeature({ commit }, feature) {
            commit('setActiveFeature', feature);
        },
        setToken({ commit }, token) {
            commit('setToken', token);
        },
        setUser({ commit }, user) {
            commit('setToken', user);
        }
    }
});
