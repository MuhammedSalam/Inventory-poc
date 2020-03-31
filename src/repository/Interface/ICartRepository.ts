import { Cart } from "../../entity/cart-entity";
export interface ICartRepository {

    getCartById(id: number): any;

    addToCart(product: Cart): any;

    updateCart(id: number, cart: Cart): any

    deleteCart(id: number): any;

}