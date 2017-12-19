import Vue                from 'vue';
import Router             from 'vue-router';
import { requireAuth }    from '@/utils/auth';
import Login              from '@/components/Login';
import Dash               from '@/components/Dash';
import BodyHome           from '@/components/dashbody/BodyHome';
import Users              from '@/components/dashbody/features/users/Users';
import UserDetail         from '@/components/dashbody/features/users/UserDetail';
import Posts              from '@/components/dashbody/features/posts/Posts';
import PostDetail         from '@/components/dashbody/features/posts/PostDetail';
import Connections        from '@/components/dashbody/features/connections/Connections';
import ConnectionDetail   from '@/components/dashbody/features/connections/ConnectionDetail';
import Conversations      from '@/components/dashbody/features/conversations/Conversations';
import ConversationDetail from '@/components/dashbody/features/conversations/ConversationDetail';
import Logs               from '@/components/dashbody/features/logs/Logs';
import LogDetail          from '@/components/dashbody/features/logs/LogDetail';

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
                    component : Connections,
                    children  : [
                        {
                            path      : ':connectionId',
                            name      : 'ConnectionDetail',
                            component : ConnectionDetail
                        }
                    ]
                },
                {
                    path      : 'conversations',
                    component : Conversations,
                    children  : [
                        {
                            path      : ':conversationId',
                            name      : 'ConversationDetail',
                            component : ConversationDetail
                        }
                    ]
                },
                {
                    path      : 'logs',
                    component : Logs,
                    children  : [
                        {
                            path      : ':logId',
                            name      : 'LogDetail',
                            component : LogDetail
                        }
                    ]
                }
            ]
        }
    ]
});

export default router;
