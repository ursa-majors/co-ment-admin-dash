/*
   functions to handle user signup, login and password reset
*/

/* ================================= SETUP ================================= */

const passport = require('passport');
const User     = require('../models/user');


/* ============================ ROUTE HANDLERS ============================= */

// LOGIN
//   Example: POST >> /api/login
//   Secured: no
//   Expects:
//     1) request body params : {
//          username : String
//          password : String
//        }
//   Returns: success status, user profile & JWT on success
//
function login(req, res, next) {
    
    // fail if missing required inputs
    if (!req.body.username || !req.body.password) {
        return res
            .status(400)
            .json({ 'message': 'Please complete all required fields.'});
    }

    passport.authenticate('local', (err, user, info) => {
    
        if (err) { return next(err); }

        // if auth failed, there will be no user - fail
        if (!user) {
            return res
                .status(401)
                .json(info);

        } else {

            // exclude sensitive info from field selection
            const proj  = { hash : 0, salt : 0, signupKey : 0 };

            // find the authenticated user
            User.findById(user._id, proj)
                .exec()
                .then( (profile) => {

                    // generate a token
                    const token = profile.generateJWT();

                    // return the user profile & JWT
                    return res
                        .status(200)
                        .json({
                            'profile' : profile,
                            'token'   : token
                        });

                })
                .catch( err => {
                    console.log('Error!!!', err);
                        return res
                            .status(400)
                            .json({ message: err});
                });

        }

    })(req, res, next);

}


/* ============================== EXPORT API =============================== */

module.exports = { login };
