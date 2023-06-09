import { TUser } from '@/types/user';
import React from 'react';
import { BiUser, BiUserCircle } from 'react-icons/bi';
import { FaUserCircle } from 'react-icons/fa';

const ListItem = ({ user }: { user: TUser }) => {
  return (
    <li className="py-3 sm:py-4">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <FaUserCircle className='text-4xl' />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
            {user.name}
          </p>
          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
            {user.address}
          </p>
        </div>
        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
          {user.id}
        </div>
      </div>
    </li>
  );
};

export default ListItem;