import { Query } from "express-serve-static-core";
import { Send } from "express-serve-static-core";

export class Categories {
  categories: string[] | null;
}

export class Items {
  items: Item[] | null;
}

export class Item {
  id: String;
  title: String;
  price: {
    currency: String;
    amount: Number;
    decimals: Number;
  };
  picture: String;
  condition: String;
  free_shipping: Boolean;
  state: string;
}

export class ItemDes {
  id: String;
  title: String;
  price: {
    currency: String;
    amount: Number;
    decimals: Number;
  };
  picture: String;
  condition: String;
  free_shipping: Boolean;
  sold_quantity: Number;
  description: String;
}

export interface TypedRequestQuery<T extends Query> extends Express.Request {
  query: T;
}

export interface TypedResponse<ResBody> extends Express.Response {
  json: Send<ResBody, this>;
}

export interface TypedResponse<ResBody> extends Express.Response {
  json: Send<ResBody, this>;
}
