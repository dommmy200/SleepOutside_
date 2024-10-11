/* eslint-disable no-console */
const baseURL = import.meta.env.VITE_SERVER_URL;

async function convertToJson(res) {
  const jsonResposne = await res.json();

  if (res.ok) {
    return jsonResposne
  } else {
    throw {
      name: "serviceError",
      message: jsonResposne
    };
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
      if (error.name === "servicesError") {
        console.error("Error submitting order:", error.message); 
      } else {
        console.error("Unknown error occurred:", error);
      }
    }
  }
}
