/*
   route handlers to serve static client files
*/

/* ================================= SETUP ================================= */

const path   = require('path');


/* ============================ ROUTE HANDLERS ============================= */


// SERVE CLIENT SPA
//
function serveClient(req, res) {
    res.status(200)
        .sendFile(path.join(__dirname, '../client/dist/index.html'));
}


/* ============================== EXPORT API =============================== */

module.exports = { serveClient };
