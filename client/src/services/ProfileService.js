// hits our 'api/profiles' endpoints

import Api from '@/services/Api';

export default {

    getProfiles (token) {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
        return Api().get('api/profiles', config );
    },

    getOneProfile (id, token) {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
        return Api().get(`api/profiles/${id}`, config );
    }

};
