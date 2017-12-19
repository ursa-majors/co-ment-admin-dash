// hits 'api/connections' endpoints

import Api from '@/services/Api';

/** GET ALL CONNECTIONS
 *  @param     {String}   token   JWT token from local storage
 *  @returns   {Promise}          Promise + payload: JSON array of connections
*/
export function getConnections(token) {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    return Api()
        .get('api/connections', config)
        .then(response => response.data);
}


/** GET ONE CONNECTION
 *  @param     {String}   token   JWT token from local storage
 *  @param     {String}   id      _id of the connection to fetch
 *  @returns   {Promise}          Promise + payload: JSON connection
*/
export function getOneConnection(token, id) {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    return Api()
        .get(`api/connections/${id}`, config)
        .then(response => response.data);
}
