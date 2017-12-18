import Vue             from 'vue';
import Router          from 'vue-router';
import { requireAuth } from '@/utils/auth';
import Login           from '@/components/Login';
import Dash            from '@/components/Dash';
import BodyHome        from '@/components/dashbody/BodyHome';
import Users           from '@/components/dashbody/features/users/Users';
import UserDetail      from '@/components/dashbody/features/users/UserDetail';
import Posts           from '@/components/dashbody/features/posts/Posts';
import PostDetail      from '@/components/dashbody/features/posts/PostDetail';
import Connections     from '@/components/dashbody/features/connections/Connections';
import Conversations   from '@/components/dashbody/features/conversations/Conversations';
import Logs            from '@/components/dashbody/features/logs/Logs';

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path      : '/',
            name      : 'login',
            component : Login
        },
        {
            path        : '/dash',
            component   : Dash,
            beforeEnter : requireAuth,
            children    : [
                {
                    path      : '',
                    component : BodyHome
                },
                {
                    path      : 'users',
                    component : Users,
                    children  : [
                        {
                            path      : ':userId',
                            name      : 'UserDetail',
                            component : UserDetail
                        }
                    ]
                },
                {
                    path      : 'posts',
                    component : Posts,
                    children  : [
                        {
                            path      : ':postId',
                            name      : 'PostDetail',
                            component : PostDetail
                        }
                    ]
                },
                {
                    path      : 'connections',
                    component : Connections
                },
                {
                    path      : 'conversations',
                    component : Conversations
                },
                {
                    path      : 'logs',
                    component : Logs
                }
            ]
        }
    ]
});

export default router;
