// hits 'api/logs' endpoints

import Api from '@/services/Api';

/** GET ALL LOGS
 *  @param     {String}   token   JWT token from local storage
 *  @returns   {Promise}          Promise + payload: JSON array of logs
*/
export function getLogs(token) {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    return Api()
        .get('api/logs', config)
        .then(response => response.data);
}


/** GET ONE LOG
 *  @param     {String}   token   JWT token from local storage
 *  @param     {String}   id      _id of the log to fetch
 *  @returns   {Promise}          Promise + payload: JSON log
*/
export function getOneLog(token, id) {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    return Api()
        .get(`api/logs/${id}`, config)
        .then(response => response.data);
}
