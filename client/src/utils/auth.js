/* ================================= SETUP ================================= */

import decode from 'jwt-decode';
import router from '@/router';
import LS     from './localStorage';


/* ============================ UTILITY METHODS ============================ */

function getTokenExpirationDate(encodedToken) {
    const token = decode(encodedToken);
    if (!token.exp) {
        return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(token.exp);
    return date;
}


function isTokenExpired(token) {
    const expirationDate = getTokenExpirationDate(token);
    return expirationDate < new Date();
}


/* ============================ PUBLIC METHODS ============================= */

export function logout() {
    LS.deleteData('auth_token');
    router.push('/');
}


export function isLoggedIn() {
    const token = LS.getData('auth_token');
    return !!token && !isTokenExpired(token);
}


export function requireAuth(to, from, next) {
    if (!isLoggedIn()) {
        next({
            path  : '/',
            query : { redirect: to.fullPath }
        });
    } else {
        next();
    }
}
