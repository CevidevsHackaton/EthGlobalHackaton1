import CardFrame from '@/components/Cards/CardFrame';
import CardMembershipSimple from '@/components/Cards/CardMembershipSimple';
import CardRaffleSimple from '@/components/Cards/CardRaffleSimple';
import { Portal } from '@/components/Portal';
import { TMembership } from '@/types/membership';
import { TRaffle } from '@/types/raffle';
import React, { useEffect, useState } from 'react';
import MembershipForm from '../Forms/MembershipForm';
import RaffleForm from '../Forms/RaffleForm';

const MyMenberships = () => {
  const [raffles, setRaffles] = useState<TRaffle[]>([])
  const [raffle, setRaffle] = useState<TMembership[]>([])
  const [isRaffleModalOpen, setIsModalRaffleOpen] = useState(false);
  const closeModalRaffle = () => setIsModalRaffleOpen(false);
  const openFormRaffle = () => {
    setIsModalRaffleOpen(true)
  }


  const [memberships, setMemberships] = useState<TMembership[]>([])
  const [isMembershipModalOpen, setIsModalMembershipOpen] = useState(false);
  const closeModalMembership = () => setIsModalMembershipOpen(false);
  const openFormMembership = () => {
    setIsModalMembershipOpen(true)
  }
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
    <>
      <main className='grid gap-10 md:grid-cols-2'>
        <div >
          <div className='grid gap-5'>
            <button
              className="max-h-11 bg-blueGray-500 hover:bg-blueGray-700 text-white font-bold py-2 px-4 border border-blueGray-700 rounded"
              onClick={openFormMembership}
            >
              New Membership +
            </button>
            {memberships.map((membership, idx) => <CardMembershipSimple key={idx} membership={membership} />)}
          </div>

        </div>
        <div>

          <div className='grid gap-5 grid-'>
            <button
              className="bg-blueGray-500 hover:bg-blueGray-700 text-white font-bold py-2 px-4 border border-blueGray-700 rounded"
              onClick={openFormRaffle}
            >
              New Rauffle +
            </button>
            {raffles.map((raffle, idx) => <CardRaffleSimple key={idx} raffle={raffle} />)}

          </div>
        </div>
      </main>
      <Portal
        isOpen={isMembershipModalOpen}
        requestClose={closeModalMembership}
        classes={{ contentClassName: "max-w-sm min-w-full sm:min-w-0 min-h-screen-75" }}
      >
        <section className='bg-transparent w-full h-full p-8 pt-16 grid gap-1' >
          <span className='text-2xl text-blueGray-800'>Add Membership</span>
          <MembershipForm />
        </section>
      </Portal>
      <Portal
        isOpen={isRaffleModalOpen}
        requestClose={closeModalRaffle}
        classes={{ contentClassName: "max-w-sm min-w-full sm:min-w-0 min-h-screen-75" }}
      >
        <section className='bg-slate-100 w-full h-full p-8 pt-16 grid gap-1' >
          <span className='text-2xl text-blueGray-800'>Add Raffle</span>
          <RaffleForm memberships={memberships} />
        </section>
      </Portal>
    </>

  );
};

export default MyMenberships;