import React from "react";
import { Inputtext } from "../home/Utils";
import {
  IoMdAlbums,
  IoMdAnalytics,
  IoMdArrowDown,
  IoMdRemoveCircleOutline,
  IoMdSync,
} from "react-icons/io";

export default function HistoDemande({ nom, prenom, CIN, service }) {
  return (
    <>
      <div className=" w-full bg-white flex flex-col gap-3">
        <h1 className="text-2xl text-center font-bold">
          Traitement de la demande
        </h1>
        <div className="w-full p-4 bg-[var(--gray)] flex gap-4 flex-col h-[16rem] ">
          <h1 className="font-bold">Status de la demande</h1>
          <div className="flex cursor-pointer bg-[var(--primary-color)] items-center py-3 px-2 justify-center gap-24   text-[var(--white)] ">
            <p>En cours</p>
            <IoMdSync size={20} color="var[--white]" />
          </div>
          <div className="flex cursor-pointer py-3 px-3 justify-center gap-24  items-center bg-[var(--gray-text)] ">
            <p className="text-[var(--white)]">Refusé</p>
            <IoMdRemoveCircleOutline
              size={20}
              className=" translate-x-1 "
              color="white"
            />
          </div>
          <div className="flex cursor-pointer py-3 px-3 justify-center gap-24  items-center bg-[var(--gray-text)] ">
            <p className="text-[var(--white)]">Effectué</p>
            <IoMdAnalytics size={20} color="var[--white]" />
          </div>
        </div>
        <div className="w-full p-4 flex gap-2 flex-col bg-[var(--gray)] ">
          <h1 className="font-bold">Informations de demandeur</h1>
          <div className="flex gap-10">
            <div className="flex flex-col gap-2">
              <p>Nom :</p>
              <p>Prénom :</p>
              <p>CIN :</p>
              <p>Service :</p>
            </div>
            <div className="flex flex-col gap-2">
              <p>{nom}</p>
              <p>{prenom}</p>
              <p>{CIN}</p>
              <p>{service}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
