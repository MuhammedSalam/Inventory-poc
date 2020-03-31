"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const inversify_express_utils_1 = require("inversify-express-utils");
const inversify_1 = require("inversify");
const type_1 = __importDefault(require("../type"));
const cart_entity_1 = require("../entity/cart-entity");
let CartController = class CartController {
    constructor(cartRepository) {
        this._cartRepository = cartRepository;
    }
    GetCartByUserId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Received GetCartByUserId ==> GET");
                console.log(req.params);
                if (parseInt(req.params.id) > 0) {
                    const cart = yield this._cartRepository.getCartById(parseInt(req.params.id)).then((cart) => {
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
        });
    }
    SaveProduct(req, res) {
        try {
            console.log("Received SaveCart ==> POST");
            console.log(req.body);
            let cart = new cart_entity_1.Cart();
            ///  cart.CartID = req.body.cartid;
            cart.ProdID = req.body.prodid;
            cart.Quantity = req.body.quantity;
            cart.UserId = req.body.userid;
            cart.IsOrdered = false;
            const cartRes = this._cartRepository.addToCart(cart);
            res.status(200).json(cartRes);
        }
        catch (error) {
            res.status(400).json(error);
        }
    }
    UpdateCart(req, res) {
        try {
            console.log("Received UpdateCart ==> PUT");
            console.log(req.params);
            console.log(req.body);
            if (parseInt(req.params.id) > 0) {
                let cartId = parseInt(req.params.id);
                let cart = new cart_entity_1.Cart();
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
        }
        catch (error) {
            res.status(400).json(error);
        }
    }
    DeleteCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
            }
            catch (error) {
                res.status(400).json(error);
            }
        });
    }
};
__decorate([
    inversify_express_utils_1.httpGet("/:id"),
    __param(0, inversify_express_utils_1.request()), __param(1, inversify_express_utils_1.response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "GetCartByUserId", null);
__decorate([
    inversify_express_utils_1.httpPost("/SaveCart"),
    __param(0, inversify_express_utils_1.request()), __param(1, inversify_express_utils_1.response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "SaveProduct", null);
__decorate([
    inversify_express_utils_1.httpPut("/:id"),
    __param(0, inversify_express_utils_1.request()), __param(1, inversify_express_utils_1.response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "UpdateCart", null);
__decorate([
    inversify_express_utils_1.httpDelete("/:id"),
    __param(0, inversify_express_utils_1.request()), __param(1, inversify_express_utils_1.response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "DeleteCart", null);
CartController = __decorate([
    inversify_express_utils_1.controller("/cart"),
    __param(0, inversify_1.inject(type_1.default.CartRepository)),
    __metadata("design:paramtypes", [Object])
], CartController);
exports.CartController = CartController;
//# sourceMappingURL=cart-controller.js.map