const express = require('express')
const { engine } = require('express-handlebars')
const restaurantsData = require('./public/jsons/restaurant.json').results
const app = express()
const port = 3000

app.engine('.hbs', engine({extname: '.hbs'})) //告訴express我要用handler
app.set('view engine', '.hbs')
app.use(express.static('public'))

app.get('/restaurantList', (req, res) => {
    res.render('index', { restaurantsData }) //將restaurant.json的資料丟進index
  })


app.get("/search", (req, res) => {
    const keywords = req.query.keywords
    const keyword = req.query.keywords.trim().toLowerCase()
    
    if (!req.query.keywords) {
      return res.redirect("/")
    }
  
    const filterRestaurantsData = restaurantsData.filter(
      data =>
        data.name.toLowerCase().includes(keyword) ||
        data.category.includes(keyword)
    )
  
    res.render("index", { restaurantsData: filterRestaurantsData, keywords })
  })


  app.get("/restaurants/:restaurantId", (req, res) => {
    const { restaurantId } = req.params
    const restaurantData = restaurantsData.find(
      data => data.id === Number(restaurantId)
    )
    res.render("show", { restaurantData })
  })


  app.listen(port, () => {
    console.log(`Express server is running on http://localhost:${port}`)
  })