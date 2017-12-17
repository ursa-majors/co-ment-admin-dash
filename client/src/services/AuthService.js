// hits 'auth/login' endpoint

import Api from '@/services/Api';

export default {

    /** LOGIN
     *  @param     {Object}   creds   { username: String, password: String }
     *  @returns   {Promise}          Promise obj + payload: profile + JWT
     *  Example:
     *    AuthenticationService.login({
     *        username: 'dummy@hahaha.com',
     *        password: '12345'
     *    });
    */
    login(creds) {
        return Api()
            .post('auth/login', creds)
            .then(response => response.data);
    }

};
