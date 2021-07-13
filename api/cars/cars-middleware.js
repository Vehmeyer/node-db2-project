const Car = require('./cars-model')
const vinValidator = require('vin-validator')
const db = require('../../data/db-config')

// const error = { status: 400 }

const checkCarId = async (req, res, next) => {
  try {
    const car = await Car.getById(req.params.id)
    if (!car) {
      res.status(404).json({
        message: `car with id ${req.params.id} is not found`
      })
    } else {
      req.car = car
      next()
    }
  } catch (err) {
    next(err)
  }
}

const checkCarPayload = (req, res, next) => {
  // const { vin, make, model, mileage } = req.body
  if (!req.body.vin) return next({
    status: 400,
    message: "vin is missing"
    })
  if (!req.body.make) return next({
    status: 400,
    message: "make is missing"
    })
  if (!req.body.model) return next({
    status: 400,
    message: "model is missing"
    })
  if (!req.body.mileage) return next({
    status: 400,
    message: "mileage is missing"
    })
    next()
}
  // } else if (!make) {
  //   error.message = `${make} is missing` 
  // } else if (!model) {
  //   error.message = `${model} is missing`
  // } else if (!mileage) {
  //   error.message = `${mileage} is missing`
  // }

  // if (error.message) {
  //   next(error)
  // } else {
  //   next()
  // }

  // const { vin } = req.body
  // if (!vin) {
  //   res.status(400).json({message: "vin is missing"})
  // } else {
  //   next()
  // }


const checkVinNumberValid = (req, res, next) => {
  // const { vin } = req.body
  // const isVinValid = vinValidator.validate(req.body.vin)
  // if (!isVinValid) {
  //   error.message = `vin ${req.body.vin} is invalid`
  // }

  // if (error.message) {
  //   next(error)
  // } else {
  //   next()
  // }
   if(vinValidator.validate(req.body.vin)) {
     next()
   } else {
     next({
       status: 400,
       message: `vin ${req.body.vin} is invalid`,
     })
   }
}

const checkVinNumberUnique = async (req, res, next) => {
  try {
    const existingVin = await db('cars').where('vin', req.body.vin).first()
    
    if (existingVin) {
      res.status(400).json({message: `vin ${req.body.vin} already exists` })
    } else {
      next()
    }
  } catch (err) {
    next(err)
  }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
}