import { injectable } from "inversify";
import { IUserRepository } from './Interface/IUserRepository';
import { getManager } from "typeorm";
import { User } from "../entity/user-entity";
@injectable()
export class UserRepository implements IUserRepository {

    users: User[] = [];
    Joi = require('joi');
    returnValue: any;

    getUsers(): any {

        return getManager().getRepository(User).find();

    }

    createUser(user: User) {
         const { error } = this.validateEmployee(user);
        if (error) {
            return error;

        }
        return getManager().getRepository(User).save(user);
    }

    // createUser(user: UserEntity): UserEntity[] {

    //     // const { error } = this.validateEmployee(user);
    //     // if (error) {
    //     //     return error;

    //     // }
    //     // const emp = {
    //     //     id: this.users.length + 1,
    //     //     name: user.email,
    //     //     salary: user.salary
    //     // };

    //     // this.employees.push(emp);
    //     return this.users;
    // }

    getUserById(id: number): any {

        // return this.employees.find(employee => employee.id === id);

    }

    updateUser(id: number, user: User) {
        //
    }

    deleteUser(id: number) {
        //
    }

    validateEmployee(user: User) {


        const schema = {
            name: this.Joi.string().min(3).required(),
            salary: this.Joi.string().min(3).required()
        }

        return this.Joi.validate(user, schema);

    }

}