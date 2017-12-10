// hits our 'auth/login' endpoint

import Api from '@/services/Api';

export default {

    /** User login method
     *  How to use:
     *      AuthenticationService.login({
     *          username: 'dummy@hahaha.com',
     *          password: '12345'
     *      });
    */
    login (credentials) {
        return Api().post('auth/login', credentials);
    }

};
