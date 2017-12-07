/*
   Non-secured routes to handle user signup and login.
   Admin users will have already registered in co/ment.
*/

/* ================================= SETUP ================================= */

const router = require('express').Router();


/* =========================== INIT CONTROLLERS ============================ */

const authCtrl = require('../controllers/auth.ctrl');


/* ================================ ROUTES ================================= */

// Handle user login
// Returns fail status + info -or- success status + JWT
router.post('/login', authCtrl.login);


/* ============================== EXPORT API =============================== */

module.exports = router;
