import { injectable } from "inversify";
import { IProductRepository } from './Interface/IProductRepository';
import { getManager } from "typeorm";
import { Product } from "../entity/product-entity";
@injectable()
export class ProductRepository implements IProductRepository {

    Joi = require('joi');

    getProducts(): any {
        return getManager().getRepository(Product).find();
    }

    createProduct(product: Product): any {

        return getManager().getRepository(Product).save(product);
    }

    getProductById(id: number): any {
        return getManager().getRepository(Product).findByIds([id]);
    }

    getProductByCartId(id: number): any {
        return getManager()
            .query('GetProductDetailsByCartId @CartId=' + id);
    }

    updateProduct(id: number, product: Product): any {
        return getManager().getRepository(Product).update(id, product);
    }

    deleteProduct(id: number): any {
        return getManager().getRepository(Product).delete(id);
    }

}