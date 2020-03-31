import * as express from 'express';
import { interfaces, controller, httpGet, httpPost, request, response, httpPut, httpDelete } from "inversify-express-utils";
import { inject } from 'inversify';
import TYPES from '../type';
import { IOrderRepository } from '../repository/Interface/IOrderRepository';
import { Orders } from '../entity/order-entity';

@controller("/orders")
export class OrderController implements interfaces.Controller {

    private _orderRepository: IOrderRepository;
    constructor(@inject(TYPES.OrderRepository) orderRepository: IOrderRepository) {
        this._orderRepository = orderRepository;
    }



    @httpGet("/:id")
    public async GetOrderById(@request() req: express.Request, @response() res: express.Response) {
        try {
            console.log("Received GetOrderById ==> GET");
            console.log(req.params);

            if (parseInt(req.params.id) > 0) {
                const order = await this._orderRepository.GetOrder(parseInt(req.params.id)).then((order: any) => {
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
    public Index(@request() req: express.Request, @response() res: express.Response) {
        try {

            console.log("Received PlaceOrder ==> POST");
         
            console.log(req.body);

            // if (parseInt(req.params.id) > 0) {
            //let cartId = parseInt(req.body.id);
            let order: Orders = new Orders();

            order.CartID = req.body.cartid;
            order.UserID = req.body.userid

            const orderRes = this._orderRepository.CreateOrder(order);
            res.status(200).json(orderRes);
            // }
            // else {
            //     return res.status(404).send('Cart with given id not found');
            // }

        } catch (error) {
            res.status(400).json(error);
        }
    }

}