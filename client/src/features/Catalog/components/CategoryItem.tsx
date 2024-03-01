import React from 'react';
import type { Category } from '../type';

function CategoryItem({ category }: { category: Category }): JSX.Element {

  const className = `item__${category.id}`

  return (
    <div className={className}>
      <h1>{category.title}</h1>
    </div>
  );
}

export default CategoryItem;
