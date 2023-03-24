import CardRaffleSimple from '@/components/Cards/CardRaffleSimple';
import CardMembershipSimple from '@/components/Cards/CardMembershipSimple';
import { TRaffle } from '@/types/raffle';
import React, { useEffect, useState } from 'react';
import { TMembership } from '@/types/membership';

const MyParticipations = () => {
  const [raffles, setRaffles] = useState<TRaffle[]>([])
  const [memberships, setMemberships] = useState<TMembership[]>([])
  useEffect(() => {
    window
      .fetch(`/api/raffles`)
      .then((response) => response.json())
      .then((data: TRaffle[]) => {
        setRaffles(data)
      })
    window
      .fetch(`/api/memberships`)
      .then((response) => response.json())
      .then((data: TMembership[]) => {
        setMemberships(data)
      })
  }, [])

  const colors = [
    '#26C6DA',
    '#fecdd3',
    '#60a5fa',
    '#15803d',
  ]
  return (
    <main className='grid gap-10 sm:grid-cols-2'>
      <div >
        <div className='grid gap-5'>
          {memberships.map((membership, idx) => <CardMembershipSimple key={idx} color={colors[idx % 4]} membership={membership} />)}
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