import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from '../features/Main/Main';
import MainPage from '../features/MainContent/MainPage';
import { useAppDispatch } from '../store/store';
import { recordsLoad } from '../features/Catalog/recordsSlice';
import Registration from '../features/Auth/components/Registration';
import Login from '../features/Auth/components/Login';
import { authCheckUser } from '../features/Auth/authSlice';


function App(): JSX.Element {

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(recordsLoad()).catch(console.log)
    dispatch(authCheckUser()).catch(console.log)
  }, [])

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
