import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Button from '@material-ui/core/Button';
import Addtraining from './Addtraining';
import EditCustomer from './EditCustomer';
import Snackbar from '@material-ui/core/Snackbar';
import Addcustomer from './Addcustomer';
import Grid from '@material-ui/core/Grid';

const Customerlist = () => {
  const [customers, setCustomers] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchCustomers();
  }, [])

  const handleClose = (event) => {
    setOpen(false);
  };  

  const fetchCustomers = () => {
    fetch('https://customerrest.herokuapp.com/api/customers')
    .then(response => response.json())
    .then(data => setCustomers(data.content))
    .catch(err => console.error(err))
  }

  const saveCustomer = (newCustomer) => {
    fetch('https://customerrest.herokuapp.com/api/customers',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCustomer)
      }
    )
    .then(res => fetchCustomers())
    .catch(err => console.error(err))
  }

  const saveTraining = (newTraining, link) => {
    fetch('https://customerrest.herokuapp.com/api/trainings',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTraining)
      }
    )
    .then(res => fetchCustomers())
    .catch(err => console.error(err))
  }

  const deleteCustomer = (link) => {
    if (window.confirm('Are you sure?')) {
      fetch(link, {method: 'DELETE'})
      .then(res => fetchCustomers())
      .then(res => setMessage('Customer deleted'))
      .then(res => setOpen(true))
      .catch(err => console.error(err))
    }
  }

  const updateCustomer = (customer, link) => {
    fetch(link, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(customer)
    })
    .then(res => fetchCustomers())
    .then(res => setMessage('Changes saved succesfully'))
    .then(res => setOpen(true))
    .catch(err => console.error(err))
}

  const columns = [
    {
      Header: 'Firstname',
      accessor: 'firstname'
    },
    {
      Header: 'Lastname',
      accessor: 'lastname'
    },
    {
      Header: 'Address',
      accessor: 'streetaddress'
    },
    {
      Header: 'Postcode',
      accessor: 'postcode'
    },
    {
      Header: 'City',
      accessor: 'city'
    },
    {
      Header: 'Email',
      accessor: 'email'
    },
    {
      Header: 'Phone',
      accessor: 'phone'
    },
    {
        filterable: false,
        sortable: false,
        width: 100,
        Cell: row => <EditCustomer updateCustomer={updateCustomer} customer={row.original} />
    },
    {
      accessor: 'links[0].href',
      filterable: false,
      sortable: false,
      Cell: ({value}) => <Button size="small" color="secondary" onClick={() => deleteCustomer(value)}>Delete</Button>
    },
    ]

  return (
    <div>
      <Grid container>    
        <Grid item>       
          <Addcustomer saveCustomer={saveCustomer} />      
      </Grid>
      <Grid item>       
          <Addtraining saveTraining={saveTraining} />      
      </Grid>
      <Grid style={{padding: 15}} item>
      </Grid>
      </Grid>
      <ReactTable filterable={true} columns={columns} data={customers}/>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} message={message} />
    </div>
  );
}

export default Customerlist;