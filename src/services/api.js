async function getCategories() {
  const categories = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const categoriesJSON = await categories.json();
  return categoriesJSON;
}

async function getProductsFromCategory(categoryId) {
  const items = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`);
  const itemsJSON = await items.json();
  return itemsJSON;
}

async function getProductsFromQuery(query) {
  const items = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`);
  const itemsJSON = await items.json();
  return itemsJSON;
}

async function getProductsFromCategoryAndQuery(categoryId, query) {
  const items = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`);
  const itemsJSON = await items.json();
  return itemsJSON;
}

async function getProductDetails(productId) {
  const details = await fetch(`https://api.mercadolibre.com/items/${productId}`);
  const detailsJSON = await details.json();
  return detailsJSON;
}

export {
  getCategories,
  getProductsFromCategory,
  getProductsFromQuery,
  getProductsFromCategoryAndQuery,
  getProductDetails,
};
