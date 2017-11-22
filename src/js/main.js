/*
    Main bootstrap module
*/

import { $on }    from './utils';
import   Router   from './router';
import { routes } from './routes';

class App {
    
    constructor() {
        this.el     = document.querySelector('#app-root');
        this.router = new Router();
    }

}

const app = new App();

// register all routes
app.router.addRoutes(routes);

// execute routes
const doRoute = () => {
    app.router.route(app.el);
};

// register event listeners
$on(window, 'load',       doRoute);
$on(window, 'hashchange', doRoute);
