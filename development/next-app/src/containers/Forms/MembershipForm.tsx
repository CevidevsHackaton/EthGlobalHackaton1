import React, { useMemo } from 'react';
import { useAccount, useSigner } from 'wagmi';
import { providers, ethers } from 'ethers';
import { WalletService } from '@unlock-protocol/unlock-js'

const networks = {
  80001: {
    unlockAddress: "0x1FF7e338d5E582138C46044dc238543Ce555C963", // Smart contracts docs include all addresses on all networks
    provider: "https://rpc.unlock-protocol.com/80001",
  },
};

const MembershipForm = () => {
  const provider = new providers.JsonRpcProvider(networks[80001].provider);
  const { address } = useAccount()
  const { data: signer } = useSigner()

  const MINUTE = 60
  const HOUR = MINUTE * 60
  const DAY = HOUR * 24

  const createLockContact = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()

    const target: any = ev.target
    const elements = target.element

    const nombre = elements.name.value;
    const price = elements.price.value
    const time = elements.time.value
    const totalMembers = elements.totalMembers.value
    const description = elements.description.value

    const timeContract = parseInt((parseFloat(time) * DAY).toFixed(0))

    const walletService = new WalletService(networks);
    console.log({
      nombre,
      price,
      time,
      totalMembers,
      timeContract,
      walletService
    })
    // // Connect to a provider with a wallet
    // await walletService.connect(provider, signer as ethers.Signer);

    // // This only resolves when the transaction has been mined, but the callback returns the hash immediately
    // await walletService.createLock(
    //   {
    //     maxNumberOfKeys: parseInt(parseInt(totalMembers).toFixed(0)),
    //     name: nombre,
    //     expirationDuration: timeContract,
    //     keyPrice: price, // Key price needs to be a string
    //   },
    //   {}, // transaction options
    //   (error, hash) => {
    //     // This is the hash of the transaction!
    //     console.log({ hash });
    //   }
    // );

  }



  return (
    <form onSubmit={createLockContact}>
      <div className="relative w-full mb-3 mt-8">
        <label
          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
          htmlFor="Address"
        >
          Address
        </label>
        <input
          type="text"
          name='address'
          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          placeholder="Full Name"
          disabled
          value={address}
        />
      </div>
      <div className="relative w-full mb-3 mt-8">
        <label
          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
          htmlFor="full-name"
        >
          Membership&apos;s Name
        </label>
        <input
          type="text"
          name='name'
          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          placeholder="Name"
        />
      </div>

      <div className="relative w-full mb-3">
        <label
          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
          htmlFor="email"
        >
          Membership&apos;s Price (xDai)
        </label>
        <input
          type="number"
          name="price"
          step={0.001}
          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          placeholder="Price (xDai)"
        />
      </div>
      <div className="relative w-full mb-3">
        <label
          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
          htmlFor="email"
        >
          Membership&apos;s Duration (day)
        </label>
        <input
          type="number"
          name="time"
          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          placeholder="Duration Suscription (day)"
        />
      </div>
      <div className="relative w-full mb-3">
        <label
          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
          htmlFor="email"
        >
          Number of membership
        </label>
        <input
          type="number"
          name="totalMembers"
          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          placeholder="Number of membership"
        />
      </div>

      <div className="relative w-full mb-3">
        <label
          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
          htmlFor="message"
        >
          Membership&apos;s Description
        </label>
        <textarea
          rows={4}
          cols={80}
          name="description"
          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
          placeholder="Type a message..."
        />
      </div>
      <div className="text-center mt-6">
        <button
          className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="submit"
        >
          Create Membership
        </button>
      </div>
    </form>
  );
};

export default MembershipForm;