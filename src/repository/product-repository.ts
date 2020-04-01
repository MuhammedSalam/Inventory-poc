import { injectable } from "inversify";
import { IProductRepository } from './Interface/IProductRepository';
import { getManager } from "typeorm";
import { Product } from "../entity/product-entity";
@injectable()
export class ProductRepository implements IProductRepository {

    Joi = require('joi');

    GetProducts(): any {
        return getManager().getRepository(Product).find();
    }

    CreateProduct(product: Product): any {

        return getManager().getRepository(Product).save(product);
    }

    GetProductById(id: number): any {
        return getManager().getRepository(Product).findByIds([id]);
    }

    GetProductByCartId(id: number): any {
        return getManager()
            .query('GetProductDetailsByCartId @CartId=' + id);
    }

    UpdateProduct(id: number, product: Product): any {
        return getManager().getRepository(Product).update(id, product);
    }

    DeleteProduct(id: number): any {
        return getManager().getRepository(Product).delete(id);
    }

}