import React from 'react';
import type { Category } from '../type';
import { Link } from 'react-router-dom';

function CategoryItem({ category }: { category: Category }): JSX.Element {

  const className = `item__${category.id}`

  return (
    <Link to={`/categories/${category.title}`} className={className}>
      <h1>{category.title}</h1>
    </Link>
  );
}

export default CategoryItem;