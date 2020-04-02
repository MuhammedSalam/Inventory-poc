import { injectable } from "inversify";
import { getManager, createQueryBuilder } from "typeorm";
import { Orders } from "../entity/order-entity";
import { IOrderRepository } from "./Interface/IOrderRepository";

@injectable()
export class OrderRepository implements IOrderRepository {

    getOrder(id: number) {
        return getManager()
            .query('GetOrderByUserId @UserId=' + id);
    }

    createOrder(order: Orders) {

        const orderRes = getManager()
            .query('SaveOrder @CartID=' + order.CartID + ',@UserID=' + order.UserID);
        
        return orderRes;
    }

}