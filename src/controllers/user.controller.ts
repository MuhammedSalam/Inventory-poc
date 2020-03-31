import * as express from 'express';
import { interfaces, controller, httpGet, httpPost, request, response } from "inversify-express-utils";
import { inject } from 'inversify';
import TYPES from '../type';
import { IUserRepository } from '../repository/Interface/IUserRepository';

@controller("/users")
export class UserController implements interfaces.Controller {

    private userRepository: IUserRepository;
    constructor(@inject(TYPES.UserRepository) _userRepository: IUserRepository) {
        this.userRepository = _userRepository;
    }

    @httpGet("/")
    public async index(@request() req: express.Request, @response() res: express.Response) {
        try {
            console.log("Received GetAllEmployees ==> GET");

            await this.userRepository.getUsers().then((result: any) => {
                console.log("Result : " + result);

                res.send(result);
            });
        }
        catch{

        }
    }

    @httpGet("/:id")
    public GetById(@request() req: express.Request, @response() res: express.Response) {
        try {
            const posts = this.userRepository.getUserById(parseInt(req.params.id));
            res.status(200).json(posts);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    @httpPost("/")
    public Index(@request() req: express.Request, @response() res: express.Response) {
        try {

            console.log(req.body);
            const posts = this.userRepository.createUser(req.body);
            res.status(200).json(posts);
        } catch (error) {
            res.status(400).json(error);
        }
    }
}