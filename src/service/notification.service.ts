import { INotificationRepository } from "../interface/Inotification.repository";
import { INotificationService } from "../interface/Inotification.service";
import { Notification } from "../model/notification.entites";

export class NotificationService implements INotificationService {
  constructor(private repository: INotificationRepository) {}
  getNotifications(data: any): Promise<Notification[] | null> {
    return this.repository.getNotifications(data)
  }

  createNotification(data: Notification): Promise<Object | null> {
    return this.repository.createNotification(data);
  }
  updateStatus(id: string): Promise<Object | null> {
    return this.repository.updateStatus(id);
  }
}