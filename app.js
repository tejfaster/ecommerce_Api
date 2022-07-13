const express = require('express')
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const userRoute = require('./routes/auth')
//dotenv config
dotenv.config()

//MongoDb config
mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("DB is connected successfull")).catch(err => console.log(err.message))

//app config
const app = express()
app.use(bodyparser.json())

app.get('/',(req,res)=>{
    res.send('<h1>Hello world</h1>')
})
app.use('/admin',userRoute)
//app listening
app.listen(process.env.PORT,console.log("Server is running at",process.env.PORT))