"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_repository_1 = require("../repository/user-repository");
const user_entity_1 = require("../entity/user-entity");
exports.getAllEmployees = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let userRepo = new user_repository_1.UserRepository();
    console.log("Received GetAllEmployees ==> GET");
    userRepo.getUsers().then((result) => {
        console.log("Result : " + result);
        res.send(result);
    });
});
exports.saveEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let userRepo = new user_repository_1.UserRepository();
    console.log("Received SaveEmployee ==> POST");
    console.log(req.body);
    let emp = new user_entity_1.User();
    emp.Email = req.body.email;
    emp.FirstName = req.body.firstName;
    emp.LastName = req.body.lastName;
    userRepo.createUser(emp).then((result) => {
        console.log("Result : " + result);
        res.send(result);
    });
});
//# sourceMappingURL=employee-controller.js.map