
import mongoose from "mongoose";
import 'dotenv/config';


const connectDB = async()=>{
    try {
        const uri = `${process.env.MONGOURI}/${process.env.MONGO_DATA}`
        const conn = await mongoose.connect(uri)
        console.log(`NotificationDB connected : ${conn.connection.host}`)
    } catch (e:any) {
        console.log(e)
        process.exit(1)
    }
}

export {connectDB}