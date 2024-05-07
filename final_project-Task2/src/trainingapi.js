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


 
  export const deleteTraining = (id) => {
    return fetch(id, {
      method: "DELETE"
    })
      .then((response) => {
        if (!response.ok) throw new Error("Error when deleting training");
        return response.json();
      });
  };

  export const addTraining = (newTraining) => {
    return fetch('https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date: newTraining.date,
        activity: newTraining.activity,
        duration: newTraining.duration,
        customer: newTraining.customer
      })
    })
      .then((response) => {
        if (!response.ok) throw new Error("Error when adding a training: " + response.statusText);
        return response.json();
      });
  };