const express = require('express')
const { engine } = require('express-handlebars')
const restaurantsData = require('./public/jsons/restaurant.json').results
const app = express()
const port = 3000

// app.METHOD(PATH,HANDLER) path是endpoint；handler是一個function，一旦伺服器在app.listen(指定的port收到method與path的請求，就會執行handler function來回應請求。

app.engine('.hbs', engine({extname: '.hbs'})) //engine就是告訴express我要用樣板引擎handlebars
app.set('view engine', '.hbs') //set?
app.set('views', './views') //View文件的存放位置。
app.use(express.static('public')) //靜態資源(圖像、CSS 文件和客戶端JavaScript文件等)的根目錄設置為 'public' 目錄

app.get('/', (req, res) => {
    res.render('index', { restaurantsData }) //將restaurant.json的資料丟進index
  })


  app.get("/search", (req, res) => {
    const keywords = req.query.keywords
    const keyword = req.query.keywords.trim().toLowerCase()
    if (!req.query.keywords) {
      return res.redirect("/") //redirect就是若找不到或無法進入就自動導至"/"
    }

    const filterRestaurantsData = restaurantsData.filter(
      (data) =>
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

  //  app.listen(port,callbackFn)一旦伺服器開始監聽指定的port，callbackFn就會被執行。
  app.listen(port, () => {
    console.log(`Express server is running on http://localhost:${port}`)
  })