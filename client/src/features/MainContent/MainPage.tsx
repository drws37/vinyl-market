import React from 'react';
import RecordsList from '../Catalog/components/RecordsList';
import CategoriesList from '../Catalog/components/CategoriesList';

function MainPage(): JSX.Element {
  return (
    <div>
      <CategoriesList />
      <RecordsList />
    </div>
  );
}

export default MainPage;
