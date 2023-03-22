import { TRaffle } from '@/types';
import { formatDistance } from 'date-fns';
import { es, enUS } from 'date-fns/locale';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaCalendar } from 'react-icons/fa'
import { GiLotus } from 'react-icons/gi'
import CardFrame from './CardFrame';

const CardRaffle = ({ raffle }: { raffle: TRaffle }) => {
  return (
    <CardFrame>
      <div className="flex items-start sm:gap-8">
        <div
          className="hidden sm:grid sm:h-20 sm:w-20 sm:shrink-0 sm:place-content-center sm:rounded-full sm:border-2 sm:border-indigo-500"
          aria-hidden="true"
        >
          <div className="flex items-center gap-1">
            <span className="text-5xl text-blueGray-800 "><GiLotus /></span>
          </div>
        </div>

        <div>
          <strong
            className="rounded border border-indigo-500 bg-indigo-500 px-3 py-1.5 text-[10px] font-medium text-white"
          >
            #{raffle.id}
          </strong>

          <h3 className="mt-4 text-lg font-medium sm:text-xl">
            <Link href={`/raffles/${raffle.id}`} className="hover:underline"> {raffle.name} </Link>
          </h3>

          <p className="mt-1 text-sm text-gray-700">
            {raffle.description}
          </p>

          <div className="mt-4 sm:flex sm:items-center sm:gap-2">
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
          </div>
        </div>
      </div>
    </CardFrame>


  );
};

export default CardRaffle;