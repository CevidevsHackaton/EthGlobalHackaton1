import React, { useEffect, useState } from 'react';

import { TMembership } from '@/types/membership';
import Select from "react-tailwindcss-select";
import { SelectValue, Option } from "react-tailwindcss-select/dist/components/type"
import { raffles } from '@/mocks/raffles';



const RaffleForm = ({ memberships }: { memberships: TMembership[] }) => {

  const [selectedOptions, setSelectedOptions] = useState<SelectValue>([]);

  const [membershipOptions, setMembershipOptions] = useState([{ label: '', value: '' }])

  useEffect(() => {
    const options: Option[] = memberships
      .map((mem) => {
        const option: Option = {
          value: mem.address,
          label: mem.name
        }
        return option
      }
      )
    setMembershipOptions(options)
  }, [memberships])


  const addRaffle = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()

    raffles.push({
      id: "D215D15C80AC2D12",
      dateStar: new Date("2023-01-02"),
      dateEnd: new Date("2023-04-04"),
      description: " ev.target.elements.description.value",
      membershipId: 40,
      membersCount: 200,
      membershipName: "newRuffle",
      name: "newRuffle",
      requirements: {
        monthsOfMembership: 2,
        isActiveMembership: false,
        costRaffle: 0
      },
    })
  }




  return (
    <form onSubmit={(ev) => addRaffle(ev)}>
      <div className="relative w-full mb-3 mt-8">
        <label
          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
          htmlFor="Address"
        >
          Address
        </label>

        <Select
          value={selectedOptions}
          onChange={(value) => setSelectedOptions(value)}
          options={membershipOptions}
          classNames={{ list: "z-10" }}
          primaryColor={"blue"}
          isMultiple={true}
          loading={false}
        />
      </div>
      <div className="relative w-full mb-3 mt-8">
        <label
          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
          htmlFor="full-name"
        >
          Raffle&apos;s Date End
        </label>
        <input
          type="date"
          name="date"
          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          placeholder="Name"
        />
      </div>
      <div className="relative w-full mb-3 mt-8">
        <label
          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
          htmlFor="full-name"
        >
          Raffle&apos;s Name
        </label>
        <input
          type="text"
          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          placeholder="Name"
          name='name'
        />
      </div>
      <div className="relative w-full mb-3">
        <label
          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
          htmlFor="message"
        >
          Raffle&apos;s Description
        </label>
        <textarea
          rows={4}
          cols={80}
          name='description'
          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
          placeholder="Type a message..."
        />
      </div>
      <div className="text-center mt-6">
        <button
          className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="submit"
        >
          Create Raffle
        </button>

      </div>
    </form >
  );
};

export default RaffleForm;