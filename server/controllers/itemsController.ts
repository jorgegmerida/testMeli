const axios = require("axios");
const CircularJSON = require("circular-json");
import { Request, Response } from "express";
import {
  Categories,
  ItemDes,
  Items,
  TypedRequestQuery,
  TypedResponse,
} from "../utils/models";

exports.itemsQuery = async (
  req: TypedRequestQuery<{ q: string }>,
  res: TypedResponse<{}>,
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
  } catch (error: any) {
    res.json({
      status: error.response?.status,
      message: error.response?.data?.message,
    });
  }
};

exports.itemId = async (
  req: Request<{ id: string }>,
  res: TypedResponse<{}>,
  next: Express.Application
) => {
  let newItem = new ItemDes();

  const idItem = req.params.id;

  try {
    const responseItemId = await axios.get(`${process.env.ITEM_ID}${idItem}`);
    const resItemIdString = CircularJSON.stringify(responseItemId.data);
    const responseFinalItemId = JSON.parse(resItemIdString);

    if (responseItemId) {
      try {
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
      } catch (error: any) {
        res.json({
          status: error.response?.status,
          message: error.response?.data?.message,
        });
      }
    } else {
      res.json({ status: 404, message: "No se encuantra el producto" });
    }
  } catch (error: any) {
    res.json({
      status: error.response?.status,
      message: error.response?.data?.message,
    });
  }
};
