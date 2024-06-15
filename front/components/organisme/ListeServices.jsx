"use client";

import ConfirmationPopup from "../payement/PayementPopup";

import { useContext } from "react";
import { UidContext } from "@/context/UidContext";
import { Liste } from "../home/Utils";
import { useSelector } from "react-redux";
import { isEmpty } from "@/lib/functions";

export default function ListeServices({
  actualService,
  setActualService,
  setUseService,
  pay,
  setPay,
}) {
  const { path, currentQuery } = useContext(UidContext);
  const { services } = useSelector((state) => state.services);
  const { user } = useSelector((state) => state.user);
  const { users } = useSelector((state) => state.users);

  return (
    <div className={"w-full flex flex-col gap-8"}>
      <h1 className={"text-4xl font-bold"}>Listes des services disponibles:</h1>
      <div className={"grid grid-cols-2 gap-4"}>
        {!isEmpty(services) &&
          services?.map((item) => (
            <Liste
              key={item.id}
              service={item}
              path={path}
              setPay={setPay}
              currentQuery={currentQuery}
              setUseService={setUseService}
              setActualService={setActualService}
            />
          ))}
      </div>
      {pay && (
        <ConfirmationPopup
          service={actualService}
          destinataire={users.find((us) => us.id === actualService.userId)}
          user={user}
          setPay={setPay}
        />
      )}
    </div>
  );
}
