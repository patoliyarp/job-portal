import type React from "react";
import { AuthContext } from "./AuthContext";
import { useEffect, useState } from "react";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userEmail, setUserEmail] = useState<string | null>(() =>
    localStorage.getItem("userEmail"),
  );

  const isLogin = !!userEmail;
  useEffect(() => {
    if (userEmail) {
      localStorage.setItem("userEmail", userEmail);
    } else {
      localStorage.removeItem("userEmail");
    }
  }, [userEmail]);
  return (
    <>
      <AuthContext.Provider value={{ isLogin, userEmail, setUserEmail }}>
        {children}
      </AuthContext.Provider>
    </>
  );
}
