import CardFrame from '@/components/Cards/CardFrame';
import { LayoutContext } from '@/layouts/PrincipalLayout';
import Image from 'next/image';
import React, { useContext, useEffect } from 'react';
import { TabPanel, useTabs } from "react-headless-tabs";
import { TabSelector } from "@/components/Tabs/TabSelector";
import MyMenberships from '@/containers/MyMemberships';
import MyParticipations from '@/containers/MyParticipations';
import Link from 'next/link';
import { MdModeEditOutline } from 'react-icons/md';


const Profile = () => {
  const { setTransparent } = useContext(LayoutContext)
  useEffect(() => {
    setTransparent(false)
  }, [])
  const [selectedTab, setSelectedTab] = useTabs([
    "Memberships",
    "Participations",
  ]);
  return (
    <main className='pt-16 bg-slate-100 min-h-screen'>
      <div className='grid gap-10 md:grid-cols-4 m-10'>
        <div className=''>

          <CardFrame className='grid gap-10'>
            <div>
              <strong className='text-4xl '>Nombre</strong>
              <button
                className="float-right  text-white p-2 text-lg bg-green-400 hover:bg-green-500 font-medium tracking-wider rounded-lg transition ease-in duration-300">
                <MdModeEditOutline />
              </button>
            </div>
            <div className=" relative mx-auto mb-3 xl:w-56  2xl:h-72 2xl:w-72 sm:mb-0">
              <Image
                alt="..."
                src={require("@/assets/img/team-1-800x800.jpg").default}
                className="shadow-lg rounded-full mx-auto"
              />
              <Link href="#"
                className="absolute right-5 bottom-6 hover:bottom-4 hover:right-3 -ml-3  text-white p-2 hover:p-4 text-lg bg-green-400 hover:bg-green-500 font-medium tracking-wider rounded-full transition ease-in duration-300">
                <MdModeEditOutline />
              </Link>
            </div>
            <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum maxime architecto earum cum, odit id? Quasi vero a enim consectetur cumque saepe dolore, commodi necessitatibus obcaecati praesentium harum, odio dolorem?</span>
          </CardFrame>
        </div>

        <div className='md:col-span-3'>
          <nav className=" flex border-b border-gray-300">
            <TabSelector
              isActive={selectedTab === "Memberships"}
              onClick={() => setSelectedTab("Memberships")}
            >
              My memberships
            </TabSelector>
            <TabSelector
              isActive={selectedTab === "Participations"}
              onClick={() => setSelectedTab("Participations")}
            >
              My participations
            </TabSelector>
          </nav>
          <div className="p-4 rounded-b-lg shadow-lg">
            <TabPanel hidden={selectedTab !== "Memberships"}>
              <MyMenberships />
            </TabPanel>
            <TabPanel hidden={selectedTab !== "Participations"}>
              <MyParticipations />
            </TabPanel>
          </div>
        </div>

      </div>
    </main>
  );
};

export default Profile;