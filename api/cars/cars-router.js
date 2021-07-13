const router = require('express').Router()
const Car = require('./cars-model')
const md = require('./cars-middleware')

router.get('/', (req, res, next) => {
    console.log('GET all connected')
})

router.get('/:id', (req, res, next) => {
    console.log('GET by id connected')
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