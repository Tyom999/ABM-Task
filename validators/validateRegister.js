const {check} = require('express-validator');


const rules = [
    check('name')
        .not()
        .isEmpty()
        .withMessage('Name is required')
        .isLength({min: 3})
        .withMessage('Can not be more than 3 characters'),
    check('lastName')
        .not()
        .isEmpty()
        .withMessage('lastName is required')
        .isLength({min: 3})
        .withMessage('Can not be more than 3 characters'),
    check('email')
        .not()
        .isEmpty()
        .withMessage('E-mail is required')
        .isEmail()
        .withMessage('Please provide a valid email address'),
    check('password')
        .isLength({min: 8})
        .withMessage('Can not be more than 8 characters')
        .not()
        .isEmpty()
        .withMessage('Password is required'),
];


module.exports = {
    rules
};
