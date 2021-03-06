/*
   route handlers for user profile CRUD
   Kudos to this gist for help with the aggregation pipelines
   https://gist.github.com/sdgluck/ce8f9b8b9d64c9e25a1e71d53a5ba128#file-query-js
*/

/* ================================= SETUP ================================= */

const User       = require('../models/user');
const Post       = require('../models/post');
const parseSKill = require('../utils/skills_parser');


/* ============================ ROUTE HANDLERS ============================= */

// GET ALL PROFILES
//   Example: GET >> /api/profiles?
//   Secured: yes, valid JWT required.
//   Expects:
//     1) Optional query params:
//        * sort  : String, default 'username'
//        * skip  : String, default 0
//        * limit : String, default 20
//   Returns: an array of user profile objects
//
function getProfiles(req, res) {

    const sort  = req.query.sort || 'username';
    const skip  = parseInt(req.query.skip)  || 0;
    const limit = parseInt(req.query.limit) || 20;

    const pipeline = [
        { $project : { username: 1, name: 1 } },
        { $sort    : { username: 1 } },
        { $group   : {
            _id      : null,
            total    : { $sum: 1 },        // count results
            allUsers : { $push: '$$ROOT' } // keep array of all users
        }},
        { $project : {
            total  : 1, // always return total count
            users  : {
                $slice : [ '$allUsers', skip, limit ] // filter
            }
        }}
    ];

    User.aggregate(pipeline)
        .exec()
        .then( ([{total, users}]) => res.status(200).json({total, users}) )
        .catch( (err) => res.status(400).json(err) );

}


// GET ONE PROFILE
//   Example: GET >> /api/profile/597dccac7017890bd8d13cc7
//   Secured: yes, valid JWT required.
//   Expects:
//     1) '_id' from request params
//   Returns: user profile object on success
//
function getOneProfile(req, res) {

    const target = req.params.id;

    User.findById(target)
        .select('-signupKey -passwordResetKey -hash -salt -__v')
        .exec()
        .then( (profile) => res.status(200).json(profile) )
        .catch( (err) => res.status(400).json(err) );

}

// UPDATE PROFILE
//   Example: PUT >> /api/profile/597dccac7017890bd8d13cc7
//   Secured: yes, valid JWT required.
//   Expects:
//     1) 'username' from JWT token
//     2) '_id' from request params
//     3) optional request body properties : {
//          name       : String
//          email      : String
//          avatarUrl  : String
//          languages  : Array
//          location   : String
//          gender     : String
//          about      : String
//          skills     : Array
//          time_zone  : String
//          github     : String
//          twitter    : String
//          facebook   : String
//          link       : String
//          linkedin   : String
//          codepen    : String
//        }
//   Returns: success message & updated profile object on success
//
function updateProfile(req, res) {

    const target = { _id : req.params.id };

    // map enumerable req body properties to updates object
    const updates = Object.assign({}, req.body);

    // parse skills array if update includes skills
    if (updates.skills) {
        updates.skills = (updates.skills).map( skill => parseSKill(skill) );
    }

    const options = { new: true };

    User.findOneAndUpdate(target, updates, options)
        .exec()
        .then( user => {

            if (!user) {

                return res
                    .status(404)
                    .json({message: 'User not found!'});

            } else {

                return res
                    .status(200)
                    .json({
                        message : 'User updated!',
                        user    : user
                    });

            }
    })
    .catch( (err) => res.status(400).json(err) );

}


// DELETE A PROFILE
//   Example: DELETE >> /api/profile/597e3dca8167330add4be737
//   Secured: yes, valid JWT required
//   Expects:
//     1) '_id' from request params
//     2) '_id' from JWT
//     3) 'username' from JWT
//   Returns: success message & deleted user profile on success
//
function deleteProfile(req, res) {

    const targetUser = { _id : req.params.id };

    User.findOneAndRemove(targetUser)
        .exec()
        .then( user => {

            if (!user) {

                return res
                    .status(404)
                    .json({message: 'User not found!'});

            } else {

                const postAuthor = {
                    author_id : user._id,
                    author    : user.username
                };

                const updates = {
                    deleted   : true,
                    active    : false
                };

                const options = {
                    multi     : true
                };

                // "delete" all posts from deleted author.
                // Sets "deleted" to true and "active" to false.
                Post.update(postAuthor, updates, options, (err, raw) => {

                    if (err) { throw err; }

                    else {

                        return res
                            .status(200)
                            .json({
                                message : 'User profile deleted!',
                                user    : user
                            });
                    }

                });

            }

        })
        .catch( (err) => res.status(400).json(err) );

}


/* ============================== EXPORT API =============================== */

module.exports = {
    getProfiles,
    getOneProfile,
    updateProfile,
    deleteProfile
};
