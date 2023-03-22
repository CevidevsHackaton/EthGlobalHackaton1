import React, { ReactNode, useEffect, useState } from 'react';
import { useAccount, useConnect } from 'wagmi'

type ButtonConnectProps = {
  children: ReactNode
}
type renderType = string | ReactNode

const ButtonConnect = ({ children }: ButtonConnectProps) => {
  const { connect, connectors } = useConnect()

  const { isConnected } = useAccount()

  const [render, setRender] = useState<renderType>("")

  const Button = connectors && connectors.map((connectItem) => {
    return (<button
      className='bg-blueGray-800 text-white p-2 rounded-md mx-2'
      key={connectItem.id}
      onClick={() => connect({ connector: connectItem })}
    >
      {connectItem.name}
    </button>)

  })


  useEffect(() => {
    if (isConnected) {
      setRender(children)
    } else {
      setRender(Button)
    }
  }, [Button, children, isConnected])



  return (
    <>
      {render}
    </>

  );
};

export default ButtonConnect;