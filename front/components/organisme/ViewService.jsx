"use client";

import DemandeDesc from "../user/DemandeDesc";

export default function ViewService({ service, useServie, setUseService }) {
  return (
    <>
      <div className="h-full flex flex-col justify-between px-2 bg-[var(--white)] rounded-3xl ">
        <div className="h-full flex flex-col gap-6 px-2 bg-[var(--white)] rounded-3xl ">
          <p className=" bgText text-4xl font-bold">{service.name}</p>

          {useServie ? (
            <>
              <DemandeDesc service={service} />
            </>
          ) : (
            <div className=" w-full flex flex-col gap-4">
              <div className=" w-full flex flex-col gap-2 ">
                <p className="text-xl font-bold">Description</p>
                <p className={"font-light text-sm pl-1 w-3/5"}>
                  {service.description}
                </p>
              </div>
              <div className="flex flex-col gap-2 ">
                <p className="text-xl font-bold">Tarif</p>
                <ul className={"list-disc pl-5"}>
                  <li>
                    <p className="font-semibold">{service.tarif} Ar</p>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col gap-2 ">
                <p className="text-xl font-bold">Durée</p>
                <ul className={"list-disc pl-5"}>
                  <li>
                    <p className="font-semibold">{service.duree} mois</p>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* <div className="  w-full h-full grid grid-cols-2 gap-4">
          <div className=" h-full bg-[var(--gray)] rounded-xl "></div>
          <div className=" h-full bg-[var(--gray)] rounded-xl "></div>
        </div> */}
        </div>
        {useServie ? (
          <div className="flex gap-8 justify-end">
            <button
              onClick={() => setUseService(false)}
              className=" text-[var(--primary-color)] border border-[var(--primary-color)] py-2 w-36 justify-center items-center rounded-lg self-end flex gap-4"
            >
              <span>Annuler</span>
            </button>
            <button
              onClick={() => {
                setUseService(true);
              }}
              className=" text-[var(--white)] bg-[var(--primary-color)] py-2 w-36 justify-center items-center rounded-lg self-end flex gap-4"
            >
              <span>Soumettre</span>
            </button>
          </div>
        ) : (
          <button
            onClick={() => setUseService(true)}
            className=" text-[var(--white)] bg-[var(--primary-color)] py-2 w-36 flex justify-center items-center rounded-lg self-end flex items-center gap-4"
          >
            <span>Utiliser</span>
          </button>
        )}
      </div>
    </>
  );
}
