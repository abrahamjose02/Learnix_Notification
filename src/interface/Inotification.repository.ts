import { Notification } from "../model/notification.entites";



export interface INotificationRepository {
    getNotifications(data: any): Promise<Notification[] | null>;
    createNotification(data: Notification): Promise<Object | null>;
    updateStatus(id:string): Promise<Object | null>;


}