// hits 'api/profiles' endpoints

import Api from '@/services/Api';

/** GET ALL PROFILES
 *  @param     {String}   token   JWT token from local storage
 *  @returns   {Promise}          Promise + payload: JSON array of profiles
*/
export function getProfiles (token) {
    const config = {
        headers: { 'Authorization': `Bearer ${token}` }
    };
    return Api()
        .get( 'api/profiles', config )
        .then( response => response.data );
}


/** GET ALL PROFILES
 *  @param     {String}   id      _id of the profile to fetch
 *  @param     {String}   token   JWT token from local storage
 *  @returns   {Promise}          Promise + payload: JSON profile
*/
export function getOneProfile (id, token) {
    const config = {
        headers: { 'Authorization': `Bearer ${token}` }
    };
    return Api()
        .get( `api/profiles/${id}`, config )
        .then( response => response.data );
}
