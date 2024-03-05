
import React from 'react'
import RecordsList from '../Catalog/components/RecordsList'
import FormAddRecord from '../Catalog/components/FormAddRecord'
import CategoriesList from '../Catalog/components/CategoriesList';
import Test from '../Catalog/components/Test';


function MainPage(): JSX.Element {
  return (
    
    <div>
      <CategoriesList />
      <FormAddRecord/>
      <Test/>
      <RecordsList />
    </div>
  );
}

export default MainPage;
