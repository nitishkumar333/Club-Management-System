import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Homepage from './Page/Dashboard/homepage/Homepage';
import SocietyDashboard from './SocietyDashboard'

ReactDOM.render(
  <React.StrictMode>
    <SocietyDashboard/>
  </React.StrictMode>,
  document.getElementById('root')
);

