"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaArrowRight, FaEllipsis } from "react-icons/fa6";
import { IoMdArrowDropright } from "react-icons/io";
import { BsArrowRight } from "react-icons/bs";

export function PrimaryBouton({ label, fullWidth, fontBig }) {
  return (
    <button
      className={`text-[var(--white)] h-full rounded-md py-2 px-16 bg-[var(--primary-color)] font-semibold ${
        fullWidth ? "w-full" : ""
      } ${fontBig ? "" : "text-sm"}`}
    >
      {label}
    </button>
  );
}

export function Bouton({ label, bg, color, width }) {
  return (
    <>
      <button
        className={`text-[var(--${color})] rounded-full py-2 px-12 bg-[var(--${bg})] font-bold w-${width}`}
      >
        {label}
      </button>
    </>
  );
}
export function Lien({ label, icon, url }) {
  return (
    <>
      <Link
        href={{ url }}
        className=" w-full flex items-center gap-6 px-8 py-5  lien  "
      >
        {icon}
        <p className=" capitalize">{label}</p>
      </Link>
    </>
  );
}
export function Notification({ ImageSrc, nom, service, duree }) {
  return (
    <>
      <div className=" w-full flex justify-between bg-[var(--gray)] rounded-md py-2 px-4 ">
        <div className="flex items-center gap-2">
          <div className="relative w-20 h-20 rounded-full">
            <Image
              src={"/images/girl1.png"}
              alt=""
              fill
              objectFit="cover"
              className="rounded-full"
            />
          </div>
          <div className=" h-full flex flex-col justify-between">
            <div className=" flex flex-col">
              <p>{nom}</p>
              <p className=" text-[var(--gray-text)] ">{service}</p>
            </div>
            <p className=" text-[var(--primary-color)] ">{duree}</p>
          </div>
        </div>
        <div className=" h-full flex flex-col justify-between">
          <FaEllipsis size={"1.5rem"} className=" cursor-pointer" />
          <Link href={""} className="  ">
            <FaArrowRight className=" text-[var(--primary-color)] " />
          </Link>
        </div>
      </div>
    </>
  );
}

export function FileInputComponent() {
  const [fileName, setFileName] = useState("");
  const [fileUrl, setFileUrl] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      setFileUrl(URL.createObjectURL(file));
    } else {
      setFileName("");
      setFileUrl("");
    }
  };

  return (
    <div>
      <label htmlFor="fileInput" className="text-sm pl-2 font-bold">
        Image CIN
      </label>
      <input
        type="file"
        id="fileInput"
        className="outline-none hidden px-2 py-2 rounded-md bg-[var(--gray)]"
        onChange={handleFileChange}
      />
      <br />
      <br />
      {fileName && (
        <div className="text-sm pl-2">
          <p>Nom du fichier : {fileName}</p>
          <a href={fileUrl} target="_blank" rel="noopener noreferrer">
            Lire le fichier
          </a>
        </div>
      )}
      <br />
      <input type="submit" value="Soumettre" />
    </div>
  );
}

export function Liste({
  service,
  path,
  currentQuery,
  setActualService,
  user,
  setPay,
  statut = "attente",
}) {
  return (
    <div className="flex gap-6 h-28  bg-[var(--color-light)] justify-center p-4 rounded-xl">
      <div className="w-1/3 flex justify-center items-center">
        <div className="relative h-20 rounded-lg w-full flex justify-center items-center">
          <Image
            src={user ? "/images/user.png" : "/images/gouv.jpg"}
            alt=""
            fill
            objectFit={"cover"}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
      <div className="flex flex-col w-2/3 justify-evenly">
        <label className={"font-bold whitespace-nowrap overflow-hidden"}>
          {service?.name}
        </label>
        {/* <label className="text-[var(--gray-text)] whitespace-nowrap text-xs overflow-x-hidden">
          {service.description}
        </label> */}
        {statut !== "accepted" ? (
          <button
            onClick={() => {
              setActualService(service);
              setPay(true);
            }}
            className="  flex items-center gap-4 justify-center text-[#227f03] bg-[#ffde00] py-1.5 px-2 rounded-md"
          >
            Payer via MVola
          </button>
        ) : (
          <Link
            href={{
              pathname: path,
              query: { path: currentQuery?.path, view: service?.id },
            }}
            onClick={() => {
              setActualService(service);
            }}
            className="bg-[var(--primary-color)] gap-2 rounded-md cursor-pointer flex items-center py-2 justify-center"
          >
            <span className="text-[var(--white)] font-semibold text-xs">
              Consulter
            </span>
            {/* <IoMdArrowDropright size={25} color="var(--white)" /> */}
          </Link>
        )}
      </div>
    </div>
  );
}

