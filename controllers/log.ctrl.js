
/* ================================= SETUP ================================= */

const Log = require('../models/log');


/* ============================ ROUTE HANDLERS ============================= */

// GET LOGS
//   Example: GET >> /api/logs
//   Secured: yes, valid JWT required
//   Returns: array of JSON log objects
//
function getLogs(req, res) {

    Log.find({})
        .select('-__v')
        .exec()
        .then( data => res.status(200).json(data) )
        .catch( err => res.status(400).json(err) );

}


// GET ONE LOG
//   Example: GET >> /api/logs/:id
//   Secured: yes, valid JWT required
//   Expects:
//     1) log '_id' from the request params
//   Returns: log object
//
function getOneLog(req, res) {

    Log.findById(req.params.id)
        .select('-__v')
        .exec()
        .then( data => res.status(200).json(data) )
        .catch( err => res.status(400).json(err) );

}


/* ============================== EXPORT API =============================== */

module.exports = { getLogs, getOneLog };
