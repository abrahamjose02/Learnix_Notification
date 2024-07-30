
import { Channel,Connection,connect } from "amqplib";
import Producer from "./producer";
import Consumer from "./consumer";
import rabbitMQConfig from "../../config/rabbitMQ.config";


class RabbitMQClient{
    private constructor(){}
    private static instance:RabbitMQClient;
    private isInitalized=true;
    private producer : Producer | undefined;
    private consumer : Consumer | undefined;
    private connection:Connection | undefined;
    private producerChannel : Channel | undefined;
    private consumerChannel : Channel | undefined;

    public static getInstance(){
        if(!this.instance){
            this.instance = new RabbitMQClient()
        }
        return this.instance;
    }

    async initialize(){
        if(this.isInitalized){
            return;
        }
        try {
         this.connection = await connect(rabbitMQConfig.rabbitMQ.url)
         this.producerChannel = await this.connection.createChannel()
         this.consumerChannel = await this.connection.createChannel()

         const{queue:rpcQueue} = await this.consumerChannel.assertQueue(
            rabbitMQConfig.rabbitMQ.queues.notificationQueue,
            {exclusive:true}
         );

         this.producer = new Producer(this.producerChannel)
         this.consumer = new Consumer(this.consumerChannel,rpcQueue);

         this.consumer.consumeMessage();
         this.isInitalized = true
        } catch (e:any) {
            console.log( console.log("rabbitmq error...", e))
        }
    }

    async produce(data:any,correlationId:string,replyToQueue:string){
        if(!this.isInitalized){
            await this.initialize()
        }
        return await this.producer?.produceMessages(
            data,
            correlationId,
            replyToQueue
        )
    }
}

export default RabbitMQClient.getInstance()