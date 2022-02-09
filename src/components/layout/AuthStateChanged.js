import { useEffect, useState } from "react";
import { auth } from "../../utils/firebase";
import useAuth from "../../hooks/auth";
import { onAuthStateChanged } from "firebase/auth";
import Loading from "../ui/Loading";

export default function AuthStateChanged({ children }) {
  const { setUser } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (userCred) => {
      setUser(userCred);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <></>;
  }

  return children;
}
