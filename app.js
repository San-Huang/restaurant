const express = require('express')
const { engine } = require('express-handlebars')
const app = express()
const port = 3000

app.engine('.hbs', engine({extname: '.hbs'}))
app.set('view engine', '.hbs')
app.set('views', './views')
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.redirect('/restaurantList')
})

app.get('/restaurantList', (req, res) => {
    res.render('index')
  })
  
  app.listen(port, () => {
    console.log(`express server is running on http://localhost:${port}`)
  })

  app.get('/restaurantList/:id', (req, res) => {
    const id = req.params.id
    res.send(`read restaurantList: ${id}`)
  })