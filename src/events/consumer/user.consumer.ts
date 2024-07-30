
import amqp from 'amqplib'
import 'dotenv/config'

import { NotificationRepository } from '../../repository/notification.repository'
import { NotificationService } from '../../service/notification.service'
import { NotificationController } from '../../controller/notification.controller'

const repository = new NotificationRepository()
const service = new NotificationService(repository)
const controller = new NotificationController(service)

const url = String(process.env.RabbitMQ_link)
const queue = 'activation-code';

const actionCode = async()=>{
    try {
        const connection = await amqp.connect(url)
        const channel = await connection.createChannel();
        await channel.assertQueue(queue);
        
        channel.consume(queue,(data:any)=>{
            const userData = JSON.parse(data.content)
            controller.sendActivationMail(userData)
            channel.ack(data)          
        })
    } catch (e:any) {
        console.log(e)
    }
}

export default actionCode