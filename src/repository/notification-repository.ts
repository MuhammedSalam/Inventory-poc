import { injectable } from "inversify";
var azure = require('azure');

import { INotificationRepository } from "./Interface/INotificationRepository";


var connectionString = "Endpoint=sb://inventory-sb-poc.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=xHoaQB6DbhPOSrLaOdVhndwwi9YdSxvV26zjFdR08yE=";
var serviceBusQueueName = "inventory-queue-poc";

@injectable()
export class NotificationRepository implements INotificationRepository {

    SendMessageToSb(messageBody: any) {
        try {

            var retryOperations = new azure.ExponentialRetryPolicyFilter();
            var serviceBusService = azure.createServiceBusService(connectionString).withFilter(retryOperations);

            var message = {
                body: messageBody,
                customProperties: {
                    customproperty: ''
                }
            };
            serviceBusService.sendQueueMessage(serviceBusQueueName, message, (error: any) => {
                if (!error) {
                    console.log('Message send to service bus queue succesfully');
                }
            });

        }
        catch (error) {
            console.log("Error occurred: ", error);
        }
    }
}