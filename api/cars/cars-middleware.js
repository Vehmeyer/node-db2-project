const Car = require('./cars-model')
const vinValidator = require('vin-validator')

const error = { status: 400 }

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
  const { vin, make, model, mileage } = req.body
  if (!vin || !make || !model || !mileage) {
    error.message = "<field name> is missing"
    // error.message = `${} is missing`
  }

  if (error.message) {
    next(error)
  } else {
    next()
  }
}

const checkVinNumberValid = (req, res, next) => {
  const { vin } = req.body
  const isVinValid = vinValidator.validate(vin)
  if (!isVinValid) {
    error.message = `vin ${vin} is invalid`
  }

  if (error.message) {
    next(error)
  } else {
    next()
  }
}

const checkVinNumberUnique = (req, res, next) => {
  // DO YOUR MAGIC
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
}