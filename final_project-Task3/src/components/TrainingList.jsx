import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import Button from "@mui/material/Button";
import AddTraining from "./AddTraining";
import { getAllTrainings, addTraining, deleteTraining,getTrainingsForCustomer} from "../trainingapi";
import dayjs from 'dayjs';

function TrainingList() {
  const [trainings, setTrainings] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);

  useEffect(() => {
    fetchTrainings();
  }, []);

  const dateFormatter = (params) => {
    return dayjs(params.value).format('YYYY-MM-DDTHH:mm');
  };

  const [colDefs, setColDefs] = useState([
    { field: "date", headerName: "Date", filter: true, valueFormatter: dateFormatter },
    { field: "duration", headerName: "Duration (minutes)", filter: true },
    { field: "activity", headerName: "Activity", filter: true },
    { field: "customer", headerName: "Customer", filter: true },
    {
      headerName: "Actions",
      cellRenderer: (params) => (
        <>
         
          <Button
            size="small"
            color="error"
            onClick={() => handleDeleteTraining(params.data._links.self.href)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ]);

  const fetchTrainings = () => {
    getAllTrainings()
      .then((data) => setTrainings(data._embedded.trainings))
      .catch((err) => console.error(err));
  };

  const handleGetTrainings = () => {
    if (!selectedCustomerId) {
      console.error("No customer selected");
      return;
    }

    // Fetch trainings for the selected customer
    getTrainingsForCustomer(selectedCustomerId)
      .then(trainings => setTrainings(trainings))
      .catch(error => console.error("Error fetching trainings:", error));
  };

  const handleDeleteTraining = (id) => {
    if (window.confirm("Are you sure to delete this training?")) {
      deleteTraining(id)
        .then(() => fetchTrainings())
        .catch((err) => console.error(err));
    }
  };

  const handleAddTraining = (newTraining) => {
    addTraining(newTraining)
      .then(() => fetchTrainings())
      .catch((err) => console.error(err));
  };

  return (
    <>
    <AddTraining addTraining={handleAddTraining} />
      <div style={{ margin: '20px 0' }}>
        <input
          type='text'
          placeholder='Enter customer ID'
          value={selectedCustomerId}
          onChange={(e) => setSelectedCustomerId(e.target.value)}
        />
        <Button variant='contained' onClick={handleGetTrainings}>
          Get Training Details
        </Button>
      </div>
      <div className="ag-theme-material" style={{ height: 600 }}>
        <AgGridReact
          rowData={trainings}
          columnDefs={colDefs}
          pagination={true}
          paginationAutoPageSize={true}
        />
      </div>
    </>
  );
}

export default TrainingList;