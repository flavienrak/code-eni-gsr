"use client";

import qs from "query-string";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, createContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "@/lib/functions";
import {
  verifyTokenController,
  verifyUserController,
} from "@/lib/controllers/authController";
import { getUserController } from "@/lib/controllers/userController";
import { fetchUserInfos } from "@/redux/slices/userSlice";
import { notLoginPaths, protectedPaths } from "@/lib/paths";
import { updatePersistInfos } from "@/redux/slices/persistSlice";
import { fetchServicesInfos } from "@/redux/slices/servicesSlice";
import { getAllServicesController } from "@/lib/controllers/serviceController";

export const UidContext = createContext();

export default function UidContextProvider({ children, socialInfos }) {
  const { authToken } = useSelector((state) => state.persistInfos);
  const { push } = useRouter();
  const path = usePathname();
  const params = useSearchParams();
  const dispatch = useDispatch();

  const [role, setRole] = useState("user");
  const [widthProgressBar, setWidthProgressBar] = useState(0);
  const [userId, setUserId] = useState(null);
  const [isLoadingJWT, setIsLoadingJWT] = useState(null);
  const [verifyToken, setVerifyToken] = useState(true);
  const [currentQuery, setCurrentQuery] = useState({});
  const [showLogout, setShowLogout] = useState(false);

  // update current query
  useEffect(() => {
    const newParams = qs.parse(params?.toString());
    setCurrentQuery(newParams);
    setVerifyToken(false);
  }, [params]);

  useEffect(() => {
    if (!isEmpty(socialInfos)) {
      (async () => {
        const res = await verifyUserController(socialInfos.email);
        if (res?.authToken) {
          dispatch(updatePersistInfos({ authToken: res.authToken }));
        } else if (res?.userNotFound) {
          toast.error("Adresse email non enregistre", toastStyle);
          if (protectedPaths.includes(path)) {
            push("/auth?path=login");
          }
        }
      })();
    }
  }, [socialInfos]);

  useEffect(() => {
    if (!isEmpty(authToken)) {
      setVerifyToken(false);
      if (notLoginPaths.includes(path)) {
        push("/home");
      } else {
        (async () => {
          setVerifyToken(true);
          const res = await verifyTokenController(authToken);
          setVerifyToken(false);

          if (res?.infos) {
            setUserId(res.infos.id);
            setRole(res.infos.role);
          } else if (res?.userNotFound) {
            toast.error("Utilisateur non trouvé", toastStyle);
            if (protectedPaths.includes(path)) {
              push("/auth?path=login");
            }
          }
        })();
      }
    } else if (protectedPaths.includes(path)) {
      setVerifyToken(false);
      push("/auth?path=login");
    }
  }, [authToken]);

  useEffect(() => {
    if (!isEmpty(userId)) {
      setVerifyToken(false);
      (async () => {
        const res = await getUserController(userId);
        if (res?.user) {
          dispatch(fetchUserInfos({ user: res.user }));
        }
      })();
      if (role === "user") {
        (async () => {
          const res = await getAllServicesController(userId);
          if (res?.services) {
            dispatch(fetchServicesInfos({ services: res.services }));
          }
        })();
      } else {
        (async () => {
          const res = await getAllServicesController(userId);
          if (res?.services) {
            dispatch(fetchServicesInfos({ services: res.services }));
          }
        })();
      }
    }
  }, [userId]);

  const removeQueries = (values) => {
    return Object.keys(currentQuery).reduce((nouvelObjet, cle) => {
      if (!values.includes(cle)) {
        nouvelObjet[cle] = currentQuery[cle];
      }
      return nouvelObjet;
    }, {});
  };

  const setLoadingBar = (value) => {
    if (!isNaN(value)) {
      const numericValue = Number(value);
      if (Number.isInteger(numericValue)) {
        setWidthProgressBar(numericValue);
      }
    }
  };

  const loginOut = (value) => {
    setShowLogout(value);
  };

  const toastStyle = {
    style: {
      border: "1px solid var(--primary-color)",
      padding: "16px",
      color: "var(--bg)",
      background: "var(--bg-gradient)",
    },
    iconTheme: {
      primary: "var(--bg)",
      secondary: "var(--cont)",
    },
  };

  if (typeof window !== "undefined")
    return (
      <UidContext.Provider
        value={{
          path,
          userId,
          showLogout,
          isLoadingJWT,
          currentQuery,
          widthProgressBar,
          toastStyle,
          verifyToken,
          socialInfos,
          role,
          loginOut,
          removeQueries,
          setLoadingBar,
        }}
      >
        {children}
        <Toaster />
      </UidContext.Provider>
    );
}
