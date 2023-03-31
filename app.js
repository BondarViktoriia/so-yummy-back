const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const authRouter = require('./routes/api/auth')
const subscribeRouter = require('./routes/api/subscribe')
const recipesRouter = require('./routes/api/recipes')
const ingredientsRouter = require('./routes/api/ingredients')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRouter);
app.use("/api/subscribe", subscribeRouter);
app.use('/api/recipes', recipesRouter);
app.use('/api/ingredients', ingredientsRouter);




app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

module.exports = app
