import CardFrame from '@/components/Cards/CardFrame';
import CardMembership from '@/components/Cards/CardMembership';
import CardRaffleSimple from '@/components/Cards/CardRaffleSimple';
import { TRaffle } from '@/types/raffle';
import React, { useEffect, useState } from 'react';

const MyMenberships = () => {
  const [raffles, setRaffles] = useState<TRaffle[]>([])
  useEffect(() => {
    window
      .fetch(`/api/raffles`)
      .then((response) => response.json())
      .then((data: TRaffle[]) => {
        setRaffles(data)
      })

  },)

  return (
    <main className='grid gap-10 sm:grid-cols-2'>
      <div >
        <div className='grid gap-5'>
          <button className="max-h-11 bg-blueGray-500 hover:bg-blueGray-700 text-white font-bold py-2 px-4 border border-blueGray-700 rounded">
            New Membership +
          </button>
          <CardMembership />
          <CardMembership />
          <CardMembership />
          <CardMembership />
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