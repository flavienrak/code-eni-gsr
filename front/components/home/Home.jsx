"use client";

import Topbar from "./Topbar";
import Navbar from "./Navbar";
import CreateService from "../organisme/CreateService";
import ListeServices from "../organisme/ListeServices";
import Acceuil from "./Acceuil";
import DemandeDesc from "../user/DemandeDesc";

import { useContext, useState } from "react";
import { UidContext } from "@/context/UidContext";
import { motion } from "framer-motion";
import { signOut } from "next-auth/react";
import { useDispatch } from "react-redux";
import { updatePersistInfos } from "@/redux/slices/persistSlice";
import { isEmpty } from "@/lib/functions";
import ListeDemande from "../user/ListeDemande";

export default function Home() {
  const { currentQuery, path, verifyToken, loginOut, isLoginOut, showLogout } =
    useContext(UidContext);
  const dispatch = useDispatch();
  const [actualService, setActualService] = useState({});
  const [useServie, setUseService] = useState(false);
  const [pay, setPay] = useState(false);

  const handleLogout = async () => {
    loginOut(true);
    await signOut();
    dispatch(updatePersistInfos({ authToken: null }));
    window.location = "/";
  };

  if (!verifyToken)
    return (
      <div className="flex w-full justify-center bg-[var(--color-light)] flex-col min-h-screen">
        <div className="flex bg-[var(--white)] w-full justify-center">
          <div className="w-4/5">
            <Topbar />
          </div>
        </div>
        <div className="w-full flex justify-center py-4 flex-1">
          <div className={"w-4/5 flex justify-center gap-4"}>
            {/* max-h-[calc(100vh-6rem)] */}
            <div className="  flex w-[18vw]">
              <Navbar setUseService={setUseService} />
            </div>
            <div className={"flex-1 bg-[var(--white)] w-full p-10 rounded-xl"}>
              {currentQuery.path === "accueil" && (
                <>
                  <Acceuil />
                </>
              )}
              {currentQuery.path === "nouveau" && (
                <>
                  <CreateService />
                </>
              )}
              {currentQuery.path === "services" &&
                isEmpty(currentQuery?.view) && (
                  <>
                    <ListeServices
                      // setUseService={setUseService}
                      pay={pay}
                      setPay={setPay}
                      actualService={actualService}
                      setActualService={setActualService}
                    />
                  </>
                )}
              {currentQuery.path === "demandes" &&
                isEmpty(currentQuery?.view) && (
                  <>
                    <ListeDemande
                    // setUseService={setUseService}
                    />
                  </>
                )}
              {/* {currentQuery.path === "demandes" &&
                !isEmpty(currentQuery?.view) && (
                  <>
                    <ListeDemande
                    // setUseService={setUseService}
                    />
                  </>
                )} */}
              {/* {currentQuery.path === "demandes" &&
                !isEmpty(currentQuery?.view) && (
                  <>
                    <ListeServices
                      // setUseService={setUseService}
                      setActualService={setActualService}
                    />
                  </>
                )} */}
              {currentQuery.path === "services" &&
                !isEmpty(actualService) &&
                !isEmpty(currentQuery?.view) && (
                  <>
                    <div className="h-full flex flex-col gap-6 px-2 bg-[var(--white)] rounded-3xl ">
                      <p className=" bgText text-4xl font-bold">
                        {actualService.name}
                      </p>
                      <div className=" w-full flex flex-col gap-4">
                        <div className=" w-full flex flex-col gap-2 bg-[var(--color-light)] p-4 rounded-md">
                          <p className="text-xl font-bold">Description</p>
                          <p className={"font-light text-sm pl-1 w-3/5"}>
                            {actualService.description}
                          </p>
                        </div>
                        <div className="flex flex-col gap-2 bg-[var(--color-light)] p-4 rounded-md">
                          <p className="text-xl font-bold">Tarif</p>
                          <ul className={"list-disc pl-5"}>
                            <li>
                              <p className="font-semibold">
                                {actualService.tarif} Ar
                              </p>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <h1 className={"font-bold text-xl"}>
                        Informations a remplir
                      </h1>
                      <DemandeDesc service={actualService} />
                    </div>
                  </>
                )}
              {/* {currentQuery.path === "services" &&
                !isEmpty(currentQuery?.view) && (
                  <>
                    <ViewService
                      service={actualService}
                      useServie={useServie}
                      setUseService={setUseService}
                    />
                  </>
                )} */}
            </div>
            {/* <div className="flex w-[20vw]"></div> */}
            {/* condition => true ? <Acceuil /> : <Profil /> */}

            {/* {currentQuery?.path === "profil" && isEmpty(currentQuery?.edit) ? (
              <Profil />
            ) : currentQuery?.edit === "profil" ? (
              <EditProfil />
            ) : (
              <Accueil />
            )} */}

            {showLogout && (
              <div className="fixed bgFixed top-0 left-0 w-full h-full flex justify-center items-center">
                <motion.div
                  initial={{ y: -15 }}
                  animate={{ y: 0 }}
                  className="bg-[var(--bg-1)] border border-[var(--bg)] p-5 rounded-lg flex flex-col gap-5 w-72 justify-center text-center transition-all duration-100 ease-linear"
                >
                  <h1 className={"text-[var(--cont)] px-2"}>
                    Voulez-vous vraiement vous deconnecter ?
                  </h1>
                  <div className="flex gap-5">
                    <button
                      onClick={() => loginOut(false)}
                      className="w-1/2 text-[var(--red)] border border-[var(--red)] rounded-lg text-sm inline-flex items-center py-2.5 justify-center overflow-hidden"
                    >
                      Annuler
                    </button>
                    <button
                      disabled={isLoginOut}
                      onClick={handleLogout}
                      className={`w-1/2 text-[var(--white)] bg-[var(--primary-color)] rounded-lg text-sm inline-flex items-center py-2.5 justify-center overflow-hidden ${
                        isLoginOut ? "opacity-50 cursor-default" : "opacity-100"
                      }`}
                    >
                      {isLoginOut ? `Deconn...` : `Confirmer`}
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
}
