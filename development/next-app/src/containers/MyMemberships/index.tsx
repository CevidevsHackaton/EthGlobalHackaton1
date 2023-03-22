import CardFrame from '@/components/Cards/CardFrame';
import React from 'react';

const MyMenberships = () => {
  return (
    <main className='grid gap-10 sm:grid-cols-2'>
      <CardFrame className='sm:col-span-2'>
        <h4 className='text-4xl'>Acciones</h4>
      </CardFrame>
      <CardFrame>
        <h4 className='text-4xl'>Memberships</h4>
      </CardFrame>
      <CardFrame>
        <h4 className='text-4xl'>Ruffles</h4>
      </CardFrame>
    </main>

  );
};

export default MyMenberships;