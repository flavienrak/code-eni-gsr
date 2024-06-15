"use client";

import { UidContext } from "@/context/UidContext";
import { payementController } from "@/lib/controllers/serviceController";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useContext } from "react";
import { useRouter } from "next/navigation";

export default function ConfirmationPopup({ service, destinataire, setPay }) {
  const { toastStyle } = useContext(UidContext);
  const { user } = useSelector((state) => state.user);
  const { push } = useRouter();

  const handlePay = async () => {
    const res = await payementController({
      debitPhone: user.telephone,
      creditPhone: destinataire?.telephone,
      amount: service.tarif,
    });
    toast.success("Payement effectue", toastStyle);
    toast.success(`Reference: ${res.reference}`, toastStyle);
    push("/home?path=payements");
  };

  return (
    <>
      <div className=" fixed top-0 left-0 w-full h-full flex items-center justify-center bg-[rgb(0,0,0,0.5)] ">
        <div className=" p-4 bg-[var(--white)] flex flex-col gap-4 rounded-md px-8 min-w-[34rem] ">
          <p className=" text-xl uppercase text-center">{service.name}</p>
          <div className=" w-full h-[2px] bg-[var(--gray)] "></div>
          <div className=" flex flex-col gap-2">
            <p className=" text-xl">Confirmer le payement</p>
            <div className=" flex flex-col gap-1">
              <p>Via le numéro</p>
              <div className=" flex flex-col px-4">
                <p>{user.telephone}</p>
              </div>
            </div>
            <div className=" flex flex-col gap-1">
              <p>Destinataire</p>
              <div className=" flex flex-col px-4">
                <p>{destinataire?.telephone}</p>
              </div>
            </div>
          </div>
          <div className=" w-full h-[2px] bg-[var(--gray)] "></div>

          <div className=" w-full flex items-center gap-4">
            <button
              onClick={() => {
                setPay(false);
              }}
              className=" w-1/2 py-2 border text-[var(--primary-color)] border-[var(--primary-color)] rounded-md "
            >
              Anuller
            </button>
            <button
              onClick={handlePay}
              className=" w-1/2 py-2 text-[var(--white)] rounded-md text-[#227f03] bg-[#ffde00]"
            >
              Mvola
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
