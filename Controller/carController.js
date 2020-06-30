const Cars = require('../models/Cars');
const {validationResult} = require('express-validator');

module.exports = {
    getAllCars: async (req, res) => {
        try{
            let cars = await Cars.find({})
                 .select('_id mark model price productImage');
            res.status(201).json({
                msg: 'All Cars',
                cars
            });
        } catch (e) {
            res.status(409).json({
            msg: 'Error: Something went wrong'
            })
        }
    },

    getCarById: async (req, res) => {
        try {
            let post = await Cars.findOne({_id: req.params.id})
                .select('_id mark model year price engine');
            res.status(201).json({
                post,
                request: {
                    type: "GET",
                    url: "http://localhost:3000/api/getAllCars"
                }
            })
        } catch (e) {
            res.status(409).json({
                msg: 'Error: Get car by id'
            })

        }
    },

    addCar: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array()});
        }

        try{
           const newCar = await  Cars.create({
               typeCar: req.body.typeCar,
               mark: req.body.mark,
               model: req.body.model,
               year: req.body.year,
               color: req.body.color,
               engine: req.body.engine,
               gearbox: req.body.gearbox,
               price: req.body.price,
               productImage: req.files.map(file =>'uploads/' + file.filename)
           });
           res.status(201).json({
               msg: 'Created a new car',
               newCar,
               request: {
                   type: "POST",
                   url: "http://localhost:3000/api/getCarById/" + newCar._id
               }
           })
       } catch (e) {
           res.status(500).json({
               error: e
           });
       }
    },
    updateCar: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array()});
        }

            try {
                await Cars.updateOne({_id: req.params.id}, req.body, () => {
                    res.status(201).json({
                        msg: 'Updated successfully'
                    })
                }).save();
            } catch (e) {
                res.status(409).json({
                    error: e
                });
            }
    },

    deleteCar: async (req, res) => {
        try{
            await Cars.remove({_id:req.params.id}, req.body,()=>{
                res.status(201).json({
                    msg:'Deleted success'
                })
            })
        }catch (e) {
            res.status(409).json({
                error: e
            })

        }
    }

};
