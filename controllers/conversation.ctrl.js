
/* ================================= SETUP ================================= */

const Conversation        = require('../models/conversation');
const Message             = require('../models/message');
const User                = require('../models/user');


/* =============================== UTILITIES =============================== */

/* Count unread messages where the user = 'recipient'
 * @param     [array]    collection   [array of elements we want to filter]
 * @param     [string]   user         [user's _id]
 * @returns   [number]                [number of unread messages]
*/
function countUnreads(collection, user) {
    return collection.filter( el => {
        return el.unread && el.recipient.toString() === user;
    }).length;
}


/* Build 'getConversations' response object from conversations array
 * @params    [array]   convs   [array of conversation objects]
 * @returns   [object]          [formatted response]
 *
 *   {
 *      totalMessages : Number,
 *      totalUnreads  : Number,
 *      conversations : [
 *          {
 *              _id         : String,
 *              subject     : String,
 *              startDate   : String,
 *              qtyMessages : Number,
 *              qtyUnreads  : Number,
 *              latestMessage : {
 *                  _id       : String,
 *                  updatedAt : String,
 *                  createdAt : String,
 *                  body      : String,
 *                  author    : String,
 *                  recipient : String,
 *                  unread    : Boolean
 *              },
 *              participants : [
 *                  {
 *                      _id       : String,
 *                      username  : String,
 *                      name      : String,
 *                      avatarUrl : String
 *                  }...
 *              ]
 *          }
 *      ]
 *   }
*/
function formatConvData(convs, user) {

    // count all messages
    const totalMessages = convs.reduce( (sum, conv) => {
        return sum + conv.messages.length;
    }, 0);

    // count unread messages where user is the recipient
    const totalUnreads = convs.reduce( (sum, conv) => {
        return sum + countUnreads(conv.messages, user);
    }, 0);

    // remap conversations to include metadata
    const conversations = convs.map( c => {
        return {
            _id           : c._id,
            subject       : c.subject,
            qtyMessages   : c.messages.length,
            qtyUnreads    : countUnreads(c.messages, user),
            startDate     : c.startDate,
            participants  : c.participants,
            latestMessage : c.messages[c.messages.length - 1]
        };
    });

    return { totalMessages, totalUnreads, conversations };
}


/* ============================ ROUTE HANDLERS ============================= */

// GET CONVERSATIONS
//   Example: GET >> /api/conversations
//   Secured: yes, valid JWT required
//   Returns: array of JSON objects with conversation metadata
//
function getConversations(req, res) {

    Conversation.find({})
        .select('subject participants')
        .populate({
            path   : 'participants',
            select : 'username'
        })
        .exec()
        .then( (convs) => res.status(200).json(convs) )
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
