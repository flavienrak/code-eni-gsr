"use client";

import Link from "next/link";
import toast from "react-hot-toast";

import { isEmpty } from "@/lib/functions";
import { InputText } from "../utils/InputType";
import { useContext } from "react";
import { UidContext } from "@/context/UidContext";
import { sendDemandeController } from "@/lib/controllers/serviceController";
import { useRouter } from "next/navigation";

export default function DemandeDesc({ service }) {
  const { path, currentQuery, toastStyle, userId } = useContext(UidContext);
  const { push } = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Effectuation de la demande", toastStyle);
    const res = await sendDemandeController({ userId, serviceId: service.id });
    toast.dismiss(toastId);

    if (res?.demande) {
      toast.success("Demande effectue", toastStyle);
      toast.success("En attente de la reponse", toastStyle);
      push("/home?path=services");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex bg-[var(--white)] flex-col gap-4 justify-between flex-1"
      >
        <div className="flex gap-5 w-full flex-col">
          {!isEmpty(service.infos) && (
            <div className=" w-full flex gap-4">
              {service.infos?.map((item) => (
                <div key={item.value} className=" w-1/2 flex  flex-col">
                  <div>
                    <InputText label={item.value} placeholder={item.value} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex justify-end pl-4 gap-4">
          <Link
            href={{
              pathname: path,
              query: {
                path: "services",
              },
            }}
            className="py-2 w-44 flex justify-center items-center text-[var(--primary-color)] border border-[var(--primary-color)] rounded-md"
          >
            Annuler
          </Link>
          <button
            type="submit"
            className="py-2 w-44  flex justify-center items-center text-[var(--white)] bg-[var(--primary-color)] rounded-md "
          >
            Utiliser
          </button>{" "}
        </div>
        {/* <FileInputComponent />
        <HistoDemande
          nom="Randriantsoa"
          service="Payement des impôts"
          prenom="faliarison Rapahel"
          CIN="2975"
        /> */}
      </form>
    </>
  );
}
