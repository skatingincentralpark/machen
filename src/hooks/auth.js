import { createContext, useContext, useState } from "react";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import { auth, db } from "../utils/firebase";

// For autocomplete
const AuthContext = createContext({
  user: null,
  error: "",
  loading: false,
  login: () => {},
  signUp: () => {},
  logout: () => {},
});

export default function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider(props) {
  // @@ state
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // @@ login
  const login = async (email, password) => {
    setLoading(true);
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      setUser(user ?? null);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  // @@ signUp
  const signUp = async ({ email, password, passwordConfirm, name }) => {
    setLoading(true);

    if (password !== passwordConfirm) {
      setError("Passwords do not match");
      return;
    }

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Add user to firestore
      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
      });

      setUser(user ?? null);
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  // @@ logout
  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const value = {
    user,
    loading,
    error,
    setError,
    login,
    signUp,
    logout,
    setUser,
  };

  return <AuthContext.Provider value={value} {...props} />;
}
