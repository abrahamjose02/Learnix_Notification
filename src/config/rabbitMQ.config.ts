
import 'dotenv/config'

export default{
    rabbitMQ:{
        url:String(process.env.RabbitMQ_link),
        queues:{
            notificationQueue:'notification_queue'
        },
        heartbeat:10
    },
}