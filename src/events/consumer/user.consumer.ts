
import amqp from 'amqplib'
import 'dotenv/config'

import { NotificationRepository } from '../../repository/notification.repository'
import { NotificationService } from '../../service/notification.service'
import { NotificationController } from '../../controller/notification.controller'

const repository = new NotificationRepository()
const service = new NotificationService(repository)
const controller = new NotificationController(service)

const url = String(process.env.RabbitMQ_link)
const activationQueue = 'activation-code';
const resetQueue = 'reset-code';

const consumeQueue = async(queue:string,handler:(data:any)=>void)=>{
    try {
        const connection = await amqp.connect(url);
        const channel = await connection.createChannel();
        await channel.assertQueue(queue);

        channel.consume(queue,(data:any)=>{
            const parsedData = JSON.parse(data.content);
            handler(parsedData);
            channel.ack(data)
        })
    } catch (e:any) {
        console.log(e)
    }
}

const actionCode = async()=>{
    try {
        await consumeQueue(activationQueue,(userData)=>{
            controller.sendActivationMail(userData)
        });

        await consumeQueue(resetQueue,(userData)=>{
            controller.sendResetMail(userData)
        })

    } catch (e:any) {
        console.log(e)
    }
}

export default actionCode