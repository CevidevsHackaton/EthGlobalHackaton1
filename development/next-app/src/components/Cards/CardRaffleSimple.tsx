import { TRaffle } from '@/types/raffle';
import { formatDistance } from 'date-fns';
import { es, enUS } from 'date-fns/locale';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaCalendar } from 'react-icons/fa'
import { TbDog } from 'react-icons/tb'
import CardFrame from './CardFrame';
import { Portal } from '../Portal';
import { TUser } from '@/types/user';
import ListContainer from '../List/ListContainer';
import ListItem from '../List/ListItem';

const CardRaffle = ({ raffle }: { raffle: TRaffle }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [users, setUsers] = useState<TUser[]>([])
  useEffect(() => {
    window
      .fetch(`/api/users`)
      .then((response) => response.json())
      .then((data: TUser[]) => {
        setUsers(data)
      })
  }, [])
  return (
    <>
      <CardFrame>
        <div className="flex-none sm:flex">
          <div
            className="relative mr-5 sm:mb-0 mb-3 hidden sm:grid sm:h-20 sm:w-20 sm:shrink-0 sm:place-content-center sm:rounded-full sm:border-2 sm:border-indigo-500"
            aria-hidden="true"
          >
            <div className="flex items-center gap-1">
              <span className="text-5xl text-blueGray-800 ">
                <TbDog />
              </span>
            </div>
          </div>

          <div className='flex-auto sm:ml-5 justify-evenly'>
            <strong
              className="rounded border border-indigo-500 bg-indigo-500 px-3 py-1.5 text-[10px] font-medium text-white"
            >
              #{raffle.id}
            </strong>

            <h3 className="mt-4 text-lg font-medium sm:text-xl">
              <Link href={`/raffles/${raffle.id}`} className="hover:underline"> {raffle.name} </Link>
            </h3>



            <div className="mt-4 sm:flex sm:items-center justify-between sm:gap-2">
              <div className="flex items-center gap-1 text-gray-500">
                <FaCalendar />

                <p className="text-xs font-medium">Finish in {formatDistance(
                  Date.now(),
                  new Date(raffle.dateEnd),
                  { locale: enUS } // Pass the locale as an option
                )}</p>
              </div>

              <span className="hidden sm:block" aria-hidden="true">&middot;</span>

              <p className="mt-2 text-xs font-medium text-gray-500 sm:mt-0">
                {'Membership '}
                <Link
                  href={`/memberships/${raffle.membershipId}`}
                  className="underline hover:text-gray-700"
                >
                  {raffle.membershipName}
                </Link>
              </p>
              <button
                onClick={() => openModal()}
                className="flex-no-shrink bg-green-400 hover:bg-green-500 px-5 ml-4 py-2 text-xs shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-green-300 hover:border-green-500 text-white rounded-full transition ease-in duration-300"
              >
                FOLLOW
              </button>

            </div>
          </div>

        </div>
      </CardFrame>
      <Portal
        isOpen={isModalOpen}
        requestClose={closeModal}
      >
        <section className='bg-slate-200 w-full p-8 pt-16'>
          <span className='text-3xl '>Participantes</span>
          <CardFrame className='mt-7 flow-root'>

            <ListContainer
              items={users}
              render={(user, idx) => <ListItem key={idx} user={user} />}
            />
          </CardFrame>
        </section>
      </Portal>
    </>
  );
};

export default CardRaffle;