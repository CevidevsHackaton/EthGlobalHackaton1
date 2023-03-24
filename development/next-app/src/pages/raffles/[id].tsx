import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';

import { LayoutContext } from '@/layouts/PrincipalLayout'
import CardFrame from '@/components/Cards/CardFrame';

const RafflesDetail = () => {
  const { setTransparent } = useContext(LayoutContext)
  useEffect(() => {
    setTransparent(false)
  },)
  const { query } = useRouter()
  // const [product, setProduct] = useState<TProduct | null>(null)

  return (
    <main className='pt-16 bg-slate-100 min-h-screen'>
      <div className='grid gap-10 sm:grid-cols-3 m-10'>
        <CardFrame className='sm:row-span-2'>
          <h3>Information</h3>
          {query.id}
        </CardFrame>
        <CardFrame className='sm:col-span-2'>
          <h3>Winner</h3>

          {query.id}
        </CardFrame>
        <CardFrame className='sm:col-span-2'>
          <h3>Participate</h3>

          {query.id}
        </CardFrame>
      </div>

    </main>
  );
};

export default RafflesDetail;