
import { Orders } from "../../entity/order-entity";
export interface IOrderRepository {

    GetOrder(id: number): any;

    CreateOrder(order: Orders): any;

}