"use client";
import React from "react";
import { BiSolidLayer } from "react-icons/bi";
import { PetitCardLanding } from "./UtilsLanding";
import { IoIosArchive } from "react-icons/io";
import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
export default function SixCard() {
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
    hidden: { opacity: 0, y: 0 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };
  const variantschilds = {
    hidden: { opacity: 0, x: -70 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };
  const variantschilds2 = {
    hidden: { opacity: 0, x: 70 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className=" w-full h-screen px-[6rem] flex items-center justify-center flex-col gap-16 bg-[var(--gray)] "
    >
      <div className=" w-full flex items-center justify-center flex-col gap-2">
        <p className=" font-extrabold text-7xl bgText">Fonctionnalités</p>
      </div>
      <div className=" grid grid-rows-2 grid-cols-3 gap-x-8 gap-y-12">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={variantschilds}
          className=" relative flex items-center justify-center flex-col gap-2 px-16 py-12 bg-white rounded-xl shadow-sm"
        >
          <p className=" text-3xl font-bold text-slate-500">
            Facile à utiliser
          </p>
          <p className=" text-[var(--gris-text)] text-center ">
            Ce plateforme est tellement convivial qu'on y navigue avec plaisir.
          </p>
          <div className=" absolute top-[-2.5rem] left-[41%] w-[5rem] h-[5rem] rounded-full bg-[rgb(64,191,246)] flex items-center justify-center shadow-2xl shadow-[rgb(64,191,246)] ">
            <IoIosArchive className=" text-white" size={"2.5rem"} />
          </div>
        </motion.div>
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={variantschilds}
          className=" relative flex items-center justify-center flex-col gap-2 px-16 py-12 bg-white rounded-xl shadow-sm"
        >
          <p className=" text-3xl font-bold text-slate-500">Sécurisé</p>
          <p className=" text-[var(--gris-text)] text-center ">
            Optez pour la sécurité et la fiabilité, faites confiance à nos
            experts.
          </p>
          <div className=" absolute top-[-2.5rem] left-[41%] w-[5rem] h-[5rem] rounded-full bg-[rgb(64,191,246)] flex items-center justify-center shadow-2xl shadow-[rgb(64,191,246)] ">
            <IoIosArchive className=" text-white" size={"2.5rem"} />
          </div>
        </motion.div>
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={variantschilds2}
          className=" relative flex items-center justify-center flex-col gap-2 px-16 py-12 bg-white rounded-xl shadow-sm"
        >
          <p className=" text-3xl font-bold text-slate-500">Payement</p>
          <p className=" text-[var(--gris-text)] text-center ">
            Vous pouvez faire votre payement à distance sans déplacement.
          </p>
          <div className=" absolute top-[-2.5rem] left-[41%] w-[5rem] h-[5rem] rounded-full bg-[rgb(138,72,253)] flex items-center justify-center shadow-2xl shadow-[rgb(138,72,253)] ">
            <IoIosArchive className=" text-white" size={"2.5rem"} />
          </div>
        </motion.div>
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={variantschilds}
          className=" relative flex items-center justify-center flex-col gap-2 px-16 py-12 bg-white rounded-xl shadow-sm"
        >
          <p className=" text-3xl font-bold text-slate-500">Flexibilité</p>
          <p className=" text-[var(--gris-text)] text-center ">
            Capable de s'adapter à une miltitude de besoins et de service{" "}
          </p>
          <div className=" absolute top-[-2.5rem] left-[41%] w-[5rem] h-[5rem] rounded-full bg-[rgb(255,120,143)] flex items-center justify-center shadow-2xl shadow-[rgb(255,120,143)] ">
            <IoIosArchive className=" text-white" size={"2.5rem"} />
          </div>
        </motion.div>
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={variantschilds2}
          className=" relative flex items-center justify-center flex-col gap-2 px-16 py-12 bg-white rounded-xl shadow-sm"
        >
          <p className=" text-3xl font-bold text-slate-500"> Efficacité </p>
          <p className=" text-[var(--gris-text)] text-center ">
            centralisation et simplification de la gestion de demande des
            services
          </p>
          <div className=" absolute top-[-2.5rem] left-[41%] w-[5rem] h-[5rem] rounded-full bg-[rgb(255,173,0)] flex items-center justify-center shadow-2xl shadow-[rgb(255,173,0)] ">
            <IoIosArchive className=" text-white" size={"2.5rem"} />
          </div>
        </motion.div>
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={variantschilds2}
          className=" relative flex items-center justify-center flex-col gap-2 px-16 py-12 bg-white rounded-xl shadow-sm"
        >
          <p className=" text-3xl font-bold text-slate-500">Innovation</p>
          <p className=" text-[var(--gris-text)] text-center ">
            Application innovante et scalable
          </p>
          <div className=" absolute top-[-2.5rem] left-[41%] w-[5rem] h-[5rem] rounded-full bg-[var(--green)] flex items-center justify-center shadow-2xl shadow-[var(--green)] ">
            <IoIosArchive className=" text-white" size={"2.5rem"} />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
