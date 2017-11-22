/*
    Utilities
*/

/** Register a handler to an event emitted by a target
 *  @param {object}    target    DOM element object
 *  @param {string}    event     Emitted event name
 *  @param {function}  handler   function to fire on event
*/
const $on = (target, event, handler) => {
    return target.addEventListener(event, handler);
};


/** HTML templating utility
 *  @param   {array}   literalsArr   Array of all the literal text
 *  @param   {array}   ...cooked     Rest param: all the processed expressions
 *  @returns                         The processed string
*/
const html = (literalsArr, ...cooked) => {
    let result = '';
    
    cooked.forEach( (cook, idx) => {
        let lit = literalsArr[idx];
        if (Array.isArray(cook)) {
            cook = cook.join('');
        }
        result += lit;
        result += cook;
    });
    result += literalsArr[literalsArr.length - 1];
    return result;
};


/* ================================ EXPORTS ================================ */

export { $on, html };
