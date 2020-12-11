const express = require('express')
const path = require('path')
const getForecast = require('./utils/forecast')

// create express app
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.static(path.join(__dirname, 'build')))

app.get('/', (req, res) => {
  res.send('Hello')
})

app.get('/forecast', async (req, res) => {
  const city = req.query.city
  try {
    const { status, current, location } = await getForecast(city)
    res.send({ status, current, location })
  } catch (e) {
    res.send(e)
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}!`)
})
