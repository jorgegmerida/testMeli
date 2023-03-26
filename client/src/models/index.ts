export interface CounterState {
  list: list;
  showItems: boolean;
  idItem: string;
  itemDetail: ItemDes;
  search: string;
}

export interface item {
  id: string;
  title: string;
  price: {
    currency: string;
    amount: number;
    decimals: number;
  };
  picture: string;
  condition: string;
  free_shipping: boolean;
  state: string;
}

export interface ItemDes {
  author: { name: string; lastname: string };
  item: {
    id: string;
    title: string;
    price: {
      currency: string;
      amount: number;
      decimals: number;
    };
    picture: string;
    condition: string;
    free_shipping: boolean;
    sold_quantity: number;
    description: string;
  };
}

export interface list {
  author: {
    name: string;
    lastname: string;
  };
  categories: string[];
  items: {
    id: string;
    title: string;
    price: {
      currency: string;
      amount: number;
      decimals: number;
    };
    picture: string;
    condition: string;
    free_shipping: boolean;
  }[];
}
