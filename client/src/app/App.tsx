import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from '../features/Main/Main';
import MainPage from '../features/MainContent/MainPage';
import { useAppDispatch } from '../store/store';
import { recordsLoad } from '../features/Catalog/recordsSlice';

function App(): JSX.Element {

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(recordsLoad()).catch(console.log)
  }, [])

  return (
<Routes>
  <Route path='/' element={<Main/>}>
<Route index element={<MainPage/>}/>
  </Route>
</Routes>


  );
}

export default App;
