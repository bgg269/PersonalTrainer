import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Moment from 'moment';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';


export default function TrainingsList(props) {
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [trainings, setTrainings] = useState([]);
  const trainingsLink = 'https://customerrest.herokuapp.com/api/trainings/'


  useEffect(() => {
    fetchTrainings();
  }, [])

  const fetchTrainings = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
    .then(response => response.json())
    .then(data => setTrainings(data))
    .catch(err => console.error(err))
  }


  const handleClose = () => {
    setOpen(false);
  };

  const deleteTraining = (link) => {
    if (window.confirm('Are you sure?')) {
      fetch(trainingsLink + link, { method: 'DELETE' })
        .then(res => fetchTrainings())
        .then(res => setMessage('Training deleted'))
        .then(res => setOpen(true))
        .catch(err => console.error(err))
    }
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
    },
    {
        Header: "Customer's firstname",
        accessor: 'customer.firstname'
    },
    {
        Header: "Customer's lastname",
        accessor: 'customer.lastname'
    },
    {
      accessor: 'links[0].href',
      filterable: false,
      sortable: false,
      accessor: 'id',
      Cell: ({ value }) => <Button size="small" color="secondary" onClick={() => deleteTraining(value)}>Delete</Button>
    },
    ]

  return (
        <div>
          <ReactTable filterable={true} columns={columns} data={trainings} />
          <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} message={message}/>
        </div>
      
  );
}

