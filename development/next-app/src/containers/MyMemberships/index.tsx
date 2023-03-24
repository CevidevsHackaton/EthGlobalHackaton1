import CardMembershipSimple from '@/components/Cards/CardMembershipSimple';
import CardRaffleSimple from '@/components/Cards/CardRaffleSimple';
import { TMembership } from '@/types/membership';
import { TRaffle } from '@/types/raffle';
import React, { useEffect, useState } from 'react';

const MyMenberships = () => {
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

  return (
    <main className='grid gap-10 md:grid-cols-2'>
      <div >
        <div className='grid gap-5'>
          <button className="max-h-11 bg-blueGray-500 hover:bg-blueGray-700 text-white font-bold py-2 px-4 border border-blueGray-700 rounded">
            New Membership +
          </button>
          {memberships.map((membership, idx) => <CardMembershipSimple key={idx} membership={membership} />)}
        </div>

      </div>
      <div>

        <div className='grid gap-5 grid-'>
          <button className="bg-blueGray-500 hover:bg-blueGray-700 text-white font-bold py-2 px-4 border border-blueGray-700 rounded">
            New Rauffle +
          </button>
          {raffles.map((raffle, idx) => <CardRaffleSimple key={idx} raffle={raffle} />)}

        </div>
      </div>
    </main >

  );
};

export default MyMenberships;