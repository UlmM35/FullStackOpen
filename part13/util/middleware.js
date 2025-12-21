const jwt = require('jsonwebtoken')
const logger = require('./logger')
const { SECRET } = require('../util/config')
const { Session, User } = require('../models')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'SequelizeValidationError') {
    return response.status(400).send({ errors: error.errors.map(e => e.message) })
  }
  
  return response.status(500).json({
    message: 'Internal server error'
  })
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('Authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch {
      return res.status(401).json({ error: 'token invalid'})
    }
  }  else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}

const sessionValidator = async (req, res, next) => {
  try {
    const auth = req.get('Authorization')
    if (!auth || !auth.toLowerCase().startsWith('bearer ')) {
      return res.status(401).json({ error: 'Token missing' })
    }

    const token = auth.substring(7)
    const decoded = jwt.verify(token, process.env.SECRET)

    const session = await Session.findOne({ where: { token } })
    if (!session) return res.status(401).json({ error: 'Token invalid or logged out' })

    const user = await User.findByPk(decoded.id)
    if (!user || user.disabled) return res.status(403).json({ error: 'User disabled' })

    req.user = user
    req.token = token
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    sessionValidator
}