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
const axios = require("axios");
const CircularJSON = require("circular-json");
class Items {
}
class item {
}
class Categories {
}
exports.itemsQuery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let newItems = new Items();
    let newCategories = new Categories();
    newCategories.categories = [];
    newItems.items = [];
    const request = req.query;
    try {
        const response = yield axios.get(`${process.env.ITEMS_QUERY}:${request.q}`);
        const resString = CircularJSON.stringify(response.data);
        const responseFinal = JSON.parse(resString);
        console.log(responseFinal);
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
            });
        });
        const count = newCategories.categories.reduce((accumulator, value) => {
            return Object.assign(Object.assign({}, accumulator), { [value]: (accumulator[value] || 0) + 1 });
        }, {});
        console.log(count);
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
