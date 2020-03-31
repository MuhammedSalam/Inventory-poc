"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
let PostRepositoryImpl = class PostRepositoryImpl {
    constructor() {
        this.employees = [{ id: 1, name: 'Course 1', salary: "6500" }, { id: 2, name: 'Course 2', salary: "4300" }, { id: 3, name: 'Course 3', salary: "3000" }];
        this.Joi = require('joi');
    }
    findAll() {
        return "salam";
    }
    create(employee) {
        const { error } = this.validateEmployee(employee);
        if (error) {
            return error;
        }
        const emp = {
            id: this.employees.length + 1,
            name: employee.name,
            salary: employee.salary
        };
        this.employees.push(emp);
        return this.employees;
    }
    findById(id) {
        return this.employees.find(employee => employee.id === id);
    }
    update(id, post) {
        //
    }
    delete(id) {
        //
    }
    validateEmployee(employee) {
        const schema = {
            name: this.Joi.string().min(3).required(),
            salary: this.Joi.string().min(3).required()
        };
        return this.Joi.validate(employee, schema);
    }
};
PostRepositoryImpl = __decorate([
    inversify_1.injectable()
], PostRepositoryImpl);
exports.PostRepositoryImpl = PostRepositoryImpl;
//# sourceMappingURL=inventory-repository.js.map