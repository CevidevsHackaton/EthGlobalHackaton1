import CardFrame from '@/components/Cards/CardFrame';
import { LayoutContext } from '@/layouts/PrincipalLayout';
import Image from 'next/image';
import React, { useContext, useEffect } from 'react';
import { TabPanel, useTabs } from "react-headless-tabs";
import { TabSelector } from "@/components/Tabs/TabSelector";
import MyMenberships from '@/containers/MyMemberships';
import MyParticipations from '@/containers/MyMemberships/MyParticipations';


const Profile = () => {
  const { setTransparent } = useContext(LayoutContext)
  useEffect(() => {
    setTransparent(false)
  },)
  const [selectedTab, setSelectedTab] = useTabs([
    "Memberships",
    "Participations",
  ]);
  return (
    <main className='pt-16 bg-slate-100 min-h-screen'>
      <div className='grid gap-10 sm:grid-cols-4 m-10'>
        <CardFrame className='grid gap-10'>
          <strong className='text-4xl '>Nombre</strong>
          <Image
            alt="..."
            src={require("@/assets/img/team-1-800x800.jpg").default}
            className="shadow-lg rounded-full mx-auto max-w-150-px xl:max-w-210-px "
          />
          <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum maxime architecto earum cum, odit id? Quasi vero a enim consectetur cumque saepe dolore, commodi necessitatibus obcaecati praesentium harum, odio dolorem?</span>
        </CardFrame>
        <div className='sm:col-span-3'>

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