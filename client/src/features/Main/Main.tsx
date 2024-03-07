import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

function Main(): JSX.Element {
  return (
    <div className="main">
      <Header />
      <div className="body">
        <Outlet />
      </div>
    </div>
  );
}
export default Main;
