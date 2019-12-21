import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import MenuItem from '@material-ui/core/MenuItem';

export default function Addtraining(props) {
    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState([]);
    const [training, setTraining] = useState({
        date: new Date(), duration: '', activity: ''});
  
        const fetchCustomers = () => {
          fetch('https://customerrest.herokuapp.com/api/customers')
            .then((response) => response.json())
            .then((data) => {
              setCustomer(data.content)
            })
        };
    
        const handleClickOpen = () => {
        setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleChange = (event) => {
        setTraining({...training, [event.target.name]: event.target.value })
    }

    const addTraining = () => {
        props.saveTraining(training)
        handleClose();
    }
  
    return(
      <div style={{margin: 10}}>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add training
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New training</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill the information for a new training
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="activity"
            value={training.activity}
            onChange={e => handleChange(e)}
            label="Activity"
            fullWidth
          />
          <TextField
            margin="dense"
            name="date"
            value={training.date}
            onChange={e => handleChange(e)}
            label="Date"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            name="duration"
            value={training.duration}
            onChange={e => handleChange(e)}
            label="Duration"
            fullWidth
          />
          <TextField
                    select
                    margin="normal"
                    name="customer"
                    onClick={fetchCustomers}
                    value={training.customer}
                    onChange={(e) => handleChange(e)}
                    helperText="Customer"
                    >
                        {customer.map(customer => (
                            <MenuItem value={customer.links[0].href}
                            key={customer.links[0].href}>
                                {customer.firstname} {customer.lastname}
                            </MenuItem>
                        ))}
          </TextField>
          
        </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={addTraining} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  </div>
  )
}