"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { MdArrowRight } from "react-icons/md";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import organisme from "../../public/images/organisme.jpg";

export default function Header() {
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
    hidden: { opacity: 0, x: -70 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };
  const variantschilds = {
    hidden: { opacity: 0, x: 70 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };
  const variantschilds2 = {
    hidden: { opacity: 0, x: 70 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  return (
    <>
      <div className=" relative w-full h-screen flex justify-center bg-[var(--bg)] text-[var(--white)] overflow-hidden p-10">
        <div className="h-full flex flex-col items-center justify-center gap-10 z-20 w-5/6">
          <div className="w-full flex items-center flex-col justify-center gap-10">
            <motion.h1
              ref={ref}
              initial="hidden"
              animate={controls}
              variants={variantschilds}
              className={`font-extrabold text-8xl bgText text-center`}
            >
              Decouvrir <br />
              <span className="text-8xl text-[var(--cont)]">
                {" "}
                les services en ligne disponibles sur <br />
                <span className=" bgText text-8xl">notre plateforme.</span>
              </span>{" "}
            </motion.h1>

            <motion.div
              ref={ref}
              initial="hidden"
              animate={controls}
              variants={variants}
              className=" flex items-center justify-center gap-6"
            >
              <button className="bgGradient border border-[var(--primary-color)] rounded-full px-8 h-12 flex justify-center items-center text-[var(--bg)]">
                <span>Commencer</span>
                <i>
                  <MdArrowRight size={"1.5rem"} />
                </i>
              </button>
            </motion.div>
          </div>
        </div>
        {/* <div className=" absolute top-0 left-0 w-full h-full z-10">
          <div className=" absolute top-[5rem] left-[20rem] ">
            <div
              className={` ${style.light} absolute top-0 left-0 w-[5rem] h-9 rounded-full bg-white   `}
            ></div>
            <div className={` ${style.rayon} absolute  overflow-hidden  `}>
              <div className={` ${style.shadowRayon} absolute   `}></div>
            </div>
          </div>
          <div className=" absolute top-[5rem] right-[20rem] ">
            <div
              className={` ${style.light2} absolute top-0 left-0 w-[5rem] h-9 rounded-full bg-white   `}
            ></div>
            <div className={` ${style.rayon2} absolute overflow-hidden   `}>
              <div className={` ${style.shadowRayon2} absolute   `}></div>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
}
