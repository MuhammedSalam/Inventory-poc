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
const order_entity_1 = require("../entity/order-entity");
var logger = require("../common/logger");
let OrderController = class OrderController {
    constructor(orderRepository, productRepository, notificationService) {
        this._orderRepository = orderRepository;
        this._productRepository = productRepository;
        this._notificationService = notificationService;
    }
    GetOrderById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Received GetOrderById ==> GET");
                console.log(req.params);
                if (parseInt(req.params.id) > 0) {
                    const order = yield this._orderRepository.getOrder(parseInt(req.params.id)).then((order) => {
                        console.log("Result : " + order);
                        res.status(200).json(order);
                    });
                }
                else {
                    return res.status(404).send('Order with given id not found');
                }
            }
            catch (error) {
                res.status(400).json(error);
            }
        });
    }
    Index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // throw Error("known error");
                logger.log('info', "Received PlaceOrder ==> POST");
                let order = new order_entity_1.Orders();
                order.CartID = req.body.cartid;
                order.UserID = req.body.userid;
                var orderResTemp;
                const orderRes = yield this._orderRepository.createOrder(order).then((order) => {
                    console.log("Order Result : " + JSON.stringify(order));
                    orderResTemp = order;
                    res.status(200).json(order);
                });
                const ProdRes = yield this._productRepository.getProductByCartId(parseInt(req.body.cartid)).then((prod) => {
                    console.log("Prod Result : " + JSON.stringify(prod));
                    var resultJson = JSON.stringify({ order: orderResTemp, product: prod });
                    console.log("Result Json : " + resultJson);
                    this._notificationService.sendMessageToSb(resultJson);
                });
            }
            catch (error) {
                logger.log('error', error.message);
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
], OrderController.prototype, "GetOrderById", null);
__decorate([
    inversify_express_utils_1.httpPost("/"),
    __param(0, inversify_express_utils_1.request()), __param(1, inversify_express_utils_1.response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "Index", null);
OrderController = __decorate([
    inversify_express_utils_1.controller("/orders"),
    __param(0, inversify_1.inject(type_1.default.OrderRepository)),
    __param(1, inversify_1.inject(type_1.default.ProductRepository)),
    __param(2, inversify_1.inject(type_1.default.NotificationService)),
    __metadata("design:paramtypes", [Object, Object, Object])
], OrderController);
exports.OrderController = OrderController;
//# sourceMappingURL=order-controller.js.map