"use client";
import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import organisme from "../../public/images/organisme.jpg";
import { MiniCard } from "./UtilsLanding";

export default function ThreeCard() {
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
    hidden: { opacity: 0, x: 70 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  const variantsChild = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="w-full h-screen flex items-center justify-center flex-col gap-8 bg-[var(--bg)] ">
      <h1 className="font-extrabold text-6xl text-cont text-center">
        Se connecter en tant que :
      </h1>
      <div className="flex items-center justify-center gap-8 w-full flex-wrap">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={variants}
          className="flex items-center justify-center gap-8 w-full flex-wrap"
        >
          <MiniCard
            titre="Admin"
            work="Les utilisateurs consultent des services et iles peuvent payer directement le cout du service à partirdu plateforme "
            person="(Gestion des utilisateurs)"
            color="pink"
            source={"/images/admin.jpg"}
            description={
              "L'administrateur s'occupe dans la gestion des utilisateurs et assure le fonctionnement du plateforme"
            }
            variants={variantsChild}
          />
          <MiniCard
            titre="Organisme"
            work="L'administrateur s'occupe dans la gestion des utilisateurs et assure le fonctionnement du plateforme"
            person="(Création des services)"
            color="blue"
            source={organisme}
            description={
              "L'organisme crée des services dans le plateforme qu'on peut utiliser par les utilisateurs pour simplifier son fonctionnement"
            }
            variants={variantsChild}
          />
          <MiniCard
            titre="Citoyen"
            work="L'organisme crée des services dans le plateforme qu'on peut utiliser par les utilisateurs pour simplifier son fonctionnement "
            person="(Consulter les services)"
            color="orange"
            source={"/images/user1.jpg"}
            description={
              "Les utilisateurs consultent des services et ils peuvent payer directement le coût du service à partir du plateforme"
            }
            variants={variantsChild}
          />
        </motion.div>
      </div>
    </div>
  );
}
