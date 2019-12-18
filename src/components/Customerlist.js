import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

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
    }
    ]

  return (
    <div>
        
      <ReactTable filterable={true} columns={columns} data={customers}/>
    </div>
  );
}

export default Customerlist;