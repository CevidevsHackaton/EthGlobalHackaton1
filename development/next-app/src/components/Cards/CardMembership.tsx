import { TMembership } from '@/types/membership';
import { TUser } from '@/types/user';
import React, { useEffect, useState, } from 'react';
import { FaBell, FaBellSlash, FaFire, FaRegStar, FaStar, FaUserPlus } from 'react-icons/fa';
import { MdCardMembership } from 'react-icons/md';
import { useContract, useContractWrite, usePrepareContractWrite } from 'wagmi';
import ListContainer from '../List/ListContainer';
import ListItem from '../List/ListItem';
import { Portal } from '../Portal';
import CardFrame from './CardFrame';

import * as PushAPI from '@pushprotocol/restapi'
import { BigNumber, ethers } from 'ethers';
import { abiLottery } from '@/config/abi';
import { intervalToDuration, formatDuration } from 'date-fns';

type TPropCardMembership = {
  color?: string
  membership: TMembership
}



const CardMembership = ({ color, membership }: TPropCardMembership) => {

  const subscribe = async () => {
    if (window) {
      if (window.ethereum) {
        const ethereum = window.ethereum as ethers.providers.ExternalProvider
        const provider = new ethers.providers.Web3Provider(ethereum)
        const _signer = await provider.getSigner()
        await PushAPI.channels.subscribe({
          signer: _signer,
          channelAddress: 'eip155:5:0xD8634C39BBFd4033c0d3289C4515275102423681', // channel address in CAIP
          userAddress: 'eip155:5:0x52f856A160733A860ae7DC98DC71061bE33A28b3', // user address in CAIP
          onSuccess: () => {
            console.log('opt in success');
          },
          onError: () => {
            console.error('opt in error');
          },
        })
      }
    }
  }

  const unsubscribe = async () => {
    if (window) {
      if (window.ethereum) {
        const ethereum = window.ethereum as ethers.providers.ExternalProvider
        const provider = new ethers.providers.Web3Provider(ethereum)
        const _signer = await provider.getSigner()
        await PushAPI.channels.unsubscribe({
          signer: _signer,
          channelAddress: 'eip155:5:0xD8634C39BBFd4033c0d3289C4515275102423681', // channel address in CAIP
          userAddress: 'eip155:5:0x52f856A160733A860ae7DC98DC71061bE33A28b3', // user address in CAIP
          onSuccess: () => {
            console.log('opt out success');
          },
          onError: () => {
            console.error('opt out error');
          },
        })
      }
    }
  }

  // const lottery = useContract({
  //   address: '0xDf89894145A2833F5Eb4DFB909A7889B04692bEF',
  //   abi: abiLottery,
  // })
  // const { data: nBloqueFinal } = useBlockNumber()
  // const getArrayParticipantesLottery = useCallback(async () => {
  //   if (lottery) {

  //     const eventFilterStartLottery = lottery.filters.startLottery(null)
  //     const arraystartLottery = await lottery.queryFilter(eventFilterStartLottery);
  //     const arrayNumberBlock = arraystartLottery?.map(elemento => elemento.blockNumber)

  //     console.log(arrayNumberBlock);
  //     if (arrayNumberBlock) {

  //       const nBloqueInicial = arrayNumberBlock[arrayNumberBlock.length - 1]

  //       console.log("nBloqueInicial => ", nBloqueInicial);
  //       console.log("nBloqueFinal => ", nBloqueFinal);
  //       const eventFilterDepositLottery = lottery.filters.depositLottery(null)

  //       const ListaUsuarios = await lottery?.queryFilter(eventFilterDepositLottery, nBloqueInicial, nBloqueFinal);
  //       if (ListaUsuarios && ListaUsuarios.length > 0) {
  //         const arrayAddressUsers = ListaUsuarios.map((element: ethers.Event) => element?.args && element.args[0])

  //         console.log("arrayAddressUsers => ", arrayAddressUsers);
  //         return arrayAddressUsers
  //       }
  //     }
  //   }
  // }, [nBloqueFinal, lottery])



  const { config } = usePrepareContractWrite({
    address: '0xDf89894145A2833F5Eb4DFB909A7889B04692bEF',
    abi: abiLottery,
    functionName: 'suscripcion',
    overrides: {
      gasLimit: BigNumber.from(10000000),
      value: BigNumber.from(80),
    },
  })
  const { write: suscripcionMembership } = useContractWrite(config,)

  const colorUse = color ?? '#1E3229'

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);


  const expiration =
    membership?.expirationDuration
      && typeof membership.expirationDuration === "string"
      && typeof parseInt(membership.expirationDuration) === 'number'
      ? parseInt(membership.expirationDuration) || 0
      : 0

  const timeInDays = intervalToDuration({
    end: expiration * 1000,
    start: 0,
  }
  )

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
                    {membership?.name}
                  </div>
                  <div className="flex-auto text-gray-500 my-1">
                    <span className="mr-3 ">
                      {membership?.price / 1000000 / 1000000 / 1000000} xDAI
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
                  <p className="">
                    {formatDuration(timeInDays)

                    }
                  </p>
                </div>
              </div>
              <button
                className="max-h-10 flex-no-shrink bg-green-600 hover:bg-green-900 px-5 ml-4 py-2 text-xs shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-green-800 hover:border-green-900 text-white rounded-full transition ease-in duration-300"
                onClick={openModal}
              >
                FOLLOWERS
              </button>
            </div>
          </div>
        </div>
      </CardFrame>
      <Portal
        isOpen={isModalOpen}
        requestClose={closeModal}
      >
        <section className='bg-slate-200 w-full p-8 pt-16 grid'>
          <span className='text-3xl '>Participantes</span>
          <div className='grid grid-flow-col gap-3 w-2/5'>
            <button
              onClick={subscribe}
              className='border-2 mx-auto border-blue-600 bg-blue-500 p-1 rounded-lg text-white'>
              <FaBell />
            </button>
            <button
              onClick={unsubscribe}
              className='border-2 mx-auto border-blue-600 bg-blue-500 p-1 rounded-lg text-white'>
              <FaBellSlash />
            </button>
            <button
              // disabled={!suscripcionMembership}
              onClick={() => suscripcionMembership?.()}
              className='disabled:bg-gray-700 border-2  border-green-800 bg-green-500 p-1 rounded-lg text-white'>
              Buy membership
            </button>
          </div>
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