export const useGetItemsMoreResults = () => {
  const itemsMoreResults = (categories, items) => {
    let indexCategories = [];
    let itemsResult = [];
    const numberOfcategories = categories.reduce((accumulator: [], value) => {
      return { ...accumulator, [value]: (accumulator[value] || 0) + 1 };
    }, {});
    const majorCategory = Object.keys(numberOfcategories).reduce((a, b) =>
      numberOfcategories[a] > numberOfcategories[b] ? a : b
    );
    categories.map((e, index) => {
      if (e === majorCategory) {
        indexCategories.push(index);
      }
    });
    indexCategories.map((i) => {
      items.map((item, index) => {
        if (index === i) {
          itemsResult.push(item);
        }
      });
    });
    return itemsResult;
  };
  return itemsMoreResults;
};