export function ListeDemandeComponent({ demande, accept, reject }) {
  return (
    <div className="flex gap-6 h-28  bg-[var(--color-light)] justify-center p-4 rounded-xl">
      <div className="w-1/3 flex justify-center items-center">
        <div className="relative h-20 rounded-lg w-full flex justify-center items-center">
          <Image
            src={"/images/user.png"}
            alt=""
            fill
            objectFit={"cover"}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
      <div className="flex flex-col w-2/3 justify-between">
        <label className={"font-bold whitespace-nowrap overflow-hidden"}>
          {demande?.user.name} {demande?.user?.username}
        </label>
        <label className="text-[var(--gray-text)] whitespace-nowrap text-xs overflow-x-hidden">
          {demande.statut === "attente"
            ? "En attente"
            : demande.statut === "accepted"
            ? "Accepte"
            : "Refuse"}
        </label>
        <div className="flex gap-4">
          <button
            onClick={() => reject(demande.id)}
            className="border border-[var(--primary-color)] text-[var(--primary-color)] w-1/2 gap-2 rounded-md cursor-pointer flex items-center py-2 justify-center"
          >
            <span className="font-semibold text-xs">Refuser</span>
            {/* <IoMdArrowDropright size={25} color="var(--white)" /> */}
          </button>
          <button
            onClick={() => {
              accept(demande.id);
            }}
            className="bg-[var(--primary-color)] w-1/2 gap-2 rounded-md cursor-pointer flex items-center py-2 justify-center"
          >
            <span className="text-[var(--white)] font-semibold text-xs">
              Accepter
            </span>
            {/* <IoMdArrowDropright size={25} color="var(--white)" /> */}
          </button>
        </div>
      </div>
    </div>
  );
}

export function CardAccueilService({ imgService, service }) {
  return (
    <div className=" flex flex-col gap-4 bg-[var(--gray)] rounded-md overflow-hidden  ">
      <div className="relative w-full h-40 rounded-full">
        <Image src={imgService} alt="" fill objectFit="cover" className="" />
      </div>
      <div className=" w-full flex ic justify-between px-4 pb-4">
        <div className=" flex items-center justify-center gap-2">
          {/* <div className="relative w-10 h-10 rounded-full overflow-hidden">
            <Image
              src={imgOrganisme}
              alt=""
              fill
              objectFit="cover"
              className=""
            />
          </div> */}
          <div className="flex flex-col">
            <p className="font-semibold text-lg">{service}</p>
            {/* <p className={"font-light text-sm"}>{organisme}</p> */}
          </div>
        </div>
        <button className="  flex items-center gap-4  text-[var(--primary-color)] ">
          <p>Consulter</p>
          <BsArrowRight />
        </button>
      </div>
    </div>
  );
}
export function CardAccueilDemande({
  imgOrganisme,
  imgService,
  service,
  organisme,
}) {
  return (
    <div className=" flex flex-col gap-4 bg-[var(--gray)] rounded-md overflow-hidden  ">
      <div className="relative w-full h-[18rem] rounded-full">
        <Image src={imgService} alt="" fill objectFit="cover" className="" />
      </div>
      <div className=" w-full flex ic justify-between px-4 pb-4">
        <div className=" flex items-center justify-center gap-2">
          <div className="relative w-10 h-10 rounded-full overflow-hidden">
            <Image
              src={imgOrganisme}
              alt=""
              fill
              objectFit="cover"
              className=""
            />
          </div>
          <div className=" flex flex-col leading-[1rem] ">
            <p className=" text-[var(--primary-color)] text-xl ">{service}</p>
            <p>{organisme}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
