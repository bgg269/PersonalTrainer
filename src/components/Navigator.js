import React from 'react';
import { Link } from 'react-router-dom';

const Navigator = () => {
    return (
        <div>
      <Link to="/">Customerlist</Link >{' '}
      <Link to="/trainings">Trainingslist</Link >{' '}
        </div>
    )
}
export default Navigator;