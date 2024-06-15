"use client";

import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";

import { useContext, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { MdArrowRight, MdEmail } from "react-icons/md";
import { IoMdLock } from "react-icons/io";
import { UidContext } from "@/context/UidContext";
import { emailRegex } from "@/lib/regex";
import { loginController } from "@/lib/controllers/authController";
import { Button, Input } from "../utils/Utils";
import { FaArrowLeft } from "react-icons/fa6";
import { updatePersistInfos } from "@/redux/slices/persistSlice";
import { signIn } from "next-auth/react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function LogIn() {
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
    hidden: { opacity: 0, y: -70 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const { toastStyle } = useContext(UidContext);
  const dispatch = useDispatch();
  const form = useRef();

  const [email, setEmail] = useState({ valid: false, value: "" });
  const [password, setPassword] = useState({ valid: false, value: "" });
  const [userNotFound, setUserNotFound] = useState(false);
  const [incorrectPassword, setIncorrectPassword] = useState(false);
  const [googleLogin, setGoogleLogin] = useState(false);
  const [githubLogin, setGithubLogin] = useState(false);
  const [isModified, setIsModified] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (form?.current) {
      form.current.reset();
    }

    // email
    if (emailRegex.test(email.value?.trim())) {
      if (!email.valid) {
        setEmail((prev) => ({ ...prev, valid: true }));
      }
      if (isModified) {
        setIsModified(false);
      }
      if (userNotFound) {
        setUserNotFound(false);
      }
    } else {
      if (email.valid) {
        setEmail((prev) => ({ ...prev, valid: false }));
      }
      if (isModified) {
        setIsModified(false);
      }
      if (userNotFound) {
        setUserNotFound(false);
      }
    }

    // password
    if (password.value?.length > 5) {
      if (!password.valid) {
        setPassword((prev) => ({ ...prev, valid: true }));
      }
      if (isModified) {
        setIsModified(false);
      }
      if (incorrectPassword) {
        setIncorrectPassword(false);
      }
    } else {
      if (password.valid) {
        setPassword((prev) => ({ ...prev, valid: false }));
      }
      if (isModified) {
        setIsModified(false);
      }
      if (incorrectPassword) {
        setIncorrectPassword(false);
      }
    }
  }, [email.value, password.value]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);
    setIsModified(true);

    if (email.valid && password.valid) {
      setIsLoading(true);
      const toastId = toast.loading("Connexion", toastStyle);
      const res = await loginController({
        email: email.value,
        password: password.value,
      });
      toast.dismiss(toastId);
      setIsLoading(false);

      if (res?.userNotFound) {
        setUserNotFound(true);
        toast.error("Utilisateur non trouve", toastStyle);
      } else if (res?.incorrectPassword) {
        setIncorrectPassword(true);
        toast.error("Mot de passe incorrect", toastStyle);
      } else if (res?.authToken) {
        dispatch(updatePersistInfos({ authToken: res.authToken }));
        window.location = "/home?path=accueil";
      }
    }
  };

  return (
    <div className="relative flex justify-between items-center h-full w-full z-10 p-10">
      <div className="flex flex-col gap-10 h-full justify-center w-1/2 pr-8">
        <Link href={"/"} className="absolute top-8 left-10">
          <i className="text-[var(--primary-color)]">
            <FaArrowLeft size={"2rem"} />
          </i>
        </Link>
        <motion.h1
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={variants}
          className="text-[var(--cont)] font-extrabold text-8xl"
        >
          <span className="text-8xl bgText">Se connecter </span> à votre{" "}
          <span className="text-8xl bgText">compte.</span>
        </motion.h1>
        <p className="text-[var(--cont)] w-2/3 font-light">
          En vous connectant, vous aurez la possibilité d{"'"}exploiter toutes
          les fonctionnalités disponibles sur notre plateforme.
        </p>
        <div className="px-1 flex items-center gap-1 border-t border-[var(--bg-4)] py-10">
          <p className="text-[var(--cont)]">
            Vous n{"'"}êtes pas encore enregistré ?
          </p>
          <Link
            href={{
              pathname: "/auth",
              query: {
                path: "register",
              },
            }}
            className="flex justify-center items-center"
          >
            <span className="hover:underline text-[var(--primary-color)] transition-all duration-100">
              S{"'"}inscrire
            </span>
          </Link>
        </div>
      </div>
      <div className="flex justify-center items-center h-full w-1/2 flex-col gap-8">
        <form
          ref={form}
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 w-96 "
        >
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-4">
              <Input
                id={"email"}
                type={"text"}
                label={"Email"}
                placeholder={" "}
                icon={<MdEmail size={"1.15rem"} />}
                value={email.value}
                error={userNotFound && isModified}
                onChange={(e) =>
                  setEmail((prev) => ({ ...prev, value: e.target.value }))
                }
              />

              <Input
                id={"password"}
                type={"password"}
                label={"Mot de passe"}
                placeholder={" "}
                icon={<IoMdLock size={"1.15rem"} />}
                value={password.value}
                error={incorrectPassword && isModified}
                onChange={(e) =>
                  setPassword((prev) => ({ ...prev, value: e.target.value }))
                }
              />
            </div>
            <Button
              label={"Connexion"}
              type={"submit"}
              loading={isLoading}
              valid={email.valid && password.valid}
              icon={<MdArrowRight size={"1.5rem"} />}
            />
          </div>
        </form>
        <div className="relative flex justify-center items-center gap-1 opacity-80">
          <span className="h-1 rounded-full w-4 bg-[var(--dark)]"> </span>
          <span className="h-1 rounded-full w-1 bg-[var(--dark)]"> </span>
        </div>
        {/* <p className="relative flex justify-center items-center w-96">
          <span className="text-xs z-20 bg-[var(--primary-color)] h-8 w-8 rounded-full text-[var(--bg)] border border-[var(--bg)] flex justify-center items-center">
            Ou
          </span>
          <span className="absolute w-full h-[0.5px] bg-[var(--bg)] z-10"></span>
        </p> */}
        <div className="flex flex-col gap-4 w-96">
          <button
            disabled={googleLogin}
            onClick={async () => {
              setGoogleLogin(true);
              await signIn("google");
            }}
            className={`bg-[var(--primary-color)] border border-[var(--dark)] rounded-sm h-12 w-full flex justify-center items-center group ${
              googleLogin ? "opacity-50" : "opacity-100"
            }`}
          >
            <i className="relative h-8 w-14 py-2">
              <Image
                src={"/images/google.png"}
                fill
                alt=""
                objectFit="contain"
              />
            </i>
            <span className="text-[var(--dark)]">
              {googleLogin ? `Connexion...` : `Se connecter avec Google`}
            </span>
          </button>
          {/* <button
            disabled={githubLogin}
            onClick={async () => {
              setGithubLogin(true);
              await signIn("github");
            }}
            className={`bg-[var(--primary-color)] border border-[var(--dark)] rounded-sm h-12 w-full flex justify-center items-center group ${
              githubLogin ? "opacity-50" : "opacity-100"
            }`}
          >
            <i className="relative h-6 w-12 py-2">
              <Image
                src={"/images/github.png"}
                fill
                alt=""
                objectFit="contain"
              />
            </i>
            <span className="text-[var(--dark)]">
              {githubLogin ? `Connexion...` : `Se connecter avec Github`}
            </span>
          </button> */}
        </div>
      </div>
    </div>
  );
}
