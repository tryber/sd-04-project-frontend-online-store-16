async function getCategories() {
  const categories = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const categoriesJSON = await categories.json();
  return categoriesJSON;
}

async function getProductsFromCategoryAndQuery(categoryId, query) {
  const items = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`);
  const itemsJSON = await items.json();
  return itemsJSON;
}

export {
  getCategories,
  getProductsFromCategoryAndQuery,
};
