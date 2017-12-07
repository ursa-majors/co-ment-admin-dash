/*
   non-secured routes to serve static client SPA
*/

/* ================================= SETUP ================================= */

const router = require('express').Router();
const path   = require('path');


/* =========================== INIT CONTROLLERS ============================ */

const staticCtrl = require('../controllers/static.ctrl');


/* ================================ ROUTES ================================= */

// Serve client frontend.
router.get('/', staticCtrl.serveClient);


/* ================================ EXPORT ================================= */

module.exports = router;
