
/* ================================= SETUP ================================= */

const Connection = require('../models/connection');


/* ============================ ROUTE HANDLERS ============================= */

// GET ALL CONNECTIONS
//   Example: GET >> /api/connections?
//   Secured: yes, valid JWT required
//   Expects:
//     1) Optional query params:
//        * sort  : String, default 'dateStarted'
//        * skip  : String, default 0
//        * limit : String, default 20
//   Returns: array of connections on success
//
function getConnections(req, res) {

    const sort  = req.query.sort || 'dateStarted';
    const skip  = parseInt(req.query.skip)  || 0;
    const limit = parseInt(req.query.limit) || 20;

    const pipeline = [
        { $project : {
            dateStarted : 1,
            initiator   : 1,
            mentee      : 1,
            mentor      : 1
        }},
        { $sort    : { dateStarted: 1 } },
        { $group   : {
            _id      : null,
            total    : { $sum: 1 },        // count results
            allConns : { $push: '$$ROOT' } // keep array of all connections
        }},
        { $project : {
            total  : 1, // always return total count
            conns  : {
                $slice : [ '$allConns', skip, limit ] // filter
            }
        }}
    ];

    Connection.aggregate(pipeline)
        .exec()
        .then( ([{total, conns}]) => res.status(200).json({total, conns}) )
        .catch( (err) => res.status(400).json(err) );

}


// GET ONE CONNECTION
//   Example: GET >> /api/connections/9as9asd098asd098asd098asd
//   Secured: yes, valid JWT required
//   Expects:
//     1) request params: {
//          id : String
//     }
//   Returns: array of connections on success
//
function getOneConnection(req, res) {

    Connection.findById(req.params.id)
        .select('-__v')
        .exec()
        .then( (conn) => res.status(200).json(conn) )
        .catch( (err) => res.status(400).json(err) );

}


// Update a connection
//   Example: PUT >> /api/connections/9as9asd098asd098asd098asd
//   Secured: yes, valid JWT required
//   Expects:
//     1) request body properties : {
//          type : String
//          etc ?...
//        }
//   Returns: updated connection record on success
//
function updateConnection(req, res) {

    const target = { _id: req.body.id };

    // map enumerable req body properties to updates object
    const updates = Object.assign({}, req.body);

    const options = { new: true };

    Connection.findOneAndUpdate(target, updates, options)
        .exec()
        .then( (conn) => res.status(200).json(conn) )
        .catch( (err) => res.status(400).json(err) );

}


/* ============================== EXPORT API =============================== */

module.exports = { getConnections, getOneConnection, updateConnection };
