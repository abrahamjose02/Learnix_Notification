
import { Channel, ConsumeMessage } from "amqplib";
import MessageHandler from "./messageHandler";


export default class Consumer{
    constructor(private channel:Channel, private rpcQueue:string){}

    async consumeMessage(){
        console.log('Ready to consume-notification Messages')

        this.channel.consume(this.rpcQueue,async(message:ConsumeMessage | null)=>{
            if(message){
                if(message.properties){
                    const {correlationId,replyTo} = message.properties
                    const operations = message.properties.headers?.function
                    if(!correlationId || replyTo){
                        console.log('Missing Some Properties')
                    }
                    if(message.content){
                        console.log('Consumed :',JSON.parse(message.content.toString()));
                        await MessageHandler.handle(
                           operations,
                           JSON.parse(message.content.toString()),
                           correlationId,
                           replyTo
                        );

                    }
                    else{
                        console.log('Recieved Message is null or undefined')
                    }
                }
                else{
                    console.log('Recieved Message is null')
                }
            }
            else{
                console.log('Missing some properties')
            }
        },{noAck:true})
    } 
}