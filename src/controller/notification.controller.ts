
import { Notification } from "../model/notification.entites";
import { INotificationService } from "../interface/Inotification.service";
import sendMail from "../utils/sendMails";
import moment from "moment";
import path from "path";
import ejs from 'ejs'

export class NotificationController{
    constructor(private service:INotificationService){
            this.service = service
    }

    sendActivationMail = async(data:any)=>{
        const currentDate:string = moment().format('DD MM YYYY',);
        const userData = {
            user:{name:data.name},
            activationCode:data.code,
            currentDate:currentDate
        };

        const html = await ejs.renderFile(
            path.join(__dirname,"../mails/activation-mail.ejs"),
            userData
        );
        try {
          await sendMail({
            email:data.email,
            subject:'Activate your account',
            template:'activation-mail.ejs',
            data:userData,
          });
        } catch (e:any) {
            console.log(e)
        }
    }


    sendResetMail = async(data:any)=>{
        const currentDate:string = moment().format('DD MM YYYY');
        console.log("UserDetails:", data)
        const userData = {
            user:{name:data.name},
            resetCode:data.resetCode,
            currentDate:currentDate
        }
        const html = await ejs.renderFile(
            path.join(__dirname,"../mails/reset-mail.ejs"),
            userData
        );
        try {
            await sendMail({
                email:data.email,
                subject:"Rest your password",
                template:'reset-mail.ejs',
                data:userData
            })
        } catch (e:any) {
            console.log(e)
        }
    }

    getNotification = (data:string)=>{
        try {
            return this.service.getNotifications(data)
        } catch (e:any) {
            console.log(e)
        }
    }

    createNotification = (data:Notification)=>{
        try {
            return this.service.createNotification(data)
        } catch (e:any) {
            console.log(e)
        }
    }

    updateNotification = (data:string) =>{
        try {
            return this.service.updateStatus(data)            
        } catch (e:any) {
            console.log(e)
        }
    }
}