import Image from "next/image";
import Link from "next/link";
import { BiArrowToTop, BiCopyright, BiSolidArrowToTop } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";

import { RiArrowUpDoubleLine } from "react-icons/ri";

export default function Footer() {
  return (
    <>
      <div className=" w-full mt-32 h-max flex flex-col justify-end bg-[var(--dark)]     ">
        <div className=" w-full py-10 px-[6rem] flex gap-16 bg-[var(--bg-dark)] ">
          <div className=" flex flex-col gap-8 w-1/3">
            <div className=" flex items-center gap-4">
              <div className="relative h-8 w-8">
                <Image
                  src={"/images/logo.png"}
                  fill
                  alt=""
                  objectFit={"contain"}
                />
              </div>
              <h1 className="font-bold text-xl">
                <span className={"text-xl text-[var(--secondary-color)]"}>
                  Citizen
                </span>
                <span className={"text-xl text-[var(--primary-color)]"}>
                  Connect
                </span>
              </h1>
            </div>
            <p className=" text-[rgb(255,255,255,0.5)] ">
              Merci d'avoir visiter le plateforme ,On vous offre toujours la
              meillieur possibilité pour faciliter à utiliser les services
              publics gouvernementaux
            </p>
          </div>
          <div className=" flex flex-col gap-8 w-1/3">
            <p className=" text-white text-2xl">Contacts</p>

            <Link
              href={{
                pathname: "/auth",
                query: {
                  path: "login",
                },
              }}
              className=" flex items-center gap-4 text-white hover:text-[var(--primary-color)] "
            >
              <p> Se connecter</p>
              <BsArrowRight />
            </Link>
            <Link
              href={{
                pathname: "/auth",
                query: {
                  path: "register",
                },
              }}
              className=" flex items-center gap-4 text-white hover:text-[var(--primary-color)] "
            >
              <p> S'inscrire</p>
              <BsArrowRight />
            </Link>
          </div>
          <div className=" flex flex-col gap-8 w-1/3">
            <div className=" w-full flex items-center gap-4">
              <div className="relative w-[5rem] h-[5rem]  rounded-full overflow-hidden">
                <Image
                  src={"/images/eniLogo.jpg"}
                  alt=""
                  fill
                  objectFit="cover"
                />
              </div>
              <div className=" w-2/3 flex flex-col h-full justify-around">
                <p className=" text-[rgb(255,255,255,0.25)] ">Juin 15 ,2024</p>
                <p className=" text-[var(--white)] max-w-full ">
                  DevHunt 2024 à l'ecole nationale de l'informatique
                </p>
              </div>
            </div>
            <div className=" flex bg-[var(--bg-dark)] rounded-md overflow-hidden ">
              <input
                type="email"
                className=" outline-none py-3 px-8 text-white rounded-md bg-[rgb(0,0,0,0.25)] border border-[var(--primary-color)] "
                placeholder="Adresse Email"
              />
              <button className=" uppercase  text-white h-full bg-[var(--primary-color)] px-6  ">
                Soumettre
              </button>
            </div>
          </div>
        </div>
        <div className=" relative w-full py-1 px-[6rem] flex items-center justify-between bg-[rgb(3,3,3)] text-sm ">
          <div className=" flex items-center gap-6">
            <div className=" flex items-center gap-2">
              Copyright
              <BiCopyright className=" text-[rgb(255,255,255,0.35)] " />
              <span className=" text-[var(--white)] ">DevHunt 2024</span>
            </div>
            <div className=" flex items-center gap-2">
              <p className=" text-[rgb(255,255,255,0.35)] ">Design by </p>
              <p className=" text-white">Flavien Rak</p>
            </div>
            <div className=" flex items-center gap-2">
              <p className=" text-[rgb(255,255,255,0.35)] ">Develop by</p>
              <p className=" text-white">Ti-code</p>
            </div>
          </div>
          <p className=" bgTitre1 text-4xl px-12">Ti-code</p>
          <div className=" absolute right-[5rem] top-[-1.25rem] w-[3rem] h-[2.5rem]  bg-[var(--yellow)]  ">
            <div className=" absolute top-[-1rem] left-0 w-[3rem] h-[3rem] rotate-45 bg-[var(--yellow)] rounded-sm  -skew-x-6 "></div>
            <RiArrowUpDoubleLine
              size={"1.5rem"}
              className=" absolute top-1 left-3"
            />
          </div>
        </div>
      </div>
    </>
  );
}
