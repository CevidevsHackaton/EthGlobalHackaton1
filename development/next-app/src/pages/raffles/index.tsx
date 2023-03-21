import CardRaffle from "@/components/Cards/CardRaffle";
import { LayoutContext } from "@/layouts/PrincipalLayout";
import React, { useContext, useEffect } from "react";

export default function Landing() {
  const { setTransparent } = useContext(LayoutContext)
  useEffect(() => {
    setTransparent(false)
  },)
  const listRaffle = [...Array(6)]
  return (
    <>
      <div className="pt-16 mt-10 mx-10 grid gap-5">
        <h2 className="mt-4 text-lg font-medium sm:text-3xl">
          Raffles
        </h2>
      </div>
      <div className="mt-10 mx-10 grid gap-5">
        {listRaffle.map((_, idx) => <CardRaffle key={idx} id={idx} />)}

      </div>
    </>
  );
}