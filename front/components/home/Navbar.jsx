"use client";

import Image from "next/image";
import Link from "next/link";

import { useContext, useState, useEffect } from "react";
import { CgLogOut } from "react-icons/cg";
import { VscBell } from "react-icons/vsc";
import { UidContext } from "@/context/UidContext";
import { HiOutlinePresentationChartBar, HiOutlineUser } from "react-icons/hi2";
import { IoBagAddOutline, IoSettingsOutline } from "react-icons/io5";
import { BsBookmarkStar, BsHouse } from "react-icons/bs";
import { useSelector } from "react-redux";

const serviceLinks = [
  {
    label: "Accueil",
    path: "accueil",
    icon: <BsHouse size={"1.25rem"} />,
  },
  {
    label: "Nouveau",
    path: "nouveau",
    icon: <BsBookmarkStar size={"1.25rem"} />,
  },
  {
    label: "Services",
    path: "services",
    icon: <HiOutlinePresentationChartBar size={"1.25rem"} />,
  },
  {
    label: "Demandes",
    path: "demandes",
    icon: <IoBagAddOutline size={"1.25rem"} />,
  },
  {
    label: "Notifications",
    path: "notifications",
    icon: <VscBell size={"1.25rem"} />,
  },
  {
    label: "Profil",
    path: "profil",
    icon: <HiOutlineUser size={"1.25rem"} />,
  },
  {
    label: "Parametres",
    path: "settings",
    icon: <IoSettingsOutline size={"1.25rem"} />,
  },
];

const userLinks = [
  {
    label: "Accueil",
    path: "accueil",
    icon: <BsHouse size={"1.25rem"} />,
  },
  {
    label: "Services",
    path: "services",
    icon: <HiOutlinePresentationChartBar size={"1.25rem"} />,
  },
  {
    label: "Demandes",
    path: "demandes",
    icon: <IoBagAddOutline size={"1.25rem"} />,
  },
  {
    label: "Notifications",
    path: "notifications",
    icon: <VscBell size={"1.25rem"} />,
  },
  {
    label: "Profil",
    path: "profil",
    icon: <HiOutlineUser size={"1.25rem"} />,
  },
  {
    label: "Parametres",
    path: "settings",
    icon: <IoSettingsOutline size={"1.25rem"} />,
  },
];

export default function Navbar({ setUseService }) {
  const { path, currentQuery, loginOut, role } = useContext(UidContext);
  const { user } = useSelector((state) => state.user);
  const [links, setLinks] = useState(userLinks);

  useEffect(() => {
    if (role !== "user") {
      setLinks(serviceLinks);
    } else {
      setLinks(userLinks);
    }
  }, [role]);

  return (
    <div className="  sticky top-0 left-0   w-full flex flex-col items-center gap-4 h-full">
      <div className="w-full flex items-center gap-4 p-4 bg-[var(--white)] rounded-xl">
        <Link
          href={{ pathname: path, query: { path: "profil" } }}
          onClick={() => setUseService({})}
          className="relative w-10 h-10 rounded-full cursor-pointer"
        >
          <Image
            src={role !== "service" ? "/images/gouv.jpg" : "/images/user.png"}
            alt=""
            fill
            objectFit="cover"
            className="rounded-full"
          />
        </Link>

        <div className="flex flex-col w-3/5">
          <p className={"font-bold whitespace-nowrap overflow-hidden"}>
            {user.name} {user?.username}
          </p>
          <p className="text-[var(--gray-text)] whitespace-nowrap overflow-hidden font-light text-sm">
            {user.email}
          </p>
        </div>
      </div>

      <div className="w-full bg-[var(--white)] rounded-xl">
        {links.map((item, index) => (
          <Link
            key={item.label}
            href={{
              pathname: path,
              query: {
                path: item.path,
              },
            }}
            className={`flex gap-4 items-center w-full h-10 px-5 py-8 hover:bg-[var(--color-light)] transition-all duration-100 hover:font-semibold ${
              index === 0 ? "rounded-t-xl" : ""
            }  ${
              currentQuery.path === item.path
                ? "bg-[var(--color-light)] text-[var(--primary-color)] rounded-none hover:border-[var(--primary-color)] cursor-default border-l-4 border-[var(--primary-color)]"
                : ""
            } ${index === links.length - 1 ? "rounded-b-xl" : ""}
            `}
          >
            <i>{item.icon}</i>
            <span className={""}>{item.label}</span>
          </Link>
        ))}
      </div>

      <div className="w-full min-h-12">
        <button
          onClick={() => {
            loginOut(true);
          }}
          className={`text-[var(--white)] flex items-center gap-4 h-full rounded-lg py-2 px-6 bg-[var(--primary-color)] font-semibold w-full`}
        >
          <i>
            <CgLogOut size={"1.5rem"} />
          </i>
          <span>Se deconnecter</span>
        </button>
      </div>
    </div>
  );
}
