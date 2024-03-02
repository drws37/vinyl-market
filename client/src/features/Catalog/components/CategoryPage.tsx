import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import type { RootState } from '../../../store/store';
import CategoryItem from './CategoryItem';
import RecordItem from './RecordItem';
import '../styles/categories.scss'

function CategoryPage(): JSX.Element {
  const { categoryTitle } = useParams();
  console.log(categoryTitle, 'categoryTitle');

  const categories = useSelector((store: RootState) => store.categories.categories);
  console.log(categories);

  const currentCategory = categoryTitle
    ? categories.find((category) => category.title === categoryTitle)
    : undefined;

  console.log(currentCategory, 'CURRENT CAT');

  return (
    <div className="category__page__main">
      <div className="sidebar">
        <h2>Жанры:</h2>
        {categories.map((category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </div>
      <div className="content">
        {currentCategory?.Records?.map((record) => <RecordItem key={record.id} record={record} />)}
      </div>
    </div>
  );
}

export default CategoryPage;
