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
const product_entity_1 = require("../entity/product-entity");
let ProductController = class ProductController {
    constructor(productRepository) {
        this._productRepository = productRepository;
    }
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Received GetAllProducts ==> GET");
                yield this._productRepository.GetProducts().then((result) => {
                    console.log("Result : " + result);
                    res.send(result);
                });
            }
            catch (_a) {
            }
        });
    }
    GetProductId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Received GetProductId ==> GET");
                console.log(req.params);
                if (parseInt(req.params.id) > 0) {
                    const product = yield this._productRepository.GetProductById(parseInt(req.params.id)).then((product) => {
                        console.log("Result : " + product);
                        res.status(200).json(product);
                    });
                }
                else {
                    return res.status(404).send('Product with given id not found');
                }
            }
            catch (error) {
                res.status(400).json(error);
            }
        });
    }
    SaveProduct(req, res) {
        try {
            console.log("Received SaveProduct ==> POST");
            console.log(req.body);
            let prd = new product_entity_1.Product();
            prd.Name = req.body.name;
            prd.Description = req.body.description;
            prd.Price = req.body.price;
            prd.ProdCount = req.body.prodcount;
            const product = this._productRepository.CreateProduct(prd);
            res.status(200).json(product);
        }
        catch (error) {
            res.status(400).json(error);
        }
    }
    UpdateProduct(req, res) {
        try {
            console.log("Received UpdateProduct ==> PUT");
            console.log(req.params);
            console.log(req.body);
            if (parseInt(req.params.id) > 0) {
                let prodId = parseInt(req.params.id);
                let prd = new product_entity_1.Product();
                prd.Name = req.body.name;
                prd.Description = req.body.description;
                prd.Price = req.body.price;
                prd.ProdCount = req.body.prodcount;
                const product = this._productRepository.UpdateProduct(prodId, prd);
                res.status(200).json(product);
            }
            else {
                return res.status(404).send('Product with given id not found');
            }
        }
        catch (error) {
            res.status(400).json(error);
        }
    }
    DeleteProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Received DeleteProduct ==> PUT");
                console.log(req.params);
                if (parseInt(req.params.id) > 0) {
                    const product = this._productRepository.DeleteProduct(parseInt(req.params.id));
                    res.status(200).json(product);
                }
                else {
                    return res.status(404).send('Product with given id not found');
                }
            }
            catch (error) {
                res.status(400).json(error);
            }
        });
    }
};
__decorate([
    inversify_express_utils_1.httpGet("/"),
    __param(0, inversify_express_utils_1.request()), __param(1, inversify_express_utils_1.response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "index", null);
__decorate([
    inversify_express_utils_1.httpGet("/:id"),
    __param(0, inversify_express_utils_1.request()), __param(1, inversify_express_utils_1.response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "GetProductId", null);
__decorate([
    inversify_express_utils_1.httpPost("/SaveProduct"),
    __param(0, inversify_express_utils_1.request()), __param(1, inversify_express_utils_1.response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "SaveProduct", null);
__decorate([
    inversify_express_utils_1.httpPut("/:id"),
    __param(0, inversify_express_utils_1.request()), __param(1, inversify_express_utils_1.response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "UpdateProduct", null);
__decorate([
    inversify_express_utils_1.httpDelete("/:id"),
    __param(0, inversify_express_utils_1.request()), __param(1, inversify_express_utils_1.response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "DeleteProduct", null);
ProductController = __decorate([
    inversify_express_utils_1.controller("/products"),
    __param(0, inversify_1.inject(type_1.default.ProductRepository)),
    __metadata("design:paramtypes", [Object])
], ProductController);
exports.ProductController = ProductController;
//# sourceMappingURL=product-controller.js.map