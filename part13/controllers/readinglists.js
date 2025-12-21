const router = require('express').Router()

const { UserReadings } = require('../models')
const { tokenExtractor, sessionValidator } = require('../util/middleware')

router.post('/', async (req, res, next) => {
  const { blogId, userId } = req.body
  try {
    const reading = await UserReadings.create({
      blogId: blogId,
      userId: userId
    })
    res.json(reading)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', tokenExtractor, sessionValidator, async (req, res, next) => {
  const { read } = req.body
  try {
    const reading = await UserReadings.findOne({
      where: {
        blog_id: req.params.id,
        user_id: req.decodedToken.id
     }
    })

    if (!reading) {
      return res.status(404).json({ error: 'Reading not found' })
    }

    await reading.update({ read: read })

    res.json(reading)
  } catch (error) {
    next(error)
  }
})

module.exports = router