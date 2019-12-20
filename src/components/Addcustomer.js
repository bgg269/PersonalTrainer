import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export default function Addcustomer(props) {
    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState(
      {firstname: '', lastname: ''}
    );
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleChange = (event) => {
      setCustomer({...customer, [event.target.name]: event.target.value })
    }
  
    const addCustomer = () => {
      props.saveCustomer(customer);
      handleClose();
    }
  
    return(
      <div style={{margin: 10}}>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add customer
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New customer</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill the information for new customer
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="firstname"
            value={customer.firstname}
            onChange={e => handleChange(e)}
            label="Firstname"
            fullWidth
          />
          <TextField
            margin="dense"
            name="lastname"
            value={customer.lastname}
            onChange={e => handleChange(e)}
            label="Lastname"
            fullWidth
          />
          
        </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={addCustomer} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  </div>
  )
}