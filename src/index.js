import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import Homepage from './Page/Dashboard/homepage/Homepage';
import HomepageLayout from './Page/Dashboard/homepage/HomepageLayout';
import Login from './Page/Dashboard/login/Login'
import { AuthProvider } from './Page/context'

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <HomepageLayout />
    </AuthProvider>
    {/* <Login /> */}
  </React.StrictMode>,
  document.getElementById('root')
);

