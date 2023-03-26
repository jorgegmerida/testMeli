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
const axios = require("axios");
const CircularJSON = require("circular-json");
const models_1 = require("../utils/models");
exports.itemsQuery = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let newItems = new models_1.Items();
    let newCategories = new models_1.Categories();
    newCategories.categories = [];
    newItems.items = [];
    const request = req.query;
    try {
        const response = yield axios.get(`${process.env.ITEMS_QUERY}:${request.q}`);
        const resString = CircularJSON.stringify(response.data);
        const responseFinal = JSON.parse(resString);
        responseFinal.results.map((e, index) => {
            var _a, _b;
            (_a = newCategories.categories) === null || _a === void 0 ? void 0 : _a.push(e.category_id);
            (_b = newItems.items) === null || _b === void 0 ? void 0 : _b.push({
                id: e.id,
                title: e.title,
                price: { currency: e.currency_id, amount: e.price, decimals: e.price },
                picture: e.thumbnail,
                condition: e.condition,
                free_shipping: e.shipping.free_shipping,
                state: e.address.state_name,
            });
        });
        res.json({
            author: {
                name: "jorge",
                lastname: "merida",
            },
            categories: newCategories.categories,
            items: newItems.items,
        });
    }
    catch (error) {
        console.error(error);
    }
});
exports.itemId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let newItem = new models_1.ItemDes();
        const idItem = req.params.id;
        const responseItemId = yield axios.get(`${process.env.ITEM_ID}${idItem}`);
        const resItemIdString = CircularJSON.stringify(responseItemId.data);
        const responseFinalItemId = JSON.parse(resItemIdString);
        if (responseItemId) {
            const responseItemDes = yield axios.get(`${process.env.ITEM_ID}${idItem}/description`);
            const resStringItemDes = CircularJSON.stringify(responseItemDes.data);
            const responseFinalItemDes = JSON.parse(resStringItemDes);
            (newItem.id = responseFinalItemId.id),
                (newItem.title = responseFinalItemId.title),
                (newItem.price = {
                    currency: responseFinalItemId.currency_id,
                    amount: responseFinalItemId.price,
                    decimals: responseFinalItemId.currency_id === "ARS" ? 2 : 2,
                }),
                (newItem.picture = responseFinalItemId.thumbnail),
                (newItem.condition = responseFinalItemId.condition),
                (newItem.free_shipping = responseFinalItemId.shipping.free_shipping),
                (newItem.sold_quantity = responseFinalItemId.sold_quantity),
                (newItem.description = responseFinalItemDes.plain_text);
            res.json({
                author: {
                    name: "jorge",
                    lastname: "merida",
                },
                item: newItem,
            });
        }
        else {
            res.json({ status: 500, mesagge: "No se encuantra el producto" });
        }
    }
    catch (error) { }
});
