import CardFrame from '@/components/Cards/CardFrame';
import React from 'react';

const MyParticipations = () => {
  return (
    <main className='grid gap-10 '>
      <CardFrame>
        <h4 className='text-4xl'>My Memberships</h4>
      </CardFrame>
      <CardFrame>
        <h4 className='text-4xl'>My Ruffes</h4>
      </CardFrame>
    </main>
  );
};

export default MyParticipations;