import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from '../features/Main/Main';
import MainPage from '../features/MainContent/MainPage';

function App(): JSX.Element {

  return (
<Routes>
  <Route path='/' element={<Main/>}>
<Route index element={<MainPage/>}/>
  </Route>
</Routes>


  );
}

export default App;
