import Image from "next/image";
import Link from "next/link";

export default function TopbarLanding() {
  return (
    <>
      <div className=" fixed top-0 left-0  z-50 w-full flex  justify-center  bg-[var(--white)] shadow-lg h-16 items-center rounded-sm">
        <div className=" w-[80%] flex items-center justify-between ">
          <div className=" flex items-center gap-4">
            <div className="relative h-8 w-8">
              <Image
                src={"/images/logo.png"}
                fill
                alt=""
                objectFit={"contain"}
              />
            </div>
            <h1 className="font-bold text-xl">
              <span className={"text-xl text-[var(--secondary-color)]"}>
                Citizen
              </span>
              <span className={"text-xl text-[var(--primary-color)]"}>
                Connect
              </span>
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href={{
                pathname: "/auth",
                query: {
                  path: "login",
                },
              }}
              className=" border border-[var(--primary-color)] rounded-full  flex justify-center items-center h-10 w-[8rem] "
            >
              <span className="text-[var(--primary-color)] ] text-sm">
                Se connecter
              </span>
            </Link>
            <Link
              href={{
                pathname: "/auth",
                query: {
                  path: "register",
                },
              }}
              className="border bg-[var(--primary-color)] rounded-full text-xl  flex justify-center items-center h-10 w-[8rem] "
            >
              <span className="text-[var(--white)] text-sm">
                S{"'"}inscrire
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
