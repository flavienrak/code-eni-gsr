import { IoIosCloseCircleOutline } from "react-icons/io";

export default function EditProfil() {
  return (
    <>
      <div className=" fixed top-0 left-0 w-full h-full flex items-center justify-center bg-[var(--gray-text)] ">
        <div className=" flex flex-col items-center gap-6 bg-[var(--white)] rounded-xl px-8 py-8 relative">
          <div className=" absolute top-[-2rem] right-[-2rem] cursor-pointer ">
            <IoIosCloseCircleOutline
              className=" text-white hover:text-[var(--red-theme)] "
              size={"2rem"}
            />
          </div>

          <p className=" text-center  font-bold  text-3xl text-[var(--blue-theme)] uppercase ">
            editer vos informations
          </p>
          <span className=" w-full h-[1px] bg-slate-300 mb-6"></span>

          <div className=" w-full flex flex-col gap-8">
            <div className=" w-full flex  items-center gap-4">
              <div className="  w-1/2 relative">
                <input
                  type="text"
                  value={"RAFANOMEZANTSOA"}
                  className=" bg-[var(--gray)] rounded-md px-4 py-3 outline-none   w-full"
                />
                <div className=" absolute top-[-1rem] left-4 bg-[var(--gray)] rounded-md px-2  py-[1px] text-[var(--gray-text)] ">
                  Noms
                </div>
              </div>
              <div className=" relative w-1/2">
                <input
                  type="text"
                  value={"Lionel Socrate"}
                  className=" bg-[var(--gray)] rounded-md px-4 py-3 outline-none  w-full "
                />
                <div className=" absolute top-[-1rem] left-4 bg-[var(--gray)] rounded-md px-2  py-[1px] text-[var(--gray-text)] ">
                  Prenoms
                </div>
              </div>
            </div>

            <div className=" w-full grid  grid-cols-3  items-center gap-4">
              <div className=" w-full relative">
                <input
                  type="text"
                  value={"2995"}
                  className=" bg-[var(--gray)] rounded-md px-4 py-3 outline-none  "
                />
                <div className=" absolute top-[-1rem] left-4 bg-[var(--gray)] rounded-md px-2  py-[1px] text-[var(--gray-text)] ">
                  M° Matricule
                </div>
              </div>
              <div className=" w-full relative">
                <input
                  type="text"
                  value={"L2"}
                  className=" bg-[var(--gray)] rounded-md px-4 py-3 outline-none   "
                />
                <div className=" absolute top-[-1rem] left-4 bg-[var(--gray)] rounded-md px-2  py-[1px] text-[var(--gray-text)] ">
                  Niveau
                </div>
              </div>
              <div className=" w-full relative">
                <input
                  type="text"
                  value={"GB"}
                  className=" bg-[var(--gray)] rounded-md px-4 py-3 outline-none  "
                />
                <div className=" absolute top-[-1rem] left-4 bg-[var(--gray)] rounded-md px-2  py-[1px] text-[var(--gray-text)] ">
                  Parcour
                </div>
              </div>
            </div>
            <div className=" w-full grid  grid-cols-3  items-center gap-4">
              <div className=" w-full relative">
                <input
                  type="text"
                  value={"13 Aout 2004"}
                  className=" bg-[var(--gray)] rounded-md px-4 py-3 outline-none   "
                />
                <div className=" absolute top-[-1rem] left-4 bg-[var(--gray)] rounded-md px-2  py-[1px] text-[var(--gray-text)] ">
                  N° CIN
                </div>
              </div>
              <div className=" w-full relative">
                <input
                  type="text"
                  value={"201 041 254 621"}
                  className=" bg-[var(--gray)] rounded-md px-4 py-3 outline-none  "
                />
                <div className=" absolute top-[-1rem] left-4 bg-[var(--gray)] rounded-md px-2  py-[1px] text-[var(--gray-text)] ">
                  Date de naissance
                </div>
              </div>

              <div className=" w-full relative">
                <input
                  type="text"
                  value={"lionelsocrate7@gmail.com"}
                  className=" bg-[var(--gray)] rounded-md px-4 py-3 outline-none  "
                />
                <div className=" absolute top-[-1rem] left-4 bg-[var(--gray)] rounded-md px-2  py-[1px] text-[var(--gray-text)] ">
                  Email
                </div>
              </div>
            </div>
          </div>
          <span className=" w-full h-[1px] bg-slate-300 my-2"></span>
          <div className=" w-full flex items-center gap-4">
            <button className=" w-1/2 text-white rounded-lg bg-[var(--blue-theme)] py-2 px-[5rem] ">
              Annuler
            </button>
            <button className=" w-1/2 text-white rounded-lg bg-[var(--primary-color)] py-2 px-[5rem] ">
              Mettre à jour
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
