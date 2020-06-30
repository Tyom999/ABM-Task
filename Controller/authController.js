const Users = require('../models/Users');
const bcryptJs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const {validationResult} = require('express-validator');

module.exports = {
    signIn: async (req, res) => {
        let thisUser = await Users.findOne({email: req.body.email});
        if (thisUser) {
            let password = bcryptJs.compareSync(req.body.password, thisUser.password);
            if (password) {
                let token = jwt.sign({
                        email: thisUser.email
                    },
                    keys.jwt_key, {expiresIn: '20m'});
                thisUser.token = token;
                try {
                    await Users.findByIdAndUpdate(
                        {_id: thisUser._id},
                        {$set: thisUser},
                        {new: true}
                    );
                    res.status(201).json({
                        token
                    });
                } catch (e) {
                    res.status(500).json({
                        msg: 'Error: Something went wrong'
                    })
                }
            } else {
                res.status(401).json({
                    msg: 'Error: Password is wrong'
                });
            }
        } else {
            res.status(404).json({
                msg: 'Error: User didnt find'
            });
        }
    },

    signUp: async (req, res) => {

        let thisUser = await Users.findOne({email: req.body.email});

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array()});
        }

        if (thisUser) {
            res.status(401).json({
                msg: 'Error: This email is busy'
            })
        } else {
            const salt = await bcryptJs.genSalt(10);
            const hashPassword = await bcryptJs.hash(req.body.password, salt);

            let newUser = {
                name: req.body.name,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hashPassword
            };
            try {
                new Users(newUser).save();
                res.status(201).json(newUser)
            } catch (e) {
                res.status(500).json({
                    msg: 'Error: Something went wrong'
                })
            }
        }
    },

    logout: async (req, res) => {
        let thisUser = await Users.findOne({token: req.headers.token});
        if (thisUser) {
            thisUser.token = null;
            await Users.findByIdAndUpdate(
                {_id: thisUser._id},
                {$set: thisUser},
                {new: true});
            res.status(201).json({
                msg: 'Success: Logout'
            })
        } else {
            res.status(404).json({
                message: 'Error: You didnt login'
            })
        }
    }
};
