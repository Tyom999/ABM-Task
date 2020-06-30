const Users = require('../models/Users');
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    if (req.headers.token) {
        let thisUser = await Users.findOne({token: req.headers.token});
        if (thisUser) {
            const exp = jwt.decode(req.headers.token);
            if (Date.now() >= exp * 1000) {
                res.status(403).json({
                    msg: "Error: Expired session"
                })
            } else {
                next();
            }
        } else {
            res.status(403).json({
                msg: "Error: User token is old"
            })
        }
    } else {
        res.status(403).json({
            msg: "Error: User didnt login"
        })
    }
};
