import Vue    from 'vue';
import Router from 'vue-router';
import Login  from '@/components/Login';
import Dash   from '@/components/Dash';
import BodyHome from '@/components/dashbody/BodyHome';
import Users    from '@/components/dashbody/views/Users';

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
            // name: 'Dash',
            component: Dash,
            children: [
                {
                    path: '',
                    component: BodyHome
                },
                {
                    path: 'users',
                    component: Users
                },
                // {
                //     path: 'posts',
                //     component: Posts
                // },
                // {
                //     path: 'connections',
                //     component: Connections
                // },
                // {
                //     path: 'conversations',
                //     component: Conversations
                // },
                // {
                //     path: 'logs',
                //     component: Logs
                // }
            ]
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
