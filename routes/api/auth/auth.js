const express = require('express')

const router = express.Router()

router.post('/signup', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.post('/signin', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.get('/current', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.get('/logout', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.patch('/:id/subscription', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
