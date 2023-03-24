import CardMembership from '@/components/Cards/CardMembership';
import { LayoutContext } from '@/layouts/PrincipalLayout';
import { TMembership } from '@/types/membership';
import React, { useContext, useEffect, useState } from 'react';

const Memberships = () => {
  const { setTransparent } = useContext(LayoutContext)

  const [memberships, setMemberships] = useState<TMembership[]>([])
  useEffect(() => {
    setTransparent(false)
    window
      .fetch(`/api/raffles`)
      .then((response) => response.json())
      .then((data: TMembership[]) => {
        setMemberships(data)
      })
  }, [])
  return (
    <main className="bg-slate-100 pt-16 min-h-screen">
      <div className=" mt-10 mx-10 grid gap-5">
        <h2 className="mt-4 text-lg font-medium sm:text-3xl">
          Memberships
        </h2>
      </div>
      <div className="mt-10 mx-10 grid md:grid-cols-2 gap-10">
        {memberships.map((membership, idx) => <CardMembership key={idx} />)}
      </div>

    </main>
  );
};

export default Memberships;