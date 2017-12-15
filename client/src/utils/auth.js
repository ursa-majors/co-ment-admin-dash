/* ================================= SETUP ================================= */

import decode from 'jwt-decode';
import router from '@/router';
import LS     from './localStorage';


/* ============================ UTILITY METHODS ============================ */

/** GET JWT EXPIRATION DATE
 *  @param    {String}       encodedToken   Raw JWT.
 *  @returns  {null|Object}                 null or Javascript Date object.
*/
function getTokenExpirationDate(encodedToken) {
    const token = decode(encodedToken);
    if (!token.exp) { return null; }

    const date = new Date(0);
    date.setUTCSeconds(token.exp);
    return date;
}


/** CHECK IF JWT IS EXPIRED
 *  @param    {String}   token   Raw JWT.
 *  @returns  {Boolean}          True if JWT has expired.
*/
function isTokenExpired(token) {
    const expirationDate = getTokenExpirationDate(token);
    return expirationDate < new Date();
}


/* ============================ PUBLIC METHODS ============================= */

/** LOGOUT
 *  Deletes the JWT from local storage and routes to Login `/` path.
 *  @returns   {null}
*/
export function logout() {
    LS.deleteData('auth_token');
    router.push('/');
}


/** CHECK IF USER IS LOGGED IN
 *  User is logged in if they have a token and it is not expired.
 *  @returns   {Boolean}   True if JWT exists and is not expired.
*/
export function isLoggedIn() {
    const token = LS.getData('auth_token');
    return !!token && !isTokenExpired(token);
}


/** ROUTE GUARD TO REQUIRE USER AUTH
 *  If user is not logged in, route to Login `/` path.
 *  @param     {Object}     to     Target Route Object being navigated to.
 *  @param     {Object}     from   Current route being navigated away from.
 *  @param     {Function}   next   Resolves the hook.
 *  @returns   {null}
*/
export function requireAuth(to, from, next) {
    if (!isLoggedIn()) {
        next({ path: '/' });
    } else {
        next();
    }
}
