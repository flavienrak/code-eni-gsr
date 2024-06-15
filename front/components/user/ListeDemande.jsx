"use client";

import {
  acceptDemandeController,
  getAllDemandeController,
  rejectDemandeController,
} from "@/lib/controllers/serviceController";
import { Liste, ListeDemandeComponent } from "../home/Utils";
import { useEffect, useContext, useState } from "react";
import { UidContext } from "@/context/UidContext";
import { isEmpty } from "@/lib/functions";
import toast from "react-hot-toast";

export default function ListeDemande() {
  const { userId, currentQuery, path, toastStyle } = useContext(UidContext);
  const [demandes, setDemandes] = useState([]);
  const [actualDemande, setActualDemande] = useState({});

  useEffect(() => {
    (async () => {
      const res = await getAllDemandeController(userId);
      if (res?.demandes) {
        setDemandes(res.demandes);
      }
    })();
  }, []);

  const handleAccept = async (demandeId) => {
    const res = await acceptDemandeController({ userId, demandeId });
    if (res?.demande) {
      toast.success("Demande accepte", toastStyle);
    }
  };

  const handleReject = async (demandeId) => {
    const res = await rejectDemandeController({ userId, demandeId });
    if (res?.demande) {
      toast.success("Demande refuse", toastStyle);
    }
  };

  return (
    <div className={"flex flex-col gap-4"}>
      <h1 className={"font-bold text-2xl"}>Listes des demandes :</h1>
      <div className=" flex bg-[var(--white)] flex-col gap-4">
        {!isEmpty(demandes) && (
          <div className=" w-full  grid grid-cols-2 gap-4">
            {demandes.map((item) => {
              return (
                <ListeDemandeComponent
                  key={item.id}
                  path={path}
                  demande={item}
                  currentQuery={currentQuery}
                  accept={(id) => handleAccept(id)}
                  reject={(id) => handleReject(id)}
                  setActualDemande={setActualDemande}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
