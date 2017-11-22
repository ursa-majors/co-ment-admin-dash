/*
    Basic router; uses browser hashChange events
*/

export default class Router {
    
    constructor() {
        this.routes = {};
    }
    

    /** route registering function
     *  @param   {object}    allRoutes
     *  @param   {string}      .path         URL to route to
     *  @param   {function}    .template     Template function
     *  @param   {function}    .controller   Controller function
    */
    addRoutes(allRoutes) {
        
        for (let route in allRoutes) {
            let r = allRoutes[route];
            this.routes[r.path] = {
                template   : r.template,
                controller : r.controller
            };
        }
        
    }
    
    
    /** router
     *  @param   {string}   el   Target DOM element for route content
    */
    route(el) {
        
        const hash_frag    = location.hash.slice(1) || '/';
        const delimiter    = '/';
        const routePieces  = hash_frag.split(delimiter);
        const formattedPcs = routePieces.map( p => '/' + p );
        const pieceCount   = routePieces.length;
        const subRoute     = routePieces[3] || '';
        const baseRoute    = pieceCount > 3 ? formattedPcs[1] + formattedPcs[2] : formattedPcs[1];
        
        // pick correct route object from /routes
        let route = this.routes[baseRoute];
        
        // redirect to /home on invalid routes
        if (!route) { route = this.routes['/']; }
        
        // given an element & controller, execute the route
        if (el && route.controller) {
            route.controller(el, route.template, subRoute);
        }

    }
}
