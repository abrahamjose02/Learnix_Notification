
import { Notification } from "../model/notification.entites";

export interface INotificationRepository{
    getNotification(data:any):Promise <Notification[] | null>
    createNotification(data:Notification) : Promise <Object | null>;
    updateStatus(id:string) : Promise <Object | null>
}