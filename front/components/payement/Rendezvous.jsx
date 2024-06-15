import React, { useState } from "react";

export default function Rendezvous() {
  const [date, setDate] = useState("");
  const [heure, setHeure] = useState("");
  return (
    <>
      <div className=" fixed top-0 left-0 w-full h-full flex items-center justify-center bg-[rgb(0,0,0,0.5)] ">
        <div className=" p-4 bg-[var(--white)] flex flex-col gap-4 rounded-md px-8 min-w-[34rem] ">
          <p className=" text-xl uppercase text-center">Rendez-vous</p>
          <div className=" w-full h-[2px] bg-[var(--gray)] "></div>
          <div className=" w-full flex flex-col gap-1">
            <p className=" px-4">Date</p>
            <input
              id="date"
              type="date"
              className="bg-[var(--gray)] rounded-md py-2 px-4 outline-none  w-full"
              name="date"
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className=" w-full flex flex-col gap-1">
            <p className=" px-4">Heure</p>
            <input
              id="heure"
              type="date"
              className="bg-[var(--gray)] rounded-md py-2 px-4 outline-none  w-full"
              name="heure"
              onChange={(e) => setHeure(e.target.value)}
            />
          </div>
          <div className=" w-full h-[2px] bg-[var(--gray)] "></div>

          <div className=" w-full flex items-center gap-4">
            <button className=" w-1/2 py-2 bg-[var(--primary-color)] text-[var(--white)] rounded-md ">
              Anuller
            </button>
            <button className=" w-1/2 py-2 bg-[var(--blue-theme)] text-[var(--white)] rounded-md ">
              Confirmer
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
