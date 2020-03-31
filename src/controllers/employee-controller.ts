import { Request, Response } from "express";
import { UserRepository } from "../repository/user-repository";
import { User } from "../entity/user-entity";

export let getAllEmployees = async (req: Request, res: Response) => {
    
    let userRepo: UserRepository = new UserRepository();

    console.log("Received GetAllEmployees ==> GET");

    userRepo.getUsers().then((result: any) => {
        console.log("Result : " + result);
        res.send(result);
    });


};

export let saveEmployee = async (req: Request, res: Response) => {
    let userRepo: UserRepository = new UserRepository();

    console.log("Received SaveEmployee ==> POST");
    console.log(req.body);

    let emp: User = new User();
    emp.Email = req.body.email;
    emp.FirstName = req.body.firstName;
    emp.LastName = req.body.lastName;

    userRepo.createUser(emp).then((result: any) => {
        console.log("Result : " + result);
        res.send(result);
    });
};