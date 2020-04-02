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
const product_entity_1 = require("../entity/product-entity");
let ProductRepository = class ProductRepository {
    constructor() {
        this.Joi = require('joi');
    }
    getProducts() {
        return typeorm_1.getManager().getRepository(product_entity_1.Product).find();
    }
    createProduct(product) {
        return typeorm_1.getManager().getRepository(product_entity_1.Product).save(product);
    }
    getProductById(id) {
        return typeorm_1.getManager().getRepository(product_entity_1.Product).findByIds([id]);
    }
    getProductByCartId(id) {
        return typeorm_1.getManager()
            .query('GetProductDetailsByCartId @CartId=' + id);
    }
    updateProduct(id, product) {
        return typeorm_1.getManager().getRepository(product_entity_1.Product).update(id, product);
    }
    deleteProduct(id) {
        return typeorm_1.getManager().getRepository(product_entity_1.Product).delete(id);
    }
};
ProductRepository = __decorate([
    inversify_1.injectable()
], ProductRepository);
exports.ProductRepository = ProductRepository;
//# sourceMappingURL=product-repository.js.map