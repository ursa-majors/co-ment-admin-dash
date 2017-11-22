// expects (target element, template, params)
// route.controller(el, route.template, hash_frag);

import { $on }       from '../utils/dom_events';
import Events        from '../utils/pubsub';
import { headerTpl } from '../templates/header.tpl';

const links = [
    { name: 'Posts', href: '/posts' },
    { name: 'Users', href: '/users' }
];

const homeCtrl = (el, template, data) => {
    
    const DOM = {};
    const events = new Events();

    // cache DOM elements
    function cacheDom() {
        DOM.$header  = el.querySelector('header');
        DOM.$section = el.querySelector('section');
        DOM.$footer  = el.querySelector('footer');
        DOM.$button  = el.querySelector('#btn-do-something');
        DOM.$output  = el.querySelector('#output');
    }
    
    // bind events
    function bindEvents() {
        $on(DOM.$button, 'click', handleClicks);
        events.on('button_clicked', updateOutput);
    }
    
    // click handler
    function handleClicks(e) {
        e.preventDefault();
        events.emit('button_clicked');
    }
    
    // render output
    function updateOutput(data) {
        DOM.$output.innerHTML = `<p>Button clicked!</p>`;
        DOM.$section.appendChild(DOM.$output);
    }
    
    // render module
    function render() {
        DOM.$header.innerHTML = headerTpl(links);
    }
    
    // init
    (function init() {
        el.innerHTML = template(data);
        cacheDom();
        bindEvents();
        render();
    }());
    
};

export { homeCtrl };
