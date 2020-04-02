
import { Orders } from "../../entity/order-entity";
export interface IOrderRepository {

    getOrder(id: number): any;

    createOrder(order: Orders): any;

}