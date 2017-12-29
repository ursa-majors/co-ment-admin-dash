// hits 'api/posts' endpoints

import Api from '@/services/Api';

/** GET ALL POSTS
 *  @param     {String}   token   JWT token from local storage
 *  @param     {String}   sort    Which field to sort on
 *  @param     {String}   skip    Page of results to fetch (skip)
 *  @param     {String}   limit   Size of desired results set
 *  @returns   {Promise}          Promise + payload: JSON array of posts
*/
export function getAllPosts(token, sort, skip, limit) {
    const config = {
        headers : { Authorization: `Bearer ${token}` },
        params  : { sort, skip, limit }
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
