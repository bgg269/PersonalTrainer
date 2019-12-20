import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Moment from 'moment';

const Trainingslist = () => {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    fetchTrainings();
  }, [])

  const fetchTrainings = () => {
    fetch('https://customerrest.herokuapp.com/api/trainings')
    .then(response => response.json())
    .then(data => setTrainings(data.content))
    .catch(err => console.error(err))
  }

  const columns = [
    {
      Header: 'Activity',
      accessor: 'activity'
    },
    {
      Header: 'Date',
      accessor: 'date',
      Cell: row => Moment(row.value).format('DD.MM.YYYY HH:MM')
    },
    {
      Header: 'Duration (min)',
      accessor: 'duration'
    }
    ]

  return (
    <div> 
      <ReactTable filterable={true} columns={columns} data={trainings}/>
    </div>
  );
}

export default Trainingslist;