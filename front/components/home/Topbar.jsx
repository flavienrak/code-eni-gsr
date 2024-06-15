"use client";

import { useContext } from "react";
import { UidContext } from "@/context/UidContext";
import Image from "next/image";
import Link from "next/link";

import { LuSearch } from "react-icons/lu";

export default function Topbar() {
  const { path } = useContext(UidContext);

  return (
    <>
      <div className="w-full flex items-center justify-between bg-[var(--white)] py-3">
        <Link
          href={{ pathname: path, query: { path: "accueil" } }}
          className=" flex items-center gap-4"
        >
          <div className="relative h-8 w-8">
            <Image src={"/images/logo.png"} fill alt="" objectFit={"contain"} />
          </div>
          <h1 className="font-bold text-xl">
            <span className={"text-xl text-[var(--secondary-color)]"}>
              Citizen
            </span>
            <span className={"text-xl text-[var(--primary-color)]"}>
              Connect
            </span>
          </h1>
        </Link>
        <div className="relative flex items-center">
          <input
            type="search"
            className="focus:outline outline-1 outline-[var(--primary-color)] py-2 px-10 bg-[var(--color-light)] placeholder:text-[var(--color-gray)] w-[30vw] rounded-full font-light"
            placeholder="Rechercher..."
          />
          <i className={"text-[var(--color-gray)] absolute left-3"}>
            <LuSearch size={"1.15rem"} />
          </i>
        </div>
        <div className="flex gap-2 items-center">
          <Link
            href={{ pathname: path, query: { path: "nouveau" } }}
            className={`text-[var(--white)] h-full py-2 px-8 bgGradient font-semibold rounded-full`}
          >
            Créer
          </Link>
          {/* <div className="relative h-8 w-8 rounded-full bg-[var(--color-light)]">
            <Image
              src={"/images/girl1.png"}
              alt=""
              fill
              objectFit="cover"
              className={"rounded-full"}
            />
          </div> */}
        </div>
      </div>
    </>
  );
}
