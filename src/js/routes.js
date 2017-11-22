/*
    Route definitions
*/

/* ================================= SETUP ================================= */

import { homeCtrl }  from './controllers/home.ctrl.js';
import { homeTpl }   from './templates/home.tpl.js';

import { usersCtrl } from './controllers/users.ctrl.js';
import { usersTpl }  from './templates/users.tpl.js';

import { postsCtrl } from './controllers/posts.ctrl.js';
import { postsTpl }  from './templates/posts.tpl.js';


/* ================================ ROUTES ================================= */

const routes = {
    
    home : {
        path       : '/',
        template   : homeTpl,
        controller : homeCtrl
    },
    
    users : {
        path       : '/users',
        template   : usersTpl,
        controller : usersCtrl
    },
    
    posts : {
        path       : '/posts',
        template   : postsTpl,
        controller : postsCtrl
    }

};


/* ================================ EXPORTS ================================ */

export { routes };
