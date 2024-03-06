import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store/store';
import CategoryItem from './CategoryItem';
import '../styles/categories.scss'

function CategoriesList(): JSX.Element {
  const categories = useSelector((store: RootState) => store.categories.categories);
  
  return (
    <div className="categories__container">
      {categories.map((category) => 
        <CategoryItem key={category.id} category={category} />
      )}
    </div>
  );
}

export default CategoriesList;
