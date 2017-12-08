/*
   route controllers to handle in-app messaging CRUD
*/


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


/* Add array of messages to conversations
 * If 'convos' is an array, return summary list of conversations.
 * If 'convos' is an object, return conversation with messages and
 * set message 'unread' to false
 *
 * @params    [object]   convos   [array of conv objects or single conv object]
 * @params    [string]   user     [user's '_id']
 * @returns   [object]            [populated conversation(s)]
*/
function populateMessages(convos, user) {

    let convIsArray = Array.isArray(convos);

    if (convIsArray) {
        return Message.find({ $or: [ { author : user }, { recipient : user } ]})
            .sort({ createdAt: -1 })
            .exec()
            .then( msgs => {

                return convos.map( c => {
                    let messages = msgs.filter( m => {
                        return m.conversation.toString() === c._id.toString();
                    });
                    return {
                        _id          : c._id,
                        subject      : c.subject,
                        participants : c.participants,
                        startDate    : c.startDate,
                        messages     : messages
                    };
                });

        });
    } else {
        return Message.find({ conversation : convos._id })
            .exec()
            .then( msgs => {

                return {
                    _id          : convos._id,
                    subject      : convos.subject,
                    participants : convos.participants,
                    startDate    : convos.startDate,
                    messages     : msgs
                };

        });
    }

}


/* ============================ ROUTE HANDLERS ============================= */

// GET CONVERSATIONS
//   Example: GET >> /api/conversations
//   Secured: yes, valid JWT required
//   Expects:
//     1) user '_id' from JWT token
//   Returns: array of user's conversations with most recent messages.
//
function getConversations(req, res) {

    Conversation.find({ participants: req.token._id })
        .select('subject startDate messages participants')

        // add conversation participant details
        .populate({
            path   : 'participants',
            select : 'username name avatarUrl'
        })
        .exec()

        // add messages to each conversation in the results array
        .then( convos => populateMessages(convos, req.token._id) )

        // get unreads and filter messages
        .then( convos => formatConvData(convos, req.token._id) )

        .then( data => {
            // set user's alreadyContacted flag to false so they rec
            // reminders of new messages
            User.findByIdAndUpdate(
                req.token._id,
                { $set : {'contactMeta.alreadyContacted' : false }}
            ).exec();

            // return response
            return res.status(200).json(data);
        })
        .catch( err => {
            return res
                .status(400)
                .json({ message: err });
        });
}


// GET A CONVERSATION AND ITS MESSAGES
//   Example: GET >> /api/conversations/:id
//   Secured: yes, valid JWT required
//   Expects:
//     1) conversation '_id' from the request params
//   Returns: array of messages from single conversation.
//
function getOneConversation(req, res) {

    Conversation.findById(req.params.id)
        .select('subject startDate messages participants')
        .populate({
            path : 'participants',
            select: 'username name avatarUrl'
        })
        .exec()

        // add messages array to the conversation
        .then( convo => populateMessages(convo, req.token._id) )

        .then( data => res.status(200).json(data) )
        .catch( err => {
            return res
                .status(400)
                .json({ message: err });
        });
}


/* ============================== EXPORT API =============================== */

module.exports = { getConversations, getOneConversation };
