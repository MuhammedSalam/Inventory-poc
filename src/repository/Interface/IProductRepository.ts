import { Product } from "../../entity/product-entity";
export interface IProductRepository {

    getProducts(): any;

    createProduct(product: Product): any;

    getProductById(id: number): any;

    updateProduct(id: number, product: Product): any

    deleteProduct(id: number): any;

    getProductByCartId(id: number): any;
}