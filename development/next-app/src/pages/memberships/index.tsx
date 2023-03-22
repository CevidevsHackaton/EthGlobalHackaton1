import { LayoutContext } from '@/layouts/PrincipalLayout';
import React, { useContext, useEffect } from 'react';

const Memberships = () => {
  const { setTransparent } = useContext(LayoutContext)
  useEffect(() => {
    setTransparent(false)
  },)
  return (
    <main className="bg-slate-100 pt-16 min-h-screen">


    </main>
  );
};

export default Memberships;