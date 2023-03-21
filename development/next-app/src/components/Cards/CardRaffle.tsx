import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaEthereum } from 'react-icons/fa'

const CardRaffle = ({ id }: { id: number }) => {

  return (
    <article className="rounded-xl bg-white p-4 ring ring-indigo-50 sm:p-6 lg:p-8">
      <div className="flex items-start sm:gap-8">
        <div
          className="hidden sm:grid sm:h-20 sm:w-20 sm:shrink-0 sm:place-content-center sm:rounded-full sm:border-2 sm:border-indigo-500"
          aria-hidden="true"
        >
          <div className="flex items-center gap-1">
            <span className="h-8 w-0.5 rounded-full bg-indigo-500"></span>
            <span className="h-6 w-0.5 rounded-full bg-indigo-500"></span>
            <span className="h-4 w-0.5 rounded-full bg-indigo-500"></span>
            <span className="h-6 w-0.5 rounded-full bg-indigo-500"></span>
            <span className="h-8 w-0.5 rounded-full bg-indigo-500"></span>
          </div>
        </div>

        <div>
          <strong
            className="rounded border border-indigo-500 bg-indigo-500 px-3 py-1.5 text-[10px] font-medium text-white"
          >
            Sorteo #101
          </strong>

          <h3 className="mt-4 text-lg font-medium sm:text-xl">
            <Link href={`/raffles/${id}`} className="hover:underline"> Entradas a Lorem </Link>
          </h3>

          <p className="mt-1 text-sm text-gray-700">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam nulla
            amet voluptatum sit rerum, atque, quo culpa ut necessitatibus eius
            suscipit eum accusamus, aperiam voluptas exercitationem facere aliquid
            fuga. Sint.
          </p>

          <div className="mt-4 sm:flex sm:items-center sm:gap-2">
            <div className="flex items-center gap-1 text-gray-500">
              <FaEthereum />

              <p className="text-xs font-medium">0.125</p>
            </div>

            <span className="hidden sm:block" aria-hidden="true">&middot;</span>

            <p className="mt-2 text-xs font-medium text-gray-500 sm:mt-0">
              Featuring <a href="#" className="underline hover:text-gray-700">Barry</a>,
              <a href="#" className="underline hover:text-gray-700">Sandra</a> and
              <a href="#" className="underline hover:text-gray-700">August</a>
            </p>
          </div>
        </div>
      </div>
    </article>


  );
};

export default CardRaffle;