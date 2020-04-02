"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const type_1 = __importDefault(require("./type"));
const user_repository_1 = require("./repository/user-repository");
const product_repository_1 = require("./repository/product-repository");
const cart_repository_1 = require("./repository/cart-repository");
const order_repository_1 = require("./repository/order-repository");
const notification_service_1 = require("./services/notification.service");
const container = new inversify_1.Container();
container.bind(type_1.default.UserRepository).to(user_repository_1.UserRepository).inSingletonScope();
container.bind(type_1.default.ProductRepository).to(product_repository_1.ProductRepository).inSingletonScope();
container.bind(type_1.default.CartRepository).to(cart_repository_1.CartRepository).inSingletonScope();
container.bind(type_1.default.OrderRepository).to(order_repository_1.OrderRepository).inSingletonScope();
container.bind(type_1.default.NotificationService).to(notification_service_1.NotificationService).inSingletonScope();
exports.default = container;
//# sourceMappingURL=inversify.config.js.map