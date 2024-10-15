import mongoose from "mongoose";



export const dbConnect = async ()=>{
    try {
     const connectionInstance = await mongoose.connect(process.env.MONGO_URI!)
     const connection = mongoose.connection
     connection.on("connected", ()=>{
        console.log("MongoDb connected")
     })

     connection.on("error", (err)=>{
        console.log("Mogodb connection Error, plese make sure db is up and  runnning", err)
        process.exit(1)
     })
    } catch (error) {
      console.log(`MongoDB connection failed ${error}`) 
    }
}