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
exports.itemsQuery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    let newItems = new models_1.Items();
    let newCategories = new models_1.Categories();
    let filter = new models_1.Filter();
    newCategories.categories = [];
    newItems.items = [];
    filter.category = [];
    const request = req.query;
    try {
        const response = yield axios.get(`${process.env.ITEMS_QUERY}:${request.q}`);
        const responseFinal = response.data;
        responseFinal.results.map((e, index) => {
            var _a, _b, _c, _d;
            (_a = newCategories.categories) === null || _a === void 0 ? void 0 : _a.push(e.category_id);
            (_b = newItems.items) === null || _b === void 0 ? void 0 : _b.push({
                id: e.id,
                title: e.title,
                price: { currency: e.currency_id, amount: e.price, decimals: e.price },
                picture: e.thumbnail,
                condition: e.condition,
                free_shipping: (_c = e.shipping) === null || _c === void 0 ? void 0 : _c.free_shipping,
                state: (_d = e.address) === null || _d === void 0 ? void 0 : _d.state_name,
            });
        });
        (_a = responseFinal.filters) === null || _a === void 0 ? void 0 : _a.map((f) => {
            var _a;
            (_a = f.values) === null || _a === void 0 ? void 0 : _a.map((v) => {
                var _a;
                (_a = v.path_from_root) === null || _a === void 0 ? void 0 : _a.map((category) => {
                    filter.category.push(category);
                });
            });
        });
        res.json({
            author: {
                name: "jorge",
                lastname: "merida",
            },
            categories: newCategories.categories,
            items: newItems.items,
            filter,
        });
    }
    catch (error) {
        res.json({
            status: (_b = error.response) === null || _b === void 0 ? void 0 : _b.status,
            message: (_d = (_c = error.response) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.message,
        });
    }
});
exports.itemId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e, _f, _g, _h, _j, _k, _l;
    let newItem = new models_1.ItemDes();
    const idItem = req.params.id;
    try {
        const responseItemId = yield axios.get(`${process.env.ITEM_ID}${idItem}`);
        const responseFinalItemId = responseItemId.data;
        if (responseItemId) {
            try {
                const responseItemDes = yield axios.get(`${process.env.ITEM_ID}${idItem}/description`);
                const resStringItemDes = responseItemDes.data;
                const responseFinalItemDes = resStringItemDes;
                (newItem.id = responseFinalItemId.id),
                    (newItem.title = responseFinalItemId.title),
                    (newItem.price = {
                        currency: responseFinalItemId.currency_id,
                        amount: responseFinalItemId.price,
                        decimals: responseFinalItemId.currency_id === "ARS" ? 2 : 2,
                    }),
                    (newItem.picture = responseFinalItemId.thumbnail),
                    (newItem.condition = responseFinalItemId.condition),
                    (newItem.free_shipping = (_e = responseFinalItemId.shipping) === null || _e === void 0 ? void 0 : _e.free_shipping),
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
            catch (error) {
                res.json({
                    status: (_f = error.response) === null || _f === void 0 ? void 0 : _f.status,
                    message: (_h = (_g = error.response) === null || _g === void 0 ? void 0 : _g.data) === null || _h === void 0 ? void 0 : _h.message,
                });
            }
        }
        else {
            res.json({ status: 404, message: "No se encuantra el producto" });
        }
    }
    catch (error) {
        res.json({
            status: (_j = error.response) === null || _j === void 0 ? void 0 : _j.status,
            message: (_l = (_k = error.response) === null || _k === void 0 ? void 0 : _k.data) === null || _l === void 0 ? void 0 : _l.message,
        });
    }
});
