// hits 'api/profiles' endpoints

import Api from '@/services/Api';

/** GET ALL PROFILES
 *  @param     {String}   token   JWT token from local storage
 *  @param     {String}   sort    Which field to sort on
 *  @param     {String}   skip    Page of results to fetch (skip)
 *  @param     {String}   limit   Size of desired results set
 *  @returns   {Promise}          Promise + payload: JSON array of profiles
*/
export function getAllProfiles(token, sort, skip, limit) {
    const config = {
        headers : { Authorization: `Bearer ${token}` },
        params  : { sort, skip, limit }
    };
    return Api()
        .get('api/profiles', config)
        .then(response => response.data);
}


/** GET ONE PROFILE
 *  @param     {String}   token   JWT token from local storage
 *  @param     {String}   id      _id of the profile to fetch
 *  @returns   {Promise}          Promise + payload: JSON profile
*/
export function getOneProfile(token, id) {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    return Api()
        .get(`api/profiles/${id}`, config)
        .then(response => response.data);
}
