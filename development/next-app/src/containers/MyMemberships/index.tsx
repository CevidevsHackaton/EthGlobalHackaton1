import CardMembershipSimple from '@/components/Cards/CardMembershipSimple';
import CardRaffleSimple from '@/components/Cards/CardRaffleSimple';
import { Portal } from '@/components/Portal';
import { TMembership } from '@/types/membership';
import { TRaffle } from '@/types/raffle';
import React, { useEffect, useState } from 'react';
import MembershipForm from '../Forms/MembershipForm';
import RaffleForm from '../Forms/RaffleForm';
import { SubgraphService } from '@unlock-protocol/unlock-js'
import { useAccount, useContractWrite, usePrepareContractWrite } from 'wagmi';
import { abiLottery } from '@/config/abi';
import { BigNumber } from 'ethers';

const MyMenberships = () => {
  const [raffles, setRaffles] = useState<TRaffle[]>([])
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

  const { address } = useAccount()

  useEffect(() => {
    window
      .fetch(`/api/raffles`)
      .then((response) => response.json())
      .then((data: TRaffle[]) => {
        setRaffles(data)
      })
    getMemberships()

  }, [])


  const getMemberships = async () => {
    const service = new SubgraphService()
    const locks = await service.locks(
      {
        first: 10,
        where: { lockManagers_contains: [address] },
      },
      {
        networks: [80001],
      }
    )
    setMemberships(locks as TMembership[])
  }

  const { config } = usePrepareContractWrite({
    address: '0xDf89894145A2833F5Eb4DFB909A7889B04692bEF',
    abi: abiLottery,
    functionName: 'Random',
    overrides: {
      gasLimit: BigNumber.from(10000000),
    },
  })
  const { write: genereateRaffle, isSuccess } = useContractWrite(config,)

  useEffect(() => {
    if (isSuccess) {
      const rfoo = [...raffles]
      rfoo.unshift({
        id: "D215D15C80AC2D12",
        dateStar: new Date("2023-01-02"),
        dateEnd: new Date("2023-04-04"),
        description: " ev.target.elements.description.value",
        membershipId: 40,
        membersCount: 200,
        membershipName: "newRuffle",
        name: "Nuevo",
        requirements: {
          monthsOfMembership: 2,
          isActiveMembership: false,
          costRaffle: 0
        },
      })
      setRaffles(rfoo)
    }
  }, [isSuccess])


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
              onClick={genereateRaffle}
            >
              New Rauffle +
            </button>
            {raffles.map((raffle, idx) => <CardRaffleSimple key={idx} raffle={raffle} isNew={raffle.membershipName === "newRuffle"} />)}

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