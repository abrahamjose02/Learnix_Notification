
import { Notification } from "../model/notification.entites";

export interface INotificationService{
    getNotification(data:any) : Promise<Notification[] | null>
    createNotification(data:Notification) : Promise<Object | null>
    updateStatus(id:string) : Promise<Object | null>
}