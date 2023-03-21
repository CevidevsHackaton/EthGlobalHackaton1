import React from 'react';
import { createPopper } from "@popperjs/core";
import { useAccount, useDisconnect } from 'wagmi'
import Link from 'next/link';

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

const PagesUserDropdowns = () => {

  const { address, isConnected } = useAccount()

  const { btnDropdownRef,
    popoverDropdownRef,
    dropdownPopoverShow,
    openDropdownPopover,
    closeDropdownPopover } = useDropdown()

  const { disconnect: disconectWallet } = useDisconnect()

  const disconnect = () => {
    disconectWallet()
    closeDropdownPopover()
  }
  const Address = (
    <button
      ref={btnDropdownRef}
      className='text-white p-2 border-2 rounded-md border-white'
      onClick={(e) => {
        e.preventDefault();
        dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
      }}
    >
      {trimAddress(address as string)}
    </button>)

  return (
    <>
      {isConnected && (
        <>
          {Address}
          <div >

            <div ref={popoverDropdownRef} className={
              (dropdownPopoverShow ? "block " : "hidden ") +
              "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-140-px"
            }>
              <span
                className={
                  "text-sm pt-2 pb-0 px-4 font-bold block w-full whitespace-nowrap bg-transparent text-blueGray-400"
                }
              >
                Pages
              </span>
              <Link
                href="/"
                className="text-sm cursor-pointer py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
              >
                Suscriptions
              </Link>
              <Link
                href="/raffles"
                className="text-sm cursor-pointer py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
              >
                Raffles
              </Link>
              <div className="h-0 mx-4 my-2 border border-solid border-blueGray-100" />

              <span
                className={
                  "text-sm pt-2 pb-0 px-4 font-bold block w-full whitespace-nowrap bg-transparent text-blueGray-400"
                }
              >
                User
              </span>
              <a
                className="text-sm cursor-pointer py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                onClick={() => disconnect()}
              >
                Log out
              </a>
            </div>
          </div>
        </>)
      }
    </>
  );
};


function trimAddress(value: string | undefined) {
  if (value == undefined) {
    return ""
  }
  return `${value.slice(0, 5)}...${value.slice(value.length - 5, value.length - 1)}`
}


export default PagesUserDropdowns;