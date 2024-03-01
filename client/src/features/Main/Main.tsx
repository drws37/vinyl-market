import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function Main(): JSX.Element {
  return (
    <div className="main">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
export default Main;
