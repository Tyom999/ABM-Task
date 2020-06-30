const {check} = require('express-validator');

const rules = [
    check('mark')
        .not()
        .isEmpty()
        .withMessage('Mark is required'),
    check('model')
        .not()
        .isEmpty()
        .withMessage('Model is required'),
    check('year')
        .not()
        .isEmpty()
        .withMessage('Year is required'),
    check('color')
        .not()
        .isEmpty()
        .withMessage('Year is required'),
    check('price')
        .not()
        .isEmpty()
        .withMessage('Price is required'),
    check('typeCar')
        .not()
        .isEmpty()
        .withMessage('typeCar should be Sale or Rent'),


];

module.exports = {
    rules
};
