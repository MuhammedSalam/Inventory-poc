import express from 'express';
import * as bodyParser from "body-parser";
import "reflect-metadata";

import { createConnection } from "typeorm";
import * as appConfig from "./common/app-config";

import { InversifyExpressServer, interfaces, TYPE } from "inversify-express-utils";
import container from "./inversify.config";

import './controllers/user.controller';
import './controllers/product-controller';
import './controllers/cart-controller';
import './controllers/order-controller';

 
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let server = new InversifyExpressServer(container, null, { rootPath: "/api" }, app);

let appConfigured = server.build();


appConfigured.set("port", process.env.PORT || 8080 )

appConfigured.listen(appConfigured.get("port"), () => {
   
    console.log(("  App is running at http://localhost:%d in %s mode"), appConfigured.get("port"), appConfigured.get("env"));
    console.log("  Press CTRL-C to stop\n");
});


createConnection(appConfig.dbOptions).then(async connection => {
    console.log("Connected to DB");

}).catch(error => console.log("TypeORM connection error: ", error));

module.exports = app;