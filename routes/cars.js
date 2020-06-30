const {Router} = require('express');
const router = Router();
const carController = require('../Controller/carController');
const upload = require('../middleware/upload');
const jwtCompare = require('../middleware/jwtCompare');
const carsValidator = require('../validators/validateCars');

// router.use(jwtCompare);

router.get('/getAllCars', carController.getAllCars);

router.get('/getCarById/:id', carController.getCarById);

router.post('/addCar', upload , carsValidator.rules, carController.addCar);

router.put('/updateCar/:id', carsValidator.rules, carController.updateCar);

router.delete('/deleteCar/:id', carController.deleteCar);


module.exports = router;
