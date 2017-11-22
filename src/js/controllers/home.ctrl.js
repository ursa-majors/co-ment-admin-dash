// expects (target element, template, params)
// route.controller(el, route.template, hash_frag);

function homeCtrl(el, template, data) {
    el.innerHTML = template(data);
}

export { homeCtrl };
