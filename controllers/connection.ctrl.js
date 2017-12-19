
/* ================================= SETUP ================================= */

const Connection = require('../models/connection');


/* ============================ ROUTE HANDLERS ============================= */

// GET ALL CONNECTIONS
//   Example: GET >> /api/connections
//   Secured: yes, valid JWT required
//   Returns: array of connections on success
//
function getConnections(req, res) {

    Connection.find({})
        .select('-__v')
        .exec()
        .then( (conns) => res.status(200).json(conns) )
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

    Connection.findOneAndUpdate(target, update, options)
        .exec()
        .then( (conn) => res.status(200).json(conn) )
        .catch( (err) => res.status(400).json(err) );

}


/* ============================== EXPORT API =============================== */

module.exports = { getConnections, getOneConnection, updateConnection };
