import { Product } from "../../entity/product-entity";
export interface IProductRepository {

    GetProducts(): any;

    CreateProduct(product: Product): any;

    GetProductById(id: number): any;

    UpdateProduct(id: number, product: Product): any

    DeleteProduct(id: number): any;

    GetProductByCartId(id: number): any;
}