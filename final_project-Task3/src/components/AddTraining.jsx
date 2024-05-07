import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import dayjs from 'dayjs'; // Import Day.js for date formatting



const AddTraining = ({ addTraining }) => {
  const [open, setOpen] = useState(false);
  const [training, setTraining] = useState({
    date:dayjs().format('YYYY-MM-DDTHH:mm'), 
    duration: "",
    activity: "",
    customer:"", //customer reference link
    firstname: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

 
  const handleSave = () => {
    // Add customer reference link to training object
    addTraining(training);
    handleClose();
  };





  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Training
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Training</DialogTitle>
        <DialogContent>
        <TextField
      margin="dense"
      label="Date"
      type="datetime"
      value={training.date}
      onChange={(e) => setTraining({ ...training, date: e.target.value })}
      fullWidth
      variant="standard"
      InputLabelProps={{
        shrink: true,
      }}
    />



          <TextField
            margin="dense"
            label="Duration"
            value={training.duration}
            onChange={(e) => setTraining({ ...training, duration: e.target.value })}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            label="Activity"
            value={training.activity}
            onChange={(e) => setTraining({ ...training, activity: e.target.value })}
            fullWidth
            variant="standard"
          />
           <TextField
            margin="dense"
            label="Customer Name"
            value={training.firstname}
            onChange={(e) => setTraining({ ...training, firstname: e.target.value })}
            fullWidth
            variant="standard"
          />
         <TextField
            margin="dense"
            label="Customer ID"
            value={training.customer}
            onChange={(e) => setTraining({ ...training, customer: e.target.value })}
            fullWidth
            variant="standard"
          />

       
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default AddTraining;