const axios = require("axios");
const CircularJSON = require("circular-json");
import { parse, stringify, toJSON, fromJSON } from "flatted";
import { Request } from "express";
import {
  Categories,
  Filter,
  ItemDes,
  Items,
  TypedRequestQuery,
  TypedResponse,
} from "../utils/models";

exports.itemsQuery = async (
  req: TypedRequestQuery<{ q: string }>,
  res: TypedResponse<{}>
) => {
  let newItems = new Items();
  let newCategories = new Categories();
  let filter = new Filter();
  newCategories.categories = [];
  newItems.items = [];
  filter.category = [];

  const request = req.query;

  try {
    const response = await axios.get(`${process.env.ITEMS_QUERY}:${request.q}`);
    const responseFinal = response.data;

    responseFinal.results.map((e: any, index: any) => {
      newCategories.categories?.push(e.category_id);
      newItems.items?.push({
        id: e.id,
        title: e.title,
        price: { currency: e.currency_id, amount: e.price, decimals: e.price },
        picture: e.thumbnail,
        condition: e.condition,
        free_shipping: e.shipping?.free_shipping,
        state: e.address?.state_name,
      });
    });

    responseFinal.filters?.map((f: any) => {
      f.values?.map((v: any) => {
        v.path_from_root?.map((category: any) => {
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
  } catch (error: any) {
    res.json({
      status: error.response?.status,
      message: error.response?.data?.message,
    });
  }
};

exports.itemId = async (
  req: Request<{ id: string }>,
  res: TypedResponse<{}>
) => {
  let newItem = new ItemDes();

  const idItem = req.params.id;

  try {
    const responseItemId = await axios.get(`${process.env.ITEM_ID}${idItem}`);
    const responseFinalItemId = responseItemId.data;

    if (responseItemId) {
      try {
        const responseItemDes = await axios.get(
          `${process.env.ITEM_ID}${idItem}/description`
        );
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
          (newItem.free_shipping = responseFinalItemId.shipping?.free_shipping),
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
