
export function sortDataByAscending(Products: Product[], changeProducts:(newProducts: any) => void): Product[] {

  var SortedProducts = Products
    .filter((item) => item && typeof item.price === "string") // Filter out null or items without price
    .slice()
    .sort((a, b) => parseFloat(a.price.replace(/\D/g, "")) - parseFloat(b.price.replace(/\D/g, "")));
  changeProducts(SortedProducts);
  return SortedProducts;
}

export function sortDataByDescending(Products: Product[], changeProducts:(newProducts: any) => void): Product[] {

  var SortedProducts = Products
    .filter((item) => item && typeof item.price === "string") // Filter out null or items without price
    .slice()
    .sort((a, b) => parseFloat(b.price.replace(/\D/g, "")) - parseFloat(a.price.replace(/\D/g, "")));
  changeProducts(SortedProducts);
  return SortedProducts;
}


