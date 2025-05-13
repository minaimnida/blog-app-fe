"use client";
import { fromUnixTime, isAfter } from "date-fns";
import { jwtDecode } from "jwt-decode";
import { signOut, useSession } from "next-auth/react";
import { FC, PropsWithChildren, useEffect } from "react";
const TokenProvider: FC<PropsWithChildren> = ({ children }) => {
  const session = useSession();

  useEffect(() => {
    const checkTOkenValidity = () => {
      const accessToken = session?.data?.user?.accessToken;
      if (accessToken) {
        try {
          const decodedToken = jwtDecode(accessToken);
          const tokenExpiry = fromUnixTime(decodedToken.exp!);
          if (isAfter(new Date(), tokenExpiry)) {
            signOut();
          }
        } catch (error) {
          signOut();
        }
      }
    };
    const interval = setInterval(checkTOkenValidity, 10000); // Check every 10 seconds
    return () => clearInterval(interval);
  }, []);
  return <> {children}</>;
};

export default TokenProvider;