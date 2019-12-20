import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

import Addcustomer from './Addcustomer';
import Grid from '@material-ui/core/Grid';

const Customerlist = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, [])

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
    ]

  return (
    <div>
      <Grid container>    
        <Grid item>       
          <Addcustomer saveCustomer={saveCustomer} />      
      </Grid>
      <Grid style={{padding: 15}} item>
      </Grid>
      </Grid>
      <ReactTable filterable={true} columns={columns} data={customers}/>
    </div>
  );
}

export default Customerlist;