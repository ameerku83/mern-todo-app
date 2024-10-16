const  configDotenv  = require('dotenv')
configDotenv.config()
const cookieParser = require('cookie-parser')
const cors =require('cors')
const express=require('express')
const mongoDb = require('./config/mongodb')

const app =express()
app.use(cors(
    {
        origin:['http://localhost:5173'],
        credentials:true
    }
))
const port=process.env.port
app.use(express.json())
app.use(cookieParser())
mongoDb()
const todoRoute=require('./routes/todoRoute')
const userRoute= require('./routes/userRoute')
app.use('/api',todoRoute)
app.use('/',userRoute)


app.listen(port,()=>{
    console.log('server runinng on  '+port);
    
})