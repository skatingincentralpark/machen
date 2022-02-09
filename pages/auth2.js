import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { auth } from "../src/utils/firebase";
import { signOut } from "firebase/auth";
import useAuth from "../src/hooks/auth";

import { withProtected } from "../src/hooks/route";

const AuthPage2 = () => {
  const { user, error } = useAuth();

  const router = useRouter();

  const logout = () => {
    signOut(auth);
    router.replace("/auth");
  };

  return (
    <>
      <div style={{ marginTop: "10rem" }}>
        <span>{error && <span>Error: {error}</span>}</span>
      </div>
      <hr />
      <div>
        {user && <p>Current User: {user.email}</p>}
        <button onClick={logout}>Log out</button>
        <br />
        <Link href="/auth">Page 1</Link>
      </div>
    </>
  );
};

export default withProtected(AuthPage2);
