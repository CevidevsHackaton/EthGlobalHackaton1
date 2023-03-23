import { Router } from "next/router";
import React, { ReactNode, useEffect } from "react";
import { useAccount } from "wagmi";
import { appRoutes } from "@/constants";

//check if you are on the client (browser) or server
const isBrowser = () => typeof window !== "undefined";

type TProtectedRoute = {
  router: Router
  children: ReactNode
}

const ProtectedRoute = ({ router, children }: TProtectedRoute) => {
  //Identify authenticated user
  const { isConnected } = useAccount()

  let unprotectedRoutes = [
    appRoutes.LOGIN_PAGE,
    appRoutes.RAFFLES_PAGE,
  ];

  /**
   * @var pathIsProtected Checks if path exists in the unprotectedRoutes routes array
   */
  let pathIsProtected = unprotectedRoutes.indexOf(router.pathname) === -1;
  console.log({ pathIsProtected })
  useEffect(() => {
    if (isBrowser() && !isConnected && pathIsProtected) {
      router.push(appRoutes.LOGIN_PAGE);
    }
  }, [isConnected, pathIsProtected, router])


  return (
    <>
      {children}
    </>
  );
};

export default ProtectedRoute;