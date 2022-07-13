const express = require('express')
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')
const productRoute = require('./routes/product')
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
app.use('/admin',authRoute)
app.use('/user',userRoute)
app.use('/product',productRoute)
//app listening
app.listen(process.env.PORT,console.log("Server is running at",process.env.PORT))