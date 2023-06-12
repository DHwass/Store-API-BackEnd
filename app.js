//private data
require('dotenv').config()
//express
const express=require('express')
const app=express()
app.use(express.json())
//router
const router=require('./routes/route')
//Database connection
const connectDB=require('./db/connect')
//error handling middleware
require('express-async-errors')
//Router
app.use('/product',router)

//unknown paths
const notFound=require('./middleware/not-found')
app.use(notFound)


//DB connection / server starting
 const connect=async()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(4000,()=>{
           console.log("Sevver is listening on port 4000")
       }) 
    } catch (error) {
        console.log(error)
    }
    
}

connect()