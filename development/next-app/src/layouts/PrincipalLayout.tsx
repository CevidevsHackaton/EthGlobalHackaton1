import Navbar from '@/components/Navbars/AuthNavbar';
import React, { createContext, ReactNode, useContext, useState } from 'react';



type LayoutProps = {
  children: ReactNode
}

export type TypeLayoutContext = {
  transparent: boolean
  setTransparent: (c: boolean) => void
}

const StateLayoutContext: TypeLayoutContext = { transparent: true, setTransparent: () => { } }

export const LayoutContext = createContext<TypeLayoutContext>(StateLayoutContext);

export const Layout = (props: LayoutProps) => {
  const [transparent, setTransparent] = useState<boolean>(true)
  const initContext = { transparent, setTransparent }
  return (
    <LayoutContext.Provider value={initContext}>
      <LayoutInterface {...props} />
    </LayoutContext.Provider>
  )
}

const LayoutInterface = ({ children }: LayoutProps) => {
  const { transparent } = useContext(LayoutContext);
  return (
    <>
      <Navbar transparent={transparent} />
      {children}
    </>
  );
};
