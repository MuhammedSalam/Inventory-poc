import * as express from 'express';
import { interfaces, controller, httpGet, httpPost, request, response, httpPut, httpDelete } from "inversify-express-utils";
import { inject } from 'inversify';
import TYPES from '../type';
import { IProductRepository } from '../repository/Interface/IProductRepository';
import { Product } from '../entity/product-entity';

@controller("/products")
export class ProductController implements interfaces.Controller {

    private _productRepository: IProductRepository;
    constructor(@inject(TYPES.ProductRepository) productRepository: IProductRepository) {
        this._productRepository = productRepository;
    }

    @httpGet("/")
    public async index(@request() req: express.Request, @response() res: express.Response) {
        try {
            console.log("Received GetAllProducts ==> GET");

            await this._productRepository.GetProducts().then((result: any) => {
                console.log("Result : " + result);
                res.send(result);
            });
        }
        catch{

        }
    }

    @httpGet("/:id")
    public async GetProductId(@request() req: express.Request, @response() res: express.Response) {
        try {
            console.log("Received GetProductId ==> GET");
            console.log(req.params);

            if (parseInt(req.params.id) > 0) {
                const product = await this._productRepository.GetProductById(parseInt(req.params.id)).then((product: any) => {
                    console.log("Result : " + product);
                    res.status(200).json(product);
                });

            }

            else {
                return res.status(404).send('Product with given id not found');
            }
        } catch (error) {
            res.status(400).json(error);
        }
    }

    @httpPost("/SaveProduct")
    public SaveProduct(@request() req: express.Request, @response() res: express.Response) {
        try {

            console.log("Received SaveProduct ==> POST");
            console.log(req.body);

            let prd: Product = new Product();
            prd.Name = req.body.name;
            prd.Description = req.body.description;
            prd.Price = req.body.price;
            prd.ProdCount = req.body.prodcount;

            const product = this._productRepository.CreateProduct(prd);
            res.status(200).json(product);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    @httpPut("/:id")
    public UpdateProduct(@request() req: express.Request, @response() res: express.Response) {
        try {

            console.log("Received UpdateProduct ==> PUT");
            console.log(req.params);
            console.log(req.body);

            if (parseInt(req.params.id) > 0) {
                let prodId = parseInt(req.params.id);

                let prd: Product = new Product();
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

        } catch (error) {
            res.status(400).json(error);
        }
    }


    @httpDelete("/:id")
    public async DeleteProduct(@request() req: express.Request, @response() res: express.Response) {
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
        } catch (error) {
            res.status(400).json(error);
        }
    }

}