/*
   secured routes to handle database queries
*/

/* ================================= SETUP ================================= */

const router = require('express').Router();
const jwt    = require('express-jwt');
const secret = process.env.JWT_SECRET;
const auth   = jwt({ secret: secret, requestProperty: 'token' });


/* =========================== LOAD CONTROLLERS ============================ */

const profileCtrl      = require('../controllers/profile.ctrl');
const postCtrl         = require('../controllers/post.ctrl');
const connectionCtrl   = require('../controllers/connection.ctrl');
const conversationCtrl = require('../controllers/conversation.ctrl');
const logCtrl          = require('../controllers/log.ctrl');


/* =========================== ROUTE MIDDLEWARE ============================ */

// Validity JWT tokens in http requests
router.use(auth);


/* ================================ ROUTES ================================= */

// Get all user profiles
// Returns an array of user profile objects
router.get('/profiles', profileCtrl.getProfiles);


// Get one user profile
// Returns JSON user profile object on success
router.get('/profiles/:id', profileCtrl.getOneProfile);


// Update one user profile.
// Returns updated JSON user profile object on success.
router.put('/profiles/:id', profileCtrl.updateProfile);


// Delete one user and soft-delete their posts
// Returns deleted user profile
router.delete('/profiles/:id', profileCtrl.deleteProfile);


// Get posts
// Returns JSON array of 'post' objects on success.
router.get('/posts', postCtrl.getPosts);


// Get one post
// Returns JSON 'post' object on success.
router.get('/posts/:id', postCtrl.getOnePost);


// Update a post
// Returns updated post object
router.put('/posts/:id', postCtrl.updatePost);


// Delete a post
// Returns deleted post object
router.delete('/posts/:id', postCtrl.deletePost);


// Get all connections
// Returns array of JSON 'connection' objects
router.get('/connections', connectionCtrl.getConnections);


// Get one connection
// Returns JSON 'connection' object
router.get('/connections/:id', connectionCtrl.getOneConnection);


// Update a connection record
// Returns updated connection document on success.
router.put('/connections/:id', connectionCtrl.updateConnection);


// Get all conversations
// Returns array of JSON conversation objects
router.get('/conversations', conversationCtrl.getConversations);


// Get one conversation
// Returns JSON conversation object
router.get('/conversations/:id', conversationCtrl.getOneConversation);


// Get all logs
// Returns array of JSON log objects
router.get('/logs', logCtrl.getLogs);


// Get one log
// Returns JSON log object
router.get('/logs/:id', logCtrl.getOneLog);


/* ================================ EXPORT ================================= */

module.exports = router;
