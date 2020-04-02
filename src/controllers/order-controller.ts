import * as express from 'express';
import { interfaces, controller, httpGet, httpPost, request, response, httpPut, httpDelete } from "inversify-express-utils";
import { inject } from 'inversify';
import TYPES from '../type';
import { IOrderRepository } from '../repository/Interface/IOrderRepository';
import { Orders } from '../entity/order-entity';
import { IProductRepository } from '../repository/Interface/IProductRepository';
import { INotificationService } from '../services/interfaces/INotificationService';

var logger = require("../common/logger");

@controller("/orders")
export class OrderController implements interfaces.Controller {

    private _orderRepository: IOrderRepository;

    private _productRepository: IProductRepository;
    private _notificationService: INotificationService;

    constructor(@inject(TYPES.OrderRepository) orderRepository: IOrderRepository,

        @inject(TYPES.ProductRepository) productRepository: IProductRepository,

        @inject(TYPES.NotificationService) notificationService: INotificationService) {

        this._orderRepository = orderRepository;
        this._productRepository = productRepository;
        this._notificationService = notificationService;
    }



    @httpGet("/:id")
    public async GetOrderById(@request() req: express.Request, @response() res: express.Response) {
        try {
            console.log("Received GetOrderById ==> GET");
            console.log(req.params);

            if (parseInt(req.params.id) > 0) {
                const order = await this._orderRepository.getOrder(parseInt(req.params.id)).then((order: any) => {
                    console.log("Result : " + order);
                    res.status(200).json(order);
                });

            }

            else {
                return res.status(404).send('Order with given id not found');
            }
        } catch (error) {
            res.status(400).json(error);
        }
    }

    @httpPost("/")
    public async Index(@request() req: express.Request, @response() res: express.Response) {
        try {

            
            logger.log('info', "Received PlaceOrder ==> POST");
            let order: Orders = new Orders();

            order.CartID = req.body.cartid;
            order.UserID = req.body.userid
            var orderResTemp: any;

            const orderRes = await this._orderRepository.createOrder(order).then((order: any) => {

                console.log("Order Result : " + JSON.stringify(order));
                orderResTemp = order;
                res.status(200).json(order);

            });

            const ProdRes = await this._productRepository.getProductByCartId(parseInt(req.body.cartid)).then((prod: any) => {
                console.log("Prod Result : " + JSON.stringify(prod));
                var resultJson = JSON.stringify({ order: orderResTemp, product: prod });
                console.log("Result Json : " + resultJson);
                this._notificationService.sendMessageToSb(resultJson);

            });

        } catch (error) {
           
            logger.log('error', error.message);

            res.status(400).json(error);
        }
    }

}