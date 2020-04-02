import { injectable } from "inversify";
var azure = require('azure');

//import { INotificationRepository } from "./Interface/INotificationRepository";
import { environment } from "../environments/environment.prod";


let connectionString: string = environment.ServiceBusConnString;
let serviceBusQueueName: string = environment.QueueName;

@injectable()
export class NotificationService {

    sendMessageToSb(messageBody: any) {
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