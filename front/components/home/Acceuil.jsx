"use client";

import { useContext } from "react";
import { UidContext } from "@/context/UidContext";
import { CardAccueilService } from "./Utils";

export default function Acceuil() {
  const { role } = useContext(UidContext);

  return (
    <>
      <div className="w-full h-full bg-[var(--white)] flex flex-col gap-8 rounded-md ">
        {role !== "user" ? (
          <div className=" flex flex-col gap-2">
            <p className="text-2xl font-bold">Services disponibles</p>
            <p className={"font-light text-sm"}>
              Les services disponibles sur notre plateforme:
            </p>
            <div className=" w-full  grid grid-cols-2 gap-4">
              <CardAccueilService
                imgOrganisme={"/images/github.png"}
                imgService={"/images/paimentImpot.jpg"}
                organisme={"Commune Finarantsoa"}
                service={"Payement d'impots"}
              />
              <CardAccueilService
                imgOrganisme={"/images/commune.jpg"}
                imgService={"/images/acteNaissance.jpg"}
                organisme={"Commune Finarantsoa"}
                service={"Acte de naissnce"}
              />
            </div>
          </div>
        ) : (
          <div className=" flex flex-col gap-2">
            <p className="text-2xl font-bold">Demandes soumises</p>
            <p className={"font-light text-sm"}>
              Les demandes soumises aupres des differentes services crees:
            </p>
            <div className=" w-full  grid grid-cols-2  gap-4">
              <CardAccueilService
                imgOrganisme={"/images/github.png"}
                imgService={"/images/acteNaissance.jpg"}
                organisme={"Commune Finarantsoa"}
                service={" Acte de naissance"}
              />
              <CardAccueilService
                imgOrganisme={"/images/github.png"}
                imgService={"/images/paimentImpot.jpg"}
                organisme={"Commune Finarantsoa"}
                service={"Payement d'impot"}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
