import React from 'react';
import { useAccount, useConnect, useDisconnect, useEnsName } from 'wagmi'
import { createPopper } from "@popperjs/core";
import { disconnect } from 'process';

function useDropdown() {
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef<HTMLButtonElement>();
  const popoverDropdownRef = React.createRef<HTMLDivElement>();
  const openDropdownPopover = () => {
    const btnDropdownRefCurrent = btnDropdownRef.current
    const popoverDropdownRefCurrent = popoverDropdownRef.current
    if (btnDropdownRefCurrent !== null && popoverDropdownRefCurrent !== null) {
      createPopper(btnDropdownRefCurrent, popoverDropdownRefCurrent, {
        placement: "bottom-start",
      });
    }
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  return {
    btnDropdownRef,
    popoverDropdownRef,
    dropdownPopoverShow,
    openDropdownPopover,
    closeDropdownPopover
  }
}

const ButtonConnect = () => {
  const { connect, connectors } = useConnect()

  const { address, isConnected } = useAccount()

  const { disconnect: disconectWallet } = useDisconnect()

  const { btnDropdownRef,
    popoverDropdownRef,
    dropdownPopoverShow,
    openDropdownPopover,
    closeDropdownPopover } = useDropdown()

  const Button = connectors && connectors.map((connectItem) => {
    return (<button
      className='bg-blueGray-800 text-white p-2 rounded-md mx-2'
      key={connectItem.id}
      onClick={() => connect({ connector: connectItem })}
    >
      {connectItem.name}
    </button>)

  })
  const Address = (
    <button
      ref={btnDropdownRef}
      className='text-white p-2'
      onClick={(e) => {
        e.preventDefault();
        dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
      }}
    >
      {trimAddress(address as string)}
    </button>)

  const AdrressOrButton = isConnected ? Address : Button || ''

  const disconnect = () => {
    disconectWallet()
    closeDropdownPopover()
  }

  return (
    <div>
      {AdrressOrButton}
      <div ref={popoverDropdownRef} className={
        (dropdownPopoverShow ? "block " : "hidden ") +
        "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-140-px"
      }>
        <span
          className={
            "text-sm pt-2 pb-0 px-4 font-bold block w-full whitespace-nowrap bg-transparent text-blueGray-400"
          }
        >
          User
        </span>
        <a
          className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          onClick={() => disconnect()}
        >
          Log out
        </a>
      </div>
    </div>

  );
};

function trimAddress(value: string | undefined) {
  if (value == undefined) {
    return ""
  }
  return `${value.slice(0, 5)}...${value.slice(value.length - 5, value.length - 1)}`
}

export default ButtonConnect;