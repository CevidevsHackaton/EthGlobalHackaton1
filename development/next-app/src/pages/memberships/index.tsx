import CardMembership from '@/components/Cards/CardMembership';
import { LayoutContext } from '@/layouts/PrincipalLayout';
import { TMembership } from '@/types/membership';
import { SubgraphService } from '@unlock-protocol/unlock-js';
import React, { useContext, useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

const Memberships = () => {
  const { setTransparent } = useContext(LayoutContext)

  const [memberships, setMemberships] = useState<TMembership[]>([])
  const { address } = useAccount()

  const getMemberships = async () => {
    const service = new SubgraphService()
    const locks = await service.locks(
      {
        first: 10,
        skip: 110,
        where: { expirationDuration_lte: '10000000000' }
      },
      {
        networks: [80001],
      }
    )
    setMemberships(locks as TMembership[])
  }
  useEffect(() => {
    setTransparent(false)
    getMemberships()

  }, [])
  const colors = [
    '#26C6DA',
    '#fecdd3',
    '#60a5fa',
    '#15803d',
  ]
  return (
    <main className="bg-slate-100 pt-16 min-h-screen">
      <div className=" mt-10 mx-10 grid gap-5">
        <h2 className="mt-4 text-lg font-medium sm:text-3xl">
          Memberships
        </h2>
      </div>
      <div className="mt-10 mx-10 grid md:grid-cols-2 gap-10">
        {memberships.map((membership, idx) => <CardMembership key={idx} membership={membership} color={colors[idx % 4]} />)}
      </div>

    </main>
  );
};

export default Memberships;