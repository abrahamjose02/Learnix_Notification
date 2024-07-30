
import { INotificationService } from "../interface/Inotification.service";
import { NotificationRepository } from "../repository/notification.repository";
import { Notification } from "../model/notification.entites";


export class NotificationService implements INotificationService{
    constructor(private repository:NotificationRepository){}

    getNotification(data: any): Promise<Notification[] | null> {
        return this.repository.getNotification(data)
    }

    createNotification(data: Notification): Promise<Object | null> {
        return this.repository.createNotification(data)
    }

    updateStatus(id: string): Promise<Object | null> {
        return this.repository.updateStatus(id)
    }
}