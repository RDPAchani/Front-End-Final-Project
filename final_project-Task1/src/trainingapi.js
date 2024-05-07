export const getAllTrainings = () => {
    return fetch("https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings")
      .then((response) => {
        if (!response.ok) throw new Error("Error in fetch: " + response.statusText);
        return response.json();
      });
  };
  
  export const getTrainingsForCustomer = (customerId) => {
    return fetch(`https://customerrestservice-personaltraining.rahtiapp.fi/api/customers/${customerId}/trainings`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Error fetching trainings");
        }
        return response.json();
      })
      .then(data => {
        if (data._embedded && data._embedded.trainings) {
          return data._embedded.trainings;
        } else {
          return [];
        }
      })
      .catch(error => {
        console.error("Error fetching trainings for customer:", error);
        throw error;
      });
  };