//TODO: Sortowanie nie działa na funkcji onClick, która jest używana na przycisku

export function sortDataByAscending(data: Product[]): Product[] {
  // Convert JSON object to an array of objects
  return data
    .filter((item) => item && typeof item.price === "string") // Filter out null or items without price
    .slice()
    .sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
}

export function sortDataByDescending(data: Product[]): Product[] {
  // Convert JSON object to an array of objects
  return data
    .filter((item) => item && typeof item.price === "string") // Filter out null or items without price
    .slice()
    .sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
}


