import Vue    from 'vue';
import Router from 'vue-router';
import Login  from '@/components/Login';
import Dash   from '@/components/Dash';

Vue.use(Router);

const checkAuth = (to, from, next) => {
    console.log('CHECK AUTH HERE!');
    console.log(to);
    console.log(from);
    next();
};

export default new Router({
    routes: [
        {
            path: '/',
            name: 'login',
            component: Login
        },
        {
            path: '/dash',
            name: 'Dash',
            component: Dash,
            beforeEnter: checkAuth
        }
  ]
});
