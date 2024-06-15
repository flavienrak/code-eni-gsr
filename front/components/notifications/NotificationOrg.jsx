"use client";

import { Notification } from "../home/Utils";

export default function NotificationOrg() {
  return (
    <>
      <div className=" w-full h-full flex bg-[var(--white)] py-2 px-4 rounded-md  flex-col gap-4 overflow-y-scroll">
        <p className=" text-4xl font-bold">Notifications</p>
        <div className=" w-full flex flex-col gap-4">
          <Notification
            ImageSrc={"/images/github.png"}
            nom={"SOLOFONOTOAVINDRAINY Hery Nasandratra"}
            service={"demande d'acte de naissance"}
            duree={"il y a 2 heures"}
          />
          <Notification
            ImageSrc={"/images/github.png"}
            nom={"SOLOFONOTOAVINDRAINY Hery Nasandratra"}
            service={"demande d'acte de naissance"}
            duree={"il y a 2 heures"}
          />
          <Notification
            ImageSrc={"/images/github.png"}
            nom={"SOLOFONOTOAVINDRAINY Hery Nasandratra"}
            service={"demande d'acte de naissance"}
            duree={"il y a 2 heures"}
          />
          <Notification
            ImageSrc={"/images/github.png"}
            nom={"SOLOFONOTOAVINDRAINY Hery Nasandratra"}
            service={"demande d'acte de naissance"}
            duree={"il y a 2 heures"}
          />
        </div>
      </div>
    </>
  );
}
