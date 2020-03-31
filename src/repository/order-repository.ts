import { injectable } from "inversify";
import { getManager, createQueryBuilder } from "typeorm";
import { Orders } from "../entity/order-entity";
import { IOrderRepository } from "./Interface/IOrderRepository";
const { EventHubProducerClient } = require("@azure/event-hubs");
@injectable()
export class OrderRepository implements IOrderRepository {
    connectionString = "Endpoint=sb://inventory-hub-ns.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=PUJyiOw89coBuCo0mZEg7W7sCgpNwhOT4wXTsgqLgE8=";
    //EventHubClient  = require("@azure/event-hubs@2");
    // Name of the event hub. For example: myeventhub
    eventHubsName = "inventoryeventhub";

    GetOrder(id: number) {
        return getManager()
            .query('GetOrderByUserId @UserId=' + id);
    }

    CreateOrder(order: Orders) {

        console.log(order);
        const orderRes = getManager()
            .query('SaveOrder @CartID=' + order.CartID + ',@UserID=' + order.UserID);

        this.sendNotification(order);
        return orderRes;
    }

    async sendNotification(order: Orders) {
        //call service eventhub.publish

        try {

            // Create a producer client to send messages to the event hub.
            const producer = new EventHubProducerClient(this.connectionString, this.eventHubsName);

            // Prepare a batch of three events.
            const batch = await producer.createBatch();
            batch.tryAdd({ body: order });
         //   batch.tryAdd({ body: "Second event" });
         //   batch.tryAdd({ body: "Third event" });

            // Send the batch to the event hub.
            await producer.sendBatch(batch);

            // Close the producer client.
            await producer.close();

            console.log("A batch of three events have been sent to the event hub");
        }
        catch (error) {
            console.log("Error occurred: ", error);
        }
    }

}