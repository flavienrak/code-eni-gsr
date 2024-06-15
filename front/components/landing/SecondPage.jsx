"use client";
import Image from "next/image";
import React from "react";
import { IoMdStarOutline } from "react-icons/io";
import { PiMetaLogo } from "react-icons/pi";
import boy from "../../public/images/boy.png";
import { IoPersonOutline } from "react-icons/io5";
import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function SecondPage() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.2 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);
  const variants = {
    hidden: { opacity: 0, y: 70 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={variants}
        className=" w-full h-[100vh] flex px-16 items-center justify-center bg-[var(--white)] "
      >
        <div className=" flex flex-col gap-8 w-1/2">
          <h1 className=" font-extrabold text-6xl text-[var(--cont)]   ">
            C'est quoi{" "}
            <h1 className="font-bold text-6xl">
              <span className={"text-6xl text-[var(--secondary-color)]"}>
                Citizen
              </span>
              <span className={"text-6xl text-[var(--primary-color)]"}>
                Connect
              </span>
              ?
            </h1>
          </h1>
          <p className=" max-w-full">
            C'est un plateforme intutive et sécurisé qui vous permet de gérer
            vos besoins administratifs en quelques clics , ou que vous soyez
            Restez informé grace aux notifications personalisées et profitez
            d'une experience utilisateur fluide et efficace . Simplifiez notre
            vie avec{"  "}
            <span className="font-bold ">
              <span className={" text-[var(--secondary-color)]"}>Citizen</span>
              <span className={" text-[var(--primary-color)]"}>Connect</span>
            </span>
            {"  "}
            et faites vos émarches administratives en jeu d'enfant
          </p>

          <div className=" flex items-center gap-8">
            <div className=" flex items-center gap-2">
              <div className=" flex items-center justify-center w-12 h-12 rounded-full bg-[rgb(255,173,0)] ">
                <IoPersonOutline size={"1.5rem"} className=" text-white" />
              </div>
              <div className=" flex flex-col">
                <p className=" text-xl ">4.6</p>
                <p className=" text-slate-400">Utilisateur simple</p>
              </div>
            </div>
            <div className=" flex items-center gap-2">
              <div className=" flex items-center justify-center w-12 h-12 rounded-full bg-[rgb(64,191,246)]  ">
                <IoMdStarOutline size={"1.5rem"} className=" text-white" />
              </div>
              <div className=" flex flex-col">
                <p className=" text-xl ">8.8M+</p>
                <p className=" text-slate-400 ">Organisme</p>
              </div>
            </div>
            <div className=" flex items-center gap-2">
              <div className=" flex items-center justify-center w-12 h-12 rounded-full bg-[rgb(255,120,143)] ">
                <IoMdStarOutline size={"1.5rem"} className=" text-white" />
              </div>
              <div className=" flex flex-col">
                <p className=" text-xl ">4.6</p>
                <p className=" text-slate-400 ">Ministere</p>
              </div>
            </div>
          </div>
          <div className=" flex flex-col gap-2">
            <div className=" w-[15rem] bg-slate-200 h-1 rounded-lg relative">
              <div className=" absolute w-1/2 top-0 left-0 h-full bg-slate-400 rounded-lg "></div>
            </div>
            <div className="flex gap-2 items-center">
              <p>Devhunt</p>
              <span className=" h-6 w-[1px] rounded-lg bg-slate-400 "></span>
              <div className=" flex items-center gap-1">
                <PiMetaLogo size={"1.35rem"} />
                <p className=" text-slate-400">Meta</p>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <div className=" relative">
            <Image src={boy} alt="boy" width={540} />
          </div>
        </div>
      </motion.div>
    </>
  );
}
