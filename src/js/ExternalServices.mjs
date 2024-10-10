const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ExternalServices {
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

  async checkout(orderData) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(orderData)
    };

    try {
      const response = await fetch(`${baseURL}checkout`, options);
      const data = await convertToJson(response);
      return data; 
    } catch (error) {
      throw new Error("Failed to submit order: " + error.message);
    }
  }
}
