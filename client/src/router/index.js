import Vue    from 'vue';
import Router from 'vue-router';
import Login  from '@/components/Login';
import Dash   from '@/components/Dash';

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'login',
            component: Login
        },
        {
            path: '/dash',
            name: 'Dash',
            component: Dash
        }
  ]
});

// router.beforeEach( (to, from, next) => {
//     console.log('CHECK AUTH HERE!');
//     console.log('to:', to);
//     console.log('from:', from);
//     next();
// });

export default router;
