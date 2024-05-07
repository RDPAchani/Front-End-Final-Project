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

export const addCustomer = (newCustomer) => {
  return fetch('https://customerrestservice-personaltraining.rahtiapp.fi/api/customers', {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(newCustomer)
  })
    .then((response) => {
      if (!response.ok) throw new Error("Error when adding a customer");
      return response.json();
    });
};
export const updateCustomer = (id, updatedCustomer) => {
  return fetch(id, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(updatedCustomer),
  })
    .then((response) => {
      if (!response.ok) throw new Error("Error when updating customer");
      return response.json();
    });
};

export const deleteCustomer = (id) => {
  console.log("Deleteing customer at URL:",id);
  return fetch(id, { method: "DELETE" })
    .then((response) => {console.log("Response from deleteCustomer:", response);
      if (!response.ok) throw new Error("Error in deletion: " + response.statusText);
      return response.json();
    })

    .catch((error) => {
      console.error("Error in deleteCustomer:", error);
      throw error;
    }); 

};

