"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const itemsController = require("../controllers/itemsController");
module.exports = () => {
    router.get("/api/items?:q", itemsController.itemsQuery);
    router.get("/api/items/:id", itemsController.itemId);
    return router;
};
