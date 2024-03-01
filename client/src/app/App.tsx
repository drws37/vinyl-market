import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from '../features/Main/Main';
import MainPage from '../features/MainContent/MainPage';
import Registration from '../features/Auth/components/Registration';
import Login from '../features/Auth/components/Login';


function App(): JSX.Element {

  return (
<Routes>
  <Route path='/' element={<Main/>}>
<Route index element={<MainPage/>}/>
<Route path='sign-up' element={<Registration/>}/>
<Route path='sign-in' element={<Login/>}/>


  </Route>
</Routes>


  );
}

export default App;
