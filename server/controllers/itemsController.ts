const axios = require("axios");
const CircularJSON = require("circular-json");

class Items {
  items: item[] | null;
}

class item {
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
}

class Categories {
  categories: string[] | null;
}

exports.itemsQuery = async (req: any, res: any) => {
  let newItems = new Items();
  let newCategories = new Categories();
  newCategories.categories = [];
  newItems.items = [];

  const request = req.query;

  try {
    const response = await axios.get(`${process.env.ITEMS_QUERY}:${request.q}`);
    const resString = CircularJSON.stringify(response.data);
    const responseFinal = JSON.parse(resString);
    console.log(responseFinal);
    responseFinal.results.map((e: any, index: any) => {
      newCategories.categories?.push(e.category_id);
      newItems.items?.push({
        id: e.id,
        title: e.title,
        price: { currency: e.currency_id, amount: e.price, decimals: e.price },
        picture: e.thumbnail,
        condition: e.condition,
        free_shipping: e.shipping.free_shipping,
      });
    });
    const count = newCategories.categories.reduce((accumulator: any, value) => {
      return { ...accumulator, [value]: (accumulator[value] || 0) + 1 };
    }, {});
    console.log(count);
    res.json({
      author: {
        name: "jorge",
        lastname: "merid",
      },
      categories: newCategories.categories,
      items: newItems.items,
    });
  } catch (error) {
    console.error(error);
  }
};
