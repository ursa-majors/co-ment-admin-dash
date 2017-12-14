/* helper methods for working with browser localStorage API */

/** localStorage feature detect & return local reference
*   @returns   {Boolean}   True if stored string === uid
*/
const storage = (function storageSetup() {
    const uid = new Date().toString(); // date must be a string
    let store;
    let result;

    try {
        store = window.localStorage;
        store.setItem(uid, uid);
        result = store.getItem(uid) === uid;
        store.removeItem(uid);
        return result && store;
    } catch (exception) {
        console.log('localStorage unavailable');
        return false;
    }
}());

export default {

    /** Store item in local storage if storage exists
    *   @param   {String}   loc   Local storage sub-location key
    *   @param   {String}   val   String to be stored
    *   @param   {void}
    */
    setData(loc, val) {
        if (storage) {
            storage.setItem(loc, JSON.stringify(val));
        }
    },

    /** Get local storage if storage exists
    *   @param     {String}        loc   Local storage key
    *   @returns   {JSON string}         Value of the key, as JSON
    */
    getData(loc) {
        if (storage) {
            return JSON.parse(storage.getItem(loc));
        }
        return false;
    },

    /** Delete ALL keys from local storage if pass
    *   @returns   {undefined}
    */
    clearData() {
        if (storage) {
            return storage.clear();
        }
        return false;
    },

    /** Delete ONE key from local storage if pass
    *   @param     {string}   loc   The key to delete from localStorage
    *   @returns   {void}
    */
    deleteData(loc) {
        if (storage) {
            return storage.removeItem(loc);
        }
        return false;
    }

};
