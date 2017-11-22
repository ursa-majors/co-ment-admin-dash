// expects (target element, template, params)
// route.controller(el, route.template, hash_frag);

function usersCtrl(el, template, data) {
    el.innerHTML = template(data);
}

export { usersCtrl };
