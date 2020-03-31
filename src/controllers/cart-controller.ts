import * as express from 'express';
import { interfaces, controller, httpGet, httpPost, request, response, httpPut, httpDelete } from "inversify-express-utils";
import { inject } from 'inversify';
import TYPES from '../type';
import { ICartRepository } from '../repository/Interface/ICartRepository';
import { Cart } from '../entity/cart-entity';

@controller("/cart")
export class CartController implements interfaces.Controller {

    private _cartRepository: ICartRepository;
    constructor(@inject(TYPES.CartRepository) cartRepository: ICartRepository) {
        this._cartRepository = cartRepository;
    }

    @httpGet("/:id")
    public async GetCartByUserId(@request() req: express.Request, @response() res: express.Response) {
        try {
            console.log("Received GetCartByUserId ==> GET");
            console.log(req.params);

            if (parseInt(req.params.id) > 0) {
                const cart = await this._cartRepository.getCartById(parseInt(req.params.id)).then((cart: any) => {
                    console.log("Result : " + cart);
                    res.status(200).json(cart);
                });

            }

            else {
                return res.status(404).send('Cart with given id not found');
            }
        }
        catch (error) {
            res.status(400).json(error);
        }
    }

    @httpPost("/SaveCart")
    public SaveProduct(@request() req: express.Request, @response() res: express.Response) {
        try {
            console.log("Received SaveCart ==> POST");
            console.log(req.body);


            let cart: Cart = new Cart();
            ///  cart.CartID = req.body.cartid;
            cart.ProdID = req.body.prodid;
            cart.Quantity = req.body.quantity;
            cart.UserId = req.body.userid;
            cart.IsOrdered = false;
            const cartRes = this._cartRepository.addToCart(cart);
            res.status(200).json(cartRes);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    @httpPut("/:id")
    public UpdateCart(@request() req: express.Request, @response() res: express.Response) {
        try {

            console.log("Received UpdateCart ==> PUT");
            console.log(req.params);
            console.log(req.body);

            if (parseInt(req.params.id) > 0) {
                let cartId = parseInt(req.params.id);

                let cart: Cart = new Cart();
                //cart.CartID = cartId;
                cart.ProdID = req.body.prodid;
                cart.Quantity = req.body.quantity;
                cart.UserId = req.body.userid;
                cart.IsOrdered = false;

                const cartRes = this._cartRepository.updateCart(cartId, cart);
                res.status(200).json(cartRes);
            }
            else {
                return res.status(404).send('Cart with given id not found');
            }

        } catch (error) {
            res.status(400).json(error);
        }
    }


    @httpDelete("/:id")
    public async DeleteCart(@request() req: express.Request, @response() res: express.Response) {
        try {

            console.log("Received DeleteCart ==> PUT");
            console.log(req.params);

            if (parseInt(req.params.id) > 0) {
                const cart = this._cartRepository.deleteCart(parseInt(req.params.id));
                res.status(200).json(cart);
            }
            else {
                return res.status(404).send('Cart with given id not found');
            }
        } catch (error) {
            res.status(400).json(error);
        }
    }

}