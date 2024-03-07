import React from 'react';
import { NavLink } from 'react-router-dom';
import type { Category } from '../type';

function CategoryItem({ category }: { category: Category }): JSX.Element {

  const className = `item__${category.id}`

  return (
    <NavLink to={`/categories/${category.title}`} className={className}>
      <h1>{category.title}</h1>
    </NavLink>
  );
}

export default CategoryItem;
