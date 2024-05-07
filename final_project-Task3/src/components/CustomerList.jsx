import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import Button from "@mui/material/Button";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import {CSVLink} from "react-csv";
import { getAllCustomers, addCustomer, updateCustomer, deleteCustomer,getCustomerById } from "../customerapi";

function CustomerList() {
  const [customers, setCustomers] = useState([]);
  
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
    {
      headerName: "Actions",
      cellRenderer: (params) => (
        <>
          <EditCustomer data={params.data} updateCustomer={handleUpdateCustomer} />
          <Button
            size="small"
            color="error"
            onClick={() => handleDeleteCustomer(params.data._links.self.href)}
          >
            Delete
          </Button>
        </>
      ),
    },
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


  const handleDeleteCustomer = (id) => {
    if (window.confirm("Are you sure to delete this customer?")) {
      deleteCustomer(id)
        .then(() => fetchCustomers())
        .catch((err) => console.error(err));
    }
  };

 

  const handleAddCustomer = (newCustomer) => {
    addCustomer(newCustomer)
      .then(() => fetchCustomers())
      .catch((err) => console.error(err));
  };
  const handleUpdateCustomer = (id, updatedCustomer) => {
    updateCustomer(id, updatedCustomer)
      .then(() => fetchCustomers())
      .catch((err) => console.error(err));
  };

// Function to filter out extra data for CSV export
const filterCustomerDataForExport = (customers) => {
  return customers.map(customer => {
    // Filter out extra data not needed for export
    const { _links, ...filteredCustomerData } = customer;
    return filteredCustomerData;
  });
};


  return (
    <>
    <AddCustomer addCustomer={handleAddCustomer} />
    <Button variant="contained">
        <CSVLink
          data={filterCustomerDataForExport(customers)}
          filename={"customers.csv"}
        >
          Export Customers
        </CSVLink>
      </Button>

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