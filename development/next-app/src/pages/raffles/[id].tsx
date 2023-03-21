import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';

import { LayoutContext } from '@/layouts/PrincipalLayout'

const RafflesDetail = () => {
  const { setTransparent } = useContext(LayoutContext)
  useEffect(() => {
    setTransparent(false)
  },)
  const { query } = useRouter()
  // const [product, setProduct] = useState<TProduct | null>(null)

  return (
    <div>
      {query.id}
    </div>
  );
};

export default RafflesDetail;