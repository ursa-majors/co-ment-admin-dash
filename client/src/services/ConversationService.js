// hits 'api/conversation' endpoints

import Api from '@/services/Api';

/** GET ALL CONVERSATIONS
 *  @param     {String}   token   JWT token from local storage
 *  @returns   {Promise}          Promise + payload: JSON array of conversations
*/
export function getConversations(token) {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    return Api()
        .get('api/conversations', config)
        .then(response => response.data);
}


/** GET ONE CONVERSATION
 *  @param     {String}   token   JWT token from local storage
 *  @param     {String}   id      _id of the conversation to fetch
 *  @returns   {Promise}          Promise + payload: JSON conversation
*/
export function getOneConversation(token, id) {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    return Api()
        .get(`api/conversations/${id}`, config)
        .then(response => response.data);
}
