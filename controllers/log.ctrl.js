
/* ================================= SETUP ================================= */

const Log = require('../models/log');


/* ============================ ROUTE HANDLERS ============================= */

// GET LOGS
//   Example: GET >> /api/logs
//   Secured: yes, valid JWT required
//     1) Optional query params:
//        * sort  : String, default 'username'
//        * skip  : String, default 0
//        * limit : String, default 20
//   Returns: array of JSON log objects
//
function getLogs(req, res) {

    const sort  = req.query.sort || 'createdAt';
    const skip  = parseInt(req.query.skip)  || 0;
    const limit = parseInt(req.query.limit) || 20;

    Log.find({})
        .select('-__v')
        .sort({ sort : 1 })
        .skip(skip)
        .limit(limit)
        .exec()
        .then( data => {
            return res.status(200).json({
                total : data.length,
                logs  : data
            })
        })
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
