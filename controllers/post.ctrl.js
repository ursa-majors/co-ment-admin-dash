
/* ================================= SETUP ================================= */

const Post = require('../models/post');
const User = require('../models/user');


/* ============================ ROUTE HANDLERS ============================= */

// GET ALL POSTS
//   Example: GET >> /api/posts?
//   Secured: yes, valid JWT required.
//   Expects:
//     1) Optional query params:
//        * sort  : String, default 'username'
//        * skip  : String, default 0
//        * limit : String, default 20
//   Returns: an array of post objects
//
function getPosts(req, res) {

    const sort  = req.query.sort || 'title';
    const skip  = parseInt(req.query.skip)  || 0;
    const limit = parseInt(req.query.limit) || 20;

    const pipeline = [
        { $lookup  : { // returns an array w/1 element in this case
            from         : 'users',
            localField   : 'author',
            foreignField : '_id',
            as           : 'authors'
        }},
        { $project : {
            author: { $arrayElemAt: [ '$authors', 0 ] }, // get 1st element
            title: 1,
            createdAt: 1
        }},
        { $sort    : { createdAt: 1 } },
        { $group   : {
            _id      : null,
            total    : { $sum: 1 },        // count results
            allPosts : { $push: '$$ROOT' } // keep array of all posts
        }},
        { $project : {
            total  : 1, // always return total count
            posts  : {
                $slice : [ '$allPosts', skip, limit ] // filter
            }
        }}
    ];

    Post.aggregate(pipeline)
        .exec()
        .then( ([{total, posts}]) => res.status(200).json({total, posts}) )
        .catch( (err) => res.status(400).json(err) );

}


// GET ONE POST
//   Example: GET >> /api/posts/098d098asd098sd098asd098f
//   Secured: yes, valid JWT required
//   Expects:
//     1) post '_id' from request param
//   Returns: JSON 'post' object on success.
//
function getOnePost(req, res) {

    Post.findById(req.params.id)
        .select('-__v')
        .populate({
            path   : 'author',
            select : '_id name username avatarUrl'
        })
        .exec()
        .then( (post) => res.status(200).json(post) )
        .catch( (err) => res.status(400).json(err) );

}


// UPDATE A POST
//   Example: PUT >> /api/posts/597dd8665229970e99c6ab55
//   Secured: yes, valid JWT required
//   Expects:
//     1) request body properties : {
//          action       : Boolean
//          author       : String
//          role         : String
//          title        : String
//          body         : String
//          excerpt      : String
//          keywords     : Array
//          availability : String
//        }
//   Returns: success message & updated post on success
//
function updatePost(req, res) {

    // Target post by post '_id'
    const target = {
        _id : req.params.id,
    };

    // build new post object from request body and parsed token
    const updates = {
        active       : req.body.active,
        author       : req.token._id,
        role         : req.body.role,
        title        : req.body.title,
        body         : req.body.body,
        excerpt      : req.body.excerpt,
        keywords     : req.body.keywords,
        availability : req.body.availability,
        updatedAt    : new Date().toISOString()
    };

    const options = { new: true };

    Post.findOneAndUpdate(target, updates, options)
        .exec()
        .then( post => {

            if (!post) {

                return res
                    .status(404)
                    .json({ message : 'Post not found!' });

            } else {

                post.populate({
                        path   : 'author',
                        select : 'username name avatarUrl time_zone languages gender'
                    }, (err, populatedPost) => {

                        if (err) { throw new Error(err); }

                        return res.status(200).json(populatedPost);
                    });

            }
        })
        .catch( (err) => res.status(400).json(err) );

}


// DELETE A POST
//   Example: DELETE >> /api/posts/597dd8665229970e99c6ab55
//   Secured: yes, valid JWT required
//   Expects:
//     1) post 'id' from request params
//   Returns: success message & deleted post on success
//
function deletePost(req, res) {

    // Target post by post '_id' and post 'author_id'.
    // This way, users can only delete their own posts.
    const target = {
        _id : req.params.id,
    };

    const updates = {
        deleted   : true,
        active    : false,
        updatedAt : new Date().toISOString()
    };

    const options = { new : true };

    Post.findOneAndUpdate(target, updates, options)
        .exec()
        .then( post => {
            if (!post) {

                return res
                    .status(404)
                    .json({message: 'Post not found!'});

            } else {

                post.populate({
                        path   : 'author',
                        select : 'username name avatarUrl time_zone languages gender'
                    }, (err, populatedPost) => {

                        if (err) { throw new Error(err); }

                        return res.status(200).json(populatedPost);
                    });

            }

        })
        .catch( (err) => res.status(400).json(err) );

}


/* ============================== EXPORT API =============================== */

module.exports = {
    getPosts, getOnePost, updatePost, deletePost
};
