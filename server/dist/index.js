"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const routes = require("./routes");
const bodyParser = require("body-parser");
require("dotenv").config({ path: "variables.env" });
const cors = require("cors");
const app = (0, express_1.default)();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use("/", routes());
const host = process.env.HOST;
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("server up on ", port);
});
