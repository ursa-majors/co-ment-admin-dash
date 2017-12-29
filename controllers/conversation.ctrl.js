
/* ================================= SETUP ================================= */

const Conversation        = require('../models/conversation');
const Message             = require('../models/message');
const User                = require('../models/user');


/* ============================ ROUTE HANDLERS ============================= */

// GET CONVERSATIONS
//   Example: GET >> /api/conversations?
//   Secured: yes, valid JWT required
//   Expects:
//     1) Optional query params:
//        * sort  : String, default 'startDate'
//        * skip  : String, default 0
//        * limit : String, default 20

//   Returns: array of JSON objects with conversation metadata
//
function getConversations(req, res) {

    const sort  = req.query.sort || 'startDate';
    const skip  = parseInt(req.query.skip)  || 0;
    const limit = parseInt(req.query.limit) || 20;

    const pipeline = [
        { $project : { subject: 1, participants: 1 }},
        { $lookup  : { // returns an array
            from         : 'users',
            localField   : 'participants',
            foreignField : '_id',
            as           : 'participants'
        }},
        { $sort    : { startDate: 1 } },
        { $group   : {
            _id      : null,
            total    : { $sum: 1 },        // count results
            allConvs : { $push: '$$ROOT' } // keep array of all conversations
        }},
        { $project : {
            total  : 1, // always return total count
            convos : {
                $slice : [ '$allConvs', skip, limit ] // filter
            }
        }}
    ];

    Conversation.aggregate(pipeline)
        .exec()
        .then( ([{total, convos}]) => res.status(200).json({total, convos}) )
        .catch( (err) => res.status(400).json(err) );
}


// GET A CONVERSATION AND ITS MESSAGES
//   Example: GET >> /api/conversations/:id
//   Secured: yes, valid JWT required
//   Expects:
//     1) conversation '_id' from the request params
//   Returns: conversaion + array of messages
//
function getOneConversation(req, res) {

    Conversation.findById(req.params.id)
        .select('subject startDate messages participants')
        .populate({
            path   : 'participants',
            select : 'username name avatarUrl'
        })
        .exec()

        // add messages array to the conversation
        .then( convo => {
            return Message
                .find({ conversation : convo._id })
                .select('-conversation -__v')
                .exec()
                .then( msgs => {

                    return {
                        _id          : convo._id,
                        subject      : convo.subject,
                        participants : convo.participants,
                        startDate    : convo.startDate,
                        messages     : msgs
                    };

            });
        })

        .then( (conv) => res.status(200).json(conv) )
        .catch( (err) => res.status(400).json(err) );

}


/* ============================== EXPORT API =============================== */

module.exports = { getConversations, getOneConversation };
