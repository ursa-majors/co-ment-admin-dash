/*
    Utility module for pubsub
    
    Notes:
    1. Keeping `topics` outside of the Events class maintains event state
       across modules
    2. To use:
        a. `import Events from './events.js'` in other module
        b. Create an `events` variable: `const events = new Events()`
        c. Use `events.on()`, `events.emit()`, etc. to communicate between
           modules.
*/

/* ======================== MODULE SCOPE VARIABLES ========================= */

const topics = {};


/* ============================= MODULE CLASS ============================== */

export default class Events {
    
    /** Subscribe to an event on receipt of 'eventName'.
    *   Registers a callback in our topics object, keyed to the event name.
    *   @param    {string}     eventName   Name of the event to listen for
    *   @param    {function}   fn          Callback to fire on hearing event
    */
    on(eventName, fn) {
        topics[eventName] = topics[eventName] || [];
        topics[eventName].push(fn);
    }
    
    
    /** Unsubscribe from an event on receipt of 'eventName'.
    *   Removes the associated callback from our topics object.
    *   @param    {string}     eventName   Name of event to stop listening for
    *   @param    {function}   fn          Associated callback to unregister
    */
    off(eventName, fn) {
        if (topics[eventName]) {
            for (let i = 0; i < topics[eventName].length; i += 1) {
                if (topics[eventName][i] === fn) {
                    topics[eventName].splice(i, 1);
                    break;
                }
            }
        }
    }
    
    
    /** publish event emitter 'eventName', passing 'data' to all registered
    *   Callbacks linked to the event name in our 'topics' object
    *   @param    {string}    eventName   Name of the event to listen for
    *   @param    {various}   data        Data to pass to the event's callback
    */
    emit(eventName, data) {
        if (topics[eventName]) {
            topics[eventName].forEach( (fn) => {
                fn(data);
            });
        }
    }
    
}
