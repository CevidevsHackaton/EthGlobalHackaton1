import React, { ReactNode } from 'react';
import { useAccount, useConnect } from 'wagmi'

type ButtonConnectProps = {
  children: ReactNode
}

const ButtonConnect = ({ children }: ButtonConnectProps) => {
  const { connect, connectors } = useConnect()

  const { isConnected } = useAccount()

  const Button = connectors && connectors.map((connectItem) => {
    return (<button
      className='bg-blueGray-800 text-white p-2 rounded-md mx-2'
      key={connectItem.id}
      onClick={() => connect({ connector: connectItem })}
    >
      {connectItem.name}
    </button>)

  })


  const AdrressOrButton = isConnected ? children : Button || ''



  return (
    <div>
      {AdrressOrButton}

    </div>

  );
};

export default ButtonConnect;