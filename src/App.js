import React from 'react';
import './App.css';
import Customerlist from './components/Customerlist';
import Trainingslist from './components/Trainingslist';
import {BrowserRouter, Switch, Route , Link} from 'react-router-dom'
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Calendar from './components/Calendar';

function App() {
  const [anchorEl, setAnchorEl] = React.useState();

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl();
  };

  return (
    <div className="App">
      <BrowserRouter>
      <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">
          
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        Menu
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Link to="/" style={{color: "black"}}>
        <MenuItem onClick={handleClose}>Costumers</MenuItem>
        </Link>
        <Link to="/trainings" style={{color: "black"}}>
        <MenuItem onClick={handleClose}>Trainings</MenuItem>
        </Link>
        <Link to="/calendar" style={{color: "black"}}>
        <MenuItem onClick={handleClose}>Calendar</MenuItem>
        </Link>
      </Menu>
      Personal Trainer
        </Typography>
      </Toolbar>
    </AppBar>

          
      <div>
      <Switch>
        <Route exact path="/" component={Customerlist} />
        <Route exact path="/trainings" component={Trainingslist} />
        <Route exact path="/calendar" component={Calendar} />
        <Route render= {() => <h1>Page not found</h1>}/>
      </Switch>
      </div>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
