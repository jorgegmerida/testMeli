const axios = require("axios");
const CircularJSON = require("circular-json");
import { Request, Response } from "express";
import {
  Categories,
  Item,
  ItemDes,
  Items,
  responseItem,
  responseItems,
  TypedRequestQuery,
  TypedResponse,
} from "../utils/models";

exports.itemsQuery = async (
  req: TypedRequestQuery<{ q: string }>,
  res: TypedResponse<responseItems>,
  next: Express.Application
) => {
  let newItems = new Items();
  let newCategories = new Categories();
  newCategories.categories = [];
  newItems.items = [];

  const request = req.query;

  try {
    const response = await axios.get(`${process.env.ITEMS_QUERY}:${request.q}`);
    const resString = CircularJSON.stringify(response.data);
    const responseFinal = JSON.parse(resString);
    responseFinal.results.map((e: any, index: any) => {
      newCategories.categories?.push(e.category_id);
      newItems.items?.push({
        id: e.id,
        title: e.title,
        price: { currency: e.currency_id, amount: e.price, decimals: e.price },
        picture: e.thumbnail,
        condition: e.condition,
        free_shipping: e.shipping.free_shipping,
        state: e.seller_address.state.name,
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
  } catch (error) {
    console.error(error);
  }
};

exports.itemId = async (
  req: Request<{ id: string }>,
  res: TypedResponse<{}>,
  // resError: Response,
  next: Express.Application
) => {
  try {
    let newItem = new ItemDes();

    const idItem = req.params.id;

    const responseItemId = await axios.get(`${process.env.ITEM_ID}${idItem}`);
    const resItemIdString = CircularJSON.stringify(responseItemId.data);
    const responseFinalItemId = JSON.parse(resItemIdString);

    if (responseItemId) {
      const responseItemDes = await axios.get(
        `${process.env.ITEM_ID}${idItem}/description`
      );
      const resStringItemDes = CircularJSON.stringify(responseItemDes.data);
      const responseFinalItemDes = JSON.parse(resStringItemDes);

      (newItem.id = responseFinalItemId.id),
        (newItem.title = responseFinalItemId.title),
        (newItem.price = {
          currency: responseFinalItemId.currency_id,
          amount: responseFinalItemId.price,
          decimals: responseFinalItemId.price,
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
    } else {
      res.json({ status: 500, mesagge: "No se encuantra el producto" });
    }
  } catch (error) {}
};
