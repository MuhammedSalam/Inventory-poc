//import { Post } from "../post";

import { User } from "../../entity/user-entity";
export interface IUserRepository {

    getUsers(): any;


    createUser(user: User): any;


    getUserById(id: number): User;


    updateUser(id: number, user: User): void


    deleteUser(id: number): void;

}