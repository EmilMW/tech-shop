import React, { useState } from "react";
import { dbAuthProvider } from "./dbAuthProvider";

const AuthContext = React.createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const signIn = async (userData) => {
    const user = await dbAuthProvider.signIn(userData);
    if (user.userId) {
      setUser(user);
      return user.userId;
    } else {
      throw new Error(user.message);
    }
  };

  const refreshUser = (userData) => {
    setUser(userData);
  };

  const signOut = async () => {
    await dbAuthProvider.signOut();
    setUser(null);
  };

  const value = { user, refreshUser, signIn, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return React.useContext(AuthContext);
}
