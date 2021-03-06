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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
let User = class User {
    constructor() {
        this.UserId = 0;
        this.FirstName = "";
        this.LastName = "";
        this.Email = "";
        this.Password = "";
        this.UserName = "";
        this.UserType = "";
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], User.prototype, "UserId", void 0);
__decorate([
    typeorm_1.Column({
        length: 100
    }),
    __metadata("design:type", String)
], User.prototype, "FirstName", void 0);
__decorate([
    typeorm_1.Column({
        length: 100
    }),
    __metadata("design:type", String)
], User.prototype, "LastName", void 0);
__decorate([
    typeorm_1.Column({
        length: 100
    }),
    __metadata("design:type", String)
], User.prototype, "Email", void 0);
__decorate([
    typeorm_1.Column({
        length: 100
    }),
    __metadata("design:type", String)
], User.prototype, "Password", void 0);
__decorate([
    typeorm_1.Column({
        length: 100
    }),
    __metadata("design:type", String)
], User.prototype, "UserName", void 0);
__decorate([
    typeorm_1.Column({
        length: 100
    }),
    __metadata("design:type", String)
], User.prototype, "UserType", void 0);
User = __decorate([
    typeorm_1.Entity("User")
], User);
exports.User = User;
//# sourceMappingURL=user-entity.js.map