const router = require('express').Router()
const Car = require('./cars-model')
const md = require('./cars-middleware')

router.get('/', async (req, res, next) => {
    try {
        const cars = await Car.getAll()
        res.json(cars)
    } catch (err) {
        next(err)
    }
})

router.get('/:id', md.checkCarId, async (req, res) => {
    res.json(req.car)
})

router.post('/', (req, res, next) => {
    console.log('POST connected')
})

router.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
      message: err.message,
      stack: err.stack,
    })
  })

  module.exports = router;