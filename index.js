import dotenv from 'dotenv'
import app from "./app.js"
import connectDb from "./src/db/connectDb.js"

connectDb()
.then(()=>{
    app.listen(process.env.PORT, ()=>{
        console.log(`⚙️  Server is running on Port : ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("Error connecting to the database: ", err)
})