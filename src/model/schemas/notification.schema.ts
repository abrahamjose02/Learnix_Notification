import mongoose,{Model,Mongoose,Schema} from "mongoose";
import { Notification } from "../notification.entites";


const NotificationSchema : Schema<Notification> = new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
        },
        status:{
            type:String,
            enum:["read","unread"],
            default:"unread",
        },
        instructorId:{
            type:String,
            required:true
        },
        message:{
            type:String,
            required:true
        },
    },
    {
        timestamps:true,
    }
)

const notificationModel : Model<Notification> = mongoose.model('notification',NotificationSchema)

export default notificationModel;