
import React from 'react'
import RecordsList from '../Catalog/components/RecordsList'
import FormAddRecord from '../Catalog/components/FormAddRecord'
import CategoriesList from '../Catalog/components/CategoriesList';


function MainPage(): JSX.Element {
  return (
    
    <div>
      <CategoriesList />
      <FormAddRecord/>
      <RecordsList />
    </div>
  );
}

export default MainPage;
