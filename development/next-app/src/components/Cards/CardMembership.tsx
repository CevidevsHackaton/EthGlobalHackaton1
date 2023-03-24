import { TMembership } from '@/types/membership';
import { TUser } from '@/types/user';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FaFire, FaRegStar, FaStar, FaUserPlus } from 'react-icons/fa';
import { MdCardMembership } from 'react-icons/md';
import ListContainer from '../List/ListContainer';
import ListItem from '../List/ListItem';
import { Portal } from '../Portal';
import CardFrame from './CardFrame';

type TPropCardMembership = {
  color?: string
  membership: TMembership
}

const CardMembership = ({ color, membership }: TPropCardMembership) => {
  const colorUse = color ?? '#1E3229'

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
  }
    , [])
  return (
    <>
      <CardFrame>
        <div className="flex-none sm:flex">
          <div
            className={`2xl:mr-2 sm:mb-0 mb-3 hidden sm:grid sm:h-20 sm:w-20 sm:shrink-0 sm:place-content-center sm:rounded-full sm:border-2`}
            style={{ borderColor: colorUse }}
            aria-hidden="true"
          >
            <div className="flex items-center">
              <span className={`text-5xl text-blueGray-700`}>
                <MdCardMembership />
              </span>
            </div>
          </div>
          <div className="flex-auto sm:ml-5 justify-evenly">
            <div className="flex items-center justify-between sm:mt-2">
              <div className="flex items-center">
                <div className="flex flex-col">
                  <div className="w-full flex-none text-lg text-gray-800 font-bold leading-none">
                    {membership?.address}
                  </div>
                  <div className="flex-auto text-gray-500 my-1">
                    <span className="mr-3 ">
                      {membership?.price} xDAI
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center">
              <div className="flex">
                <FaStar className='text-yellow-400' />
                <FaStar className='text-yellow-400' />
                <FaStar className='text-yellow-400' />
                <FaStar className='text-yellow-400' />
                <FaRegStar className='text-yellow-400' />
              </div>
            </div>
            <div className="flex pt-2  text-sm justify-between text-gray-500">
              <div className='flex gap-2 flex-col 2xl:flex-row'>
                <div className="flex-1 inline-flex items-center">
                  <span className={`text-lg mr-2`} style={{ color: colorUse }}>
                    <FaUserPlus />
                  </span>
                  <p className="">1.2k Followers</p>
                </div>
                <div className="flex-1 inline-flex items-center">
                  <span className={`text-lg mr-2`} style={{ color: colorUse }}>
                    <FaFire />
                  </span>
                  <p className="">14 Components</p>
                </div>
              </div>
              <button
                className="flex-no-shrink bg-green-400 hover:bg-green-500 px-5 ml-4 py-2 text-xs shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-green-300 hover:border-green-500 text-white rounded-full transition ease-in duration-300"
                onClick={openModal}
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

export default CardMembership;