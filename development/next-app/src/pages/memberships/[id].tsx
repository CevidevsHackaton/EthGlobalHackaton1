import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';

import CardFrame from '@/components/Cards/CardFrame';
import { LayoutContext } from '@/layouts/PrincipalLayout';

const MembershipDetail = () => {
  const { setTransparent } = useContext(LayoutContext)
  useEffect(() => {
    setTransparent(false)
  },)
  const { query } = useRouter()

  return (
    <main className="bg-slate-100 pt-16 min-h-screen">
      <div className='grid gap-10 sm:grid-cols-3 m-10'>

        <CardFrame className='sm:col-span-2'>
          <h3>Information</h3>

          {query.id}
        </CardFrame>

        <CardFrame className='sm:row-span-2'>
          <h3>LastRuffles</h3>

          {query.id}
        </CardFrame>
        <CardFrame className='sm:col-span-2'>
          <h3>Ruffle</h3>

          {query.id}
        </CardFrame>
      </div>

    </main>
  );
};

export default MembershipDetail;