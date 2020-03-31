import "reflect-metadata";
import { ConnectionOptions } from "typeorm";
import { User } from './../entity/user-entity';
import { Product } from "../entity/product-entity";
import { Cart } from "../entity/cart-entity";
import { Orders } from "../entity/order-entity";

export let dbOptions: ConnectionOptions = {
    type: "mssql",
    host: "neusports-dbs.database.windows.net",
    port: 1433,
    username: "adminuser",
    password: "Aug17@12345",
    database: "inventory-db",
    entities: [User, Product,Cart,Orders],
    synchronize: true,
    options: {
        encrypt: true
    }
}