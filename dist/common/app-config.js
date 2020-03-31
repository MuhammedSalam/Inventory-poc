"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const user_entity_1 = require("./../entity/user-entity");
const product_entity_1 = require("../entity/product-entity");
const cart_entity_1 = require("../entity/cart-entity");
const order_entity_1 = require("../entity/order-entity");
exports.dbOptions = {
    type: "mssql",
    host: "neusports-dbs.database.windows.net",
    port: 1433,
    username: "adminuser",
    password: "Aug17@12345",
    database: "inventory-db",
    entities: [user_entity_1.User, product_entity_1.Product, cart_entity_1.Cart, order_entity_1.Orders],
    synchronize: true,
    options: {
        encrypt: true
    }
};
//# sourceMappingURL=app-config.js.map