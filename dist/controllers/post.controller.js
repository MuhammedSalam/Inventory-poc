"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const inversify_express_utils_1 = require("inversify-express-utils");
const inversify_1 = require("inversify");
const type_1 = __importDefault(require("../type"));
let PostController = class PostController {
    constructor(_userRepository) {
        this.userRepository = _userRepository;
    }
    index(req, res) {
        try {
            console.log("Received GetAllEmployees ==> GET");
            this.userRepository.getUsers().then((result) => {
                console.log("Result : " + result);
                //res.send(result);
                res.status(200).json(result);
                console.log("Received GetAllEmployees ==> GET");
            });
        }
        catch (error) {
            res.status(400).json(error);
        }
    }
    GetById(req, res) {
        try {
            const posts = this.userRepository.getUserById(parseInt(req.params.id));
            res.status(200).json(posts);
        }
        catch (error) {
            res.status(400).json(error);
        }
    }
    Index(req, res) {
        try {
            console.log(req.body);
            const posts = this.userRepository.createUser(req.body);
            res.status(200).json(posts);
        }
        catch (error) {
            res.status(400).json(error);
        }
    }
};
__decorate([
    inversify_express_utils_1.httpGet("/"),
    __param(0, inversify_express_utils_1.request()), __param(1, inversify_express_utils_1.response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "index", null);
__decorate([
    inversify_express_utils_1.httpGet("/:id"),
    __param(0, inversify_express_utils_1.request()), __param(1, inversify_express_utils_1.response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "GetById", null);
__decorate([
    inversify_express_utils_1.httpPost("/"),
    __param(0, inversify_express_utils_1.request()), __param(1, inversify_express_utils_1.response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "Index", null);
PostController = __decorate([
    inversify_express_utils_1.controller("/users"),
    __param(0, inversify_1.inject(type_1.default.UserRepository)),
    __metadata("design:paramtypes", [Object])
], PostController);
exports.PostController = PostController;
//# sourceMappingURL=post.controller.js.map