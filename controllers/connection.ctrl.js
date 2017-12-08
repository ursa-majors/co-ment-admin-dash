/*
   route handlers for connection CRUD
*/

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
        .exec()
        .then( (conns) => {

            return res
                .status(200)
                .json({ connections: conns });

        })
        .catch( (error) => {

            console.log(`Error: $(error)`);
            return res
                .status(400)
                .json({ message : 'Error: Cannot get connections' });

    });

}


// GET ONE CONNECTION
//   Example: GET >> /api/connections/9as9asd098asd098asd098asd
//   Secured: yes, valid JWT required
//   Returns: array of connections on success
//
function getOneConnection(req, res) {

    Connection.findById(req.body.id)
        .exec()
        .then( (conn) => {

            return res
                .status(200)
                .json(conn);

        })
        .catch( (error) => {

            console.log(`Error: $(error)`);
            return res
                .status(400)
                .json({ message : 'Error: Cannot get connections' });

    });

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

    const options = {
        new: true  // return updated document rather than original
    };

    Connection.findOneAndUpdate(target, update, options)
        .exec()
        .then( (conn) => {
            return res
                .status(200)
                .json({ conn });
        })
        .catch( (err) => {
            console.log('Error!!!', err);
            return res
                .status(400)
                .json({ message: err });
        });
}


/* ============================== EXPORT API =============================== */

module.exports = { getConnections, getOneConnection, updateConnection };
