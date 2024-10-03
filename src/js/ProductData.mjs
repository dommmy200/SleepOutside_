const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  // Removed the category and path from the constructor, as it’s no longer needed
  constructor() {}

  // Fetch data from the API based on the category provided
  async getData(category) {
    const response = await fetch(baseURL + `products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;  
  }

  async findProductById(Id) {
    const response = await fetch(`${baseURL}product/${Id}`);
    const product = await convertToJson(response);
    return product; 
  }
}
