import React from 'react';
import { useAccount } from 'wagmi';

const MembershipForm = () => {
  const { address } = useAccount()
  return (
    <form>
      <div className="relative w-full mb-3 mt-8">
        <label
          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
          htmlFor="Address"
        >
          Address
        </label>
        <input
          type="text"
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
          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          placeholder="Price (xDai)"
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
          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
          placeholder="Type a message..."
        />
      </div>
      <div className="text-center mt-6">
        <button
          className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
        >
          Create Membership
        </button>
      </div>
    </form>
  );
};

export default MembershipForm;