import { NotificationRepository } from "../../repository/notification.repository";
import { NotificationService } from "../../service/notification.service";
import { NotificationController } from "../../controller/notification.controller";
import rabbitMQClient from './client'


const repository = new NotificationRepository()
const service = new NotificationService(repository)
const controller = new NotificationController(service)


export default class MessageHandler{
    static async handle(
        operation:string,
        data:any,
        correlationId:string,
        replyTo:string
    ){
        let response  = data;

        console.log('The operation is ',operation,data);

        switch(operation){
            case "create-notification" :
                response = await controller.createNotification.bind(controller)(data);
                break;

            case "get-all-notification" :
                response = await controller.getNotification.bind(controller)(data);
                break;

            case "update-notification":
                response = await controller.updateNotification.bind(controller)(data);
                break;

            default:
                response = 'Request-key not found';
                break;
        }
        await rabbitMQClient.produce(response,correlationId,replyTo)
    }
}