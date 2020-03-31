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
const user_entity_1 = require("../entity/user-entity");
let UserRepository = class UserRepository {
    constructor() {
        this.users = [];
        this.Joi = require('joi');
    }
    getUsers() {
        return typeorm_1.getManager().getRepository(user_entity_1.User).find();
    }
    createUser(user) {
        const { error } = this.validateEmployee(user);
        if (error) {
            return error;
        }
        return typeorm_1.getManager().getRepository(user_entity_1.User).save(user);
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
    getUserById(id) {
        // return this.employees.find(employee => employee.id === id);
    }
    updateUser(id, user) {
        //
    }
    deleteUser(id) {
        //
    }
    validateEmployee(user) {
        const schema = {
            name: this.Joi.string().min(3).required(),
            salary: this.Joi.string().min(3).required()
        };
        return this.Joi.validate(user, schema);
    }
};
UserRepository = __decorate([
    inversify_1.injectable()
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=user-repository.js.map