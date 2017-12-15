// hits 'api/posts' endpoints

import Api from '@/services/Api';

/** GET ALL POSTS
 *  @param     {String}   token   JWT token from local storage
 *  @returns   {Promise}          Promise + payload: JSON array of posts
*/
export function getPosts(token) {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    return Api()
        .get('api/posts', config)
        .then(response => response.data);
}


/** GET ONE POST
 *  @param     {String}   token   JWT token from local storage
 *  @param     {String}   id      _id of the post to fetch
 *  @returns   {Promise}          Promise + payload: JSON post
*/
export function getOnePost(token, id) {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    return Api()
        .get(`api/posts/${id}`, config)
        .then(response => response.data);
}
