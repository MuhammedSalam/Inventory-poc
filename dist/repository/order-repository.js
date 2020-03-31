"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const typeorm_1 = require("typeorm");
const { EventHubProducerClient } = require("@azure/event-hubs");
let OrderRepository = class OrderRepository {
    constructor() {
        this.connectionString = "Endpoint=sb://inventory-hub-ns.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=PUJyiOw89coBuCo0mZEg7W7sCgpNwhOT4wXTsgqLgE8=";
        this.eventHubsName = "inventoryeventhub";
    }
    GetOrder(id) {
        return typeorm_1.getManager()
            .query('GetOrderByUserId @UserId=' + id);
    }
    CreateOrder(order) {
        console.log(order);
        const orderRes = typeorm_1.getManager()
            .query('SaveOrder @CartID=' + order.CartID + ',@UserID=' + order.UserID);
        this.SendNotification(order);
        return orderRes;
    }
    SendNotification(order) {
        return __awaiter(this, void 0, void 0, function* () {
            //call service eventhub.publish
            try {
                // Create a producer client to send messages to the event hub.
                const producer = new EventHubProducerClient(this.connectionString, this.eventHubsName);
                // Prepare a batch of three events.
                const batch = yield producer.createBatch();
                batch.tryAdd({ body: order });
                yield producer.sendBatch(batch);
                // Close the producer client.
                yield producer.close();
            }
            catch (error) {
                console.log("Error occurred: ", error);
            }
        });
    }
};
OrderRepository = __decorate([
    inversify_1.injectable()
], OrderRepository);
exports.OrderRepository = OrderRepository;
//# sourceMappingURL=order-repository.js.map