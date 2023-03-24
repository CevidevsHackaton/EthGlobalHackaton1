import CardRaffle from "@/components/Cards/CardRaffle";
import { LayoutContext } from "@/layouts/PrincipalLayout";
import { TRaffle } from "@/types/raffle";
import React, { useContext, useEffect, useState } from "react";

export default function Landing() {
  const { setTransparent } = useContext(LayoutContext)

  const [raffles, setRaffles] = useState<TRaffle[]>([])
  useEffect(() => {
    setTransparent(false)
    window
      .fetch(`/api/raffles`)
      .then((response) => response.json())
      .then((data: TRaffle[]) => {
        setRaffles(data)
      })
  }, [])
  return (
    <>
      <main className="bg-slate-100 pt-16 min-h-screen">
        <div className=" mt-10 mx-10 grid gap-5">
          <h2 className="mt-4 text-lg font-medium sm:text-3xl">
            Raffles
          </h2>
        </div>
        <div className="mt-10 mx-10 grid md:grid-cols-2 gap-10">
          {raffles.map((raffle, idx) => <CardRaffle key={idx} raffle={raffle} />)}
        </div>
      </main>

    </>
  );
}