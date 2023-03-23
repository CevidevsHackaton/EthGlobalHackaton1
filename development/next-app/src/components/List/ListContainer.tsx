import { TUser } from '@/types/user';
import React, { Children, ReactNode } from 'react';

type TListContainer<T> = {
  children?: ReactNode
  items: T[],
  render: (t: T, idx: number) => ReactNode
}

const ListContainer = ({ items, render, children }: TListContainer<TUser>) => {
  const renderChildren = children || items.map(render)
  return (
    <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
      {renderChildren}
    </ul>
  );
};

export default ListContainer;