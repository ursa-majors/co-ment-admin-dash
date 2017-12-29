// hits 'api/conversation' endpoints

import Api from '@/services/Api';

/** GET ALL CONVERSATIONS
 *  @param     {String}   token   JWT token from local storage
 *  @param     {String}   sort    Which field to sort on
 *  @param     {String}   skip    Page of results to fetch (skip)
 *  @param     {String}   limit   Size of desired results set
 *  @returns   {Promise}          Promise + payload: JSON array of conversations
*/
export function getAllConversations(token, sort, skip, limit) {
    const config = {
        headers : { Authorization: `Bearer ${token}` },
        params  : { sort, skip, limit }
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
