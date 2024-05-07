import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import Button from "@mui/material/Button";
import { getAllCustomers, getCustomerById } from "../customerapi";

function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [trainings, setTrainings] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  
  useEffect(() => {
    fetchCustomers();
  }, []);
 
  const [colDefs, setColDefs] = useState([
    { field: "firstname", headerName: "First Name", filter: true },
    { field: "lastname", headerName: "Last Name", filter: true },
    { field: "streetaddress", headerName: "Street Address", filter: true },
    { field: "postcode", headerName: "Postcode", filter: true },
    { field: "city", headerName: "City", filter: true },
    { field: "email", headerName: "Email", filter: true },
    { field: "phone", headerName: "Phone", filter: true },
  ]);

  const fetchCustomers = () => {
    getAllCustomers()
      .then((data) => setCustomers(data._embedded.customers))
      .catch((err) => console.error(err));
  };
 
  const handleGetCustomerDetails = () => {
    getCustomerById(selectedCustomerId)
      .then((customer) => setCustomers([customer]))
      .catch((err) => console.error("Error fetching customer details:", err));
  };



  return (
    <>
      <div style={{ margin: '20px 0' }}>
        <input
          type='text'
          placeholder='Enter customer ID'
          value={selectedCustomerId}
          onChange={(e) => setSelectedCustomerId(e.target.value)}
        />
        <Button variant='contained' onClick={handleGetCustomerDetails}>
          Get Customer Details
        </Button>
      </div>
    
      <div className="ag-theme-material" style={{ height: 600 }}>
        <AgGridReact
          rowData={customers}
          columnDefs={colDefs}
          pagination={true}
          paginationAutoPageSize={true}
        />
      </div>
    </>
  );
}

export default CustomerList;