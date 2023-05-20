require("dotenv").config()
const express = require('express')
const { default: mongoose } = require('mongoose') //import mongoose
const BoneSchema = require('./Number')
const cors = require("cors")
const app = express()
const port = 5500

mongoose.connect(process.env.MONGO_DB_URI)
  .then((res) => console.log("Server connected"))
  .catch((err) => console.log("Server disconnected"))

app.use(express.json()) //intilaize json
app.use(cors())

app.get('/', (req, res) => {
  BoneSchema.find({}).then((response) => {
    const arr = []
    console.log(response)
    const DateToday = new Date()
    const TodayYear = DateToday.getFullYear()
    for (let i = 0; i < response.length; i++) {
      const element = response[i];
      let date = element.date
      date = date.split(" ")
      console.log(element.date)
      let obj = {
        id: element._id,
        number: element.num,
        paper: "1500",
        date: date,
      }
      if (TodayYear == date[3]) {
        obj.year = "Current"
        if (String(DateToday).split(" ")[1] == date[1]) {
          obj.status = "Current"
        } else {
          obj.status = date[1]
        }
      } else {
        obj.year = date[3]
      }
      arr.push(obj)
    }
    res.json({
      data: arr
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})