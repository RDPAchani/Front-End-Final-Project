export const getAllCustomers = () => {
  return fetch("https://customerrestservice-personaltraining.rahtiapp.fi/api/customers")
    .then((response) => {
      if (!response.ok) throw new Error("Error in fetch" + response.statusText);
      return response.json();
    });
};

export const getCustomerById = (id) => {
  return fetch(`https://customerrestservice-personaltraining.rahtiapp.fi/api/customers/${id}`)
    .then((response) => {
      if (!response.ok) throw new Error("Error in fetch: " + response.statusText);
      return response.json();
    })
    .catch((error) => {
      console.error("Error in getCustomerById:", error);
      throw error;
    });
};

