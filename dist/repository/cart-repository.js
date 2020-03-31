"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const typeorm_1 = require("typeorm");
const cart_entity_1 = require("../entity/cart-entity");
let CartRepository = class CartRepository {
    constructor() {
        this.Joi = require('joi');
    }
    getCartById(id) {
        return typeorm_1.getManager()
            .query('GetCartByUserId @userId=' + id);
    }
    addToCart(cart) {
        const cartRes = typeorm_1.getManager().getRepository(cart_entity_1.Cart).save(cart);
        typeorm_1.getManager()
            .query('UpdateProductCount @ProdCount=' + cart.Quantity + ', @ProdId=' + cart.ProdID + ', @EditMode=' + 0 + ', @UserId=' + cart.UserId);
        return cartRes;
    }
    updateCart(id, cart) {
        typeorm_1.getManager()
            .query('UpdateProductCount @ProdCount=' + cart.Quantity + ', @ProdId=' + cart.ProdID + ', @EditMode=' + 1 + ', @UserId=' + cart.UserId);
        return typeorm_1.getManager().getRepository(cart_entity_1.Cart).update(id, cart);
    }
    deleteCart(id) {
        const cartRe = typeorm_1.getManager()
            .query('DeleteCart @CartId=' + id);
        return cartRe;
    }
};
CartRepository = __decorate([
    inversify_1.injectable()
], CartRepository);
exports.CartRepository = CartRepository;
//# sourceMappingURL=cart-repository.js.map