import { injectable } from "inversify";
import { ICartRepository } from './Interface/ICartRepository';
import { getManager, createQueryBuilder } from "typeorm";
import { Cart } from "../entity/cart-entity";
@injectable()
export class CartRepository implements ICartRepository {

    Joi = require('joi');

    getCartById(id: number) {

        return getManager()
            .query('GetCartByUserId @userId=' + id);

    }

    addToCart(cart: Cart) {
        const cartRes = getManager().getRepository(Cart).save(cart);
        getManager()
            .query('UpdateProductCount @ProdCount=' + cart.Quantity + ', @ProdId=' + cart.ProdID + ', @EditMode=' + 0 + ', @UserId=' + cart.UserId);

        return cartRes;
    }

    updateCart(id: number, cart: Cart) {
        getManager()
            .query('UpdateProductCount @ProdCount=' + cart.Quantity + ', @ProdId=' + cart.ProdID + ', @EditMode=' + 1 + ', @UserId=' + cart.UserId);
        return getManager().getRepository(Cart).update(id, cart);
    }

    deleteCart(id: number) {

        const cartRe = getManager()
            .query('DeleteCart @CartId=' + id);
        return cartRe;

    }

}