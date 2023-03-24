import CardRaffleSimple from '@/components/Cards/CardRaffleSimple';
import CardMembershipSimple from '@/components/Cards/CardMembershipSimple';
import { TRaffle } from '@/types/raffle';
import React, { useEffect, useState } from 'react';

const MyParticipations = () => {
  const [raffles, setRaffles] = useState<TRaffle[]>([])
  useEffect(() => {
    window
      .fetch(`/api/raffles`)
      .then((response) => response.json())
      .then((data: TRaffle[]) => {
        setRaffles(data)
      })
  }, [])
  return (
    <main className='grid gap-10 sm:grid-cols-2'>
      <div >
        <div className='grid gap-5'>
          <CardMembershipSimple color='#26C6DA' />
          <CardMembershipSimple color='#fecdd3' />
          <CardMembershipSimple color='#60a5fa' />
          <CardMembershipSimple color='#15803d' />
        </div>

      </div>
      <div>

        <div className='grid gap-5 grid-'>
          {raffles.map((raffle, idx) => <CardRaffleSimple key={idx} raffle={raffle} />)}

        </div>
      </div>
    </main >
  );
};

export default MyParticipations;