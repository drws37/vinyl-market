import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store/store';

function CategoryPage(): JSX.Element {
  const categories = useSelector((store: RootState) => store.categories.categories);

  return <div className="category__page__main"></div>;
}

export default CategoryPage;
