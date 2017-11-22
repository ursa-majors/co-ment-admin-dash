/** Register a handler to an event emitted by a target
 *  @param {object}    target    DOM element object
 *  @param {string}    event     Emitted event name
 *  @param {function}  handler   function to fire on event
*/
const $on = (target, event, handler) => {
    return target.addEventListener(event, handler);
};

export { $on };
