import { injectable } from "inversify";
import { getManager, createQueryBuilder } from "typeorm";
import { Orders } from "../entity/order-entity";
import { IOrderRepository } from "./Interface/IOrderRepository";
const { EventHubProducerClient } = require("@azure/event-hubs");
@injectable()
export class OrderRepository implements IOrderRepository {
    connectionString = "Endpoint=sb://inventory-hub-ns.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=PUJyiOw89coBuCo0mZEg7W7sCgpNwhOT4wXTsgqLgE8=";
    eventHubsName = "inventoryeventhub";

    GetOrder(id: number) {
        return getManager()
            .query('GetOrderByUserId @UserId=' + id);
    }

    CreateOrder(order: Orders) {

        console.log(order);
        const orderRes = getManager()
            .query('SaveOrder @CartID=' + order.CartID + ',@UserID=' + order.UserID);

        this.SendNotification(order);
        return orderRes;
    }

    async SendNotification(order: Orders) {
        //call service eventhub.publish

        try {

            // Create a producer client to send messages to the event hub.
            const producer = new EventHubProducerClient(this.connectionString, this.eventHubsName);

            // Prepare a batch of three events.
            const batch = await producer.createBatch();
            batch.tryAdd({ body: order });
        
            await producer.sendBatch(batch);

            // Close the producer client.
            await producer.close();

            
        }
        catch (error) {
            console.log("Error occurred: ", error);
        }
    }

}