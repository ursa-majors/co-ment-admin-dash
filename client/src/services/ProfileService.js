// hits 'api/profiles' endpoints

import Api from '@/services/Api';

export default {

    /** GET ALL PROFILES
     *  @param     {String}   token   JWT token from local storage
     *  @returns   {Promise}          Promise + payload: JSON array of profiles
    */
    getProfiles (token) {
        const config = {
            headers: { 'Authorization': `Bearer ${token}` }
        };
        return Api()
            .get( 'api/profiles', config )
            .then( response => response.data );
    },


    /** GET ALL PROFILES
     *  @param     {String}   id      _id of the profile to fetch
     *  @param     {String}   token   JWT token from local storage
     *  @returns   {Promise}          Promise + payload: JSON profile
    */
    getOneProfile (id, token) {
        const config = {
            headers: { 'Authorization': `Bearer ${token}` }
        };
        return Api()
            .get( `api/profiles/${id}`, config )
            .then( response => response.data );
    }

};
