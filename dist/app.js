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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bodyParser = __importStar(require("body-parser"));
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const appConfig = __importStar(require("./common/app-config"));
var logger = require("./common/logger");
const inversify_express_utils_1 = require("inversify-express-utils");
const inversify_config_1 = __importDefault(require("./inversify.config"));
require("./controllers/user.controller");
require("./controllers/product-controller");
require("./controllers/cart-controller");
require("./controllers/order-controller");
const app = express_1.default();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
let server = new inversify_express_utils_1.InversifyExpressServer(inversify_config_1.default, null, { rootPath: "/api" }, app);
let appConfigured = server.build();
appConfigured.set("port", process.env.PORT || 8080);
appConfigured.listen(appConfigured.get("port"), () => {
    console.log(("  App is running at http://localhost:%d in %s mode"), appConfigured.get("port"), appConfigured.get("env"));
    console.log("  Press CTRL-C to stop\n");
    logger.log('info', 'Everything started properly.');
});
typeorm_1.createConnection(appConfig.dbOptions).then((connection) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Connected to DB: " + appConfig.dbOptions.database);
})).catch(error => console.log("TypeORM connection error: ", error));
module.exports = app;
//# sourceMappingURL=app.js.map