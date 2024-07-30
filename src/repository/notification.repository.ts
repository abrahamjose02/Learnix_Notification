
import { INotificationRepository } from "../interface/Inotification.repository";
import { Notification } from "../model/notification.entites";
import notificationModel from "../model/schemas/notification.schema";
import Cron from 'node-cron'
import moment from 'moment'

export class NotificationRepository implements INotificationRepository{
   async getNotification(data: any): Promise<Notification[] | null> {
       try {
        const notifications = await notificationModel.find({instructorId:data})
        return notifications
       } catch (e:any) {
        throw new Error(e)
       }
   }

   async createNotification(data: Notification): Promise<Object | null> {
       try {
        const notifications = await notificationModel.create(data);
        return {success:true}
       } catch (e:any) {
        throw new Error(e)
       }
   }

   async updateStatus(id: string): Promise<Object | null> {
       try {
        const notification = await notificationModel.findByIdAndUpdate(id,{
            status:'read'
        });
        return  {status:true}
       } catch (e:any) {
        throw new Error(e)
       }
   }
}

Cron.schedule("0 0 0 1 * *",async()=>{
    const thirtyDaysAgo = moment().subtract(30,"days").toDate();
    await notificationModel.deleteMany({
        status:'read',
        createdAt:{$lt:thirtyDaysAgo}
    });
});
