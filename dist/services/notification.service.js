"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
var azure = require('azure');
//import { INotificationRepository } from "./Interface/INotificationRepository";
const environment_prod_1 = require("../environments/environment.prod");
let connectionString = environment_prod_1.environment.ServiceBusConnString;
let serviceBusQueueName = environment_prod_1.environment.QueueName;
let NotificationService = class NotificationService {
    sendMessageToSb(messageBody) {
        try {
            var retryOperations = new azure.ExponentialRetryPolicyFilter();
            var serviceBusService = azure.createServiceBusService(connectionString).withFilter(retryOperations);
            var message = {
                body: messageBody,
                customProperties: {
                    customproperty: ''
                }
            };
            serviceBusService.sendQueueMessage(serviceBusQueueName, message, (error) => {
                if (!error) {
                    console.log('Message send to service bus queue succesfully');
                }
            });
        }
        catch (error) {
            console.log("Error occurred: ", error);
        }
    }
};
NotificationService = __decorate([
    inversify_1.injectable()
], NotificationService);
exports.NotificationService = NotificationService;
//# sourceMappingURL=notification.service.js.map