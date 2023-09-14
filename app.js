const express = require('express')
const app = express()
const port = 300

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.send('express app for restaurant list')
  })
  
  app.listen(port, () => {
    console.log(`express server is running on http://localhost:${port}`)
  })

  app.get('/restaurantList/:id', (req, res) => {
    const id = req.params.id
    res.send(`read restaurantList: ${id}`)
  })