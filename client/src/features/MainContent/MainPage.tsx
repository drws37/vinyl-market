
import React from 'react'
import RecordsList from '../Catalog/components/RecordsList'
import FormAddRecord from '../Catalog/components/FormAddRecord'
import CategoriesList from '../Catalog/components/CategoriesList';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

function MainPage(): JSX.Element {
  const records = useSelector((store: RootState) => store.records.records)
  console.log(records);
  return (
    
    <div>
      <CategoriesList />
      <FormAddRecord/>
      <RecordsList />
    </div>
  );
}

export default MainPage;
