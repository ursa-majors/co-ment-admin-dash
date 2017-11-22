/*
    services
*/

/* ============================ PRIVATE METHODS ============================ */

/** Generic AJAX request function
 *  @param     {object}    opts          request options, including:
 *  @param     {string}       .method      GET, POST, etc
 *  @param     {string}       .url         The API endpoint
 *  @param     {str|obj}      .body        Post body
 *  @param     {object}       .headers     Request headers
 *  @returns   {object}                    Promise object
*/
const makeRequest = (opts) => {
    const xhr = new XMLHttpRequest();
    return new Promise(function (resolve, reject) {
        xhr.open(opts.method, opts.url);
        
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(JSON.parse(xhr.responseText));
            } else {
                reject(new Error(`Failed to ${opts.method}: ${opts.url}`));
            }
        };
        
        xhr.onerror = function () {
            reject(new Error(`Failed to ${opts.method}: ${opts.url}`));
        };
        
        if (opts.headers) {
            Object.keys(opts.headers).forEach(function (key) {
                xhr.setRequestHeader(key, opts.headers[key]);
            });
        }
        
        let body = opts.body;
        // Stringify if 'body' is an object
        if (body && typeof body === 'object') {
            body = Object.keys(body)
                .map( key => `${encodeURIComponent(key)}=${encodeURIComponent(body[key])}` )
                .join('&');
        }
        xhr.send(body);
    });
};


/* ============================ PUBLIC METHODS ============================= */

// `get` wrapper function
const get = (url, body, headers) => {

    let opts = {
        method  : 'GET',
        url     : url,
        body    : body,
        headers : headers
    };

    return makeRequest(opts);

};


// `post` wrapper function
const post = (url, body, headers) => {

    let opts = {
        method  : 'POST',
        url     : url,
        body    : body,
        headers : headers
    };

    return makeRequest(opts);

};


/* ================================ EXPORTS ================================ */

export { get, post };
