import { useRef } from "react";

import useAuth from "../../hooks/auth";

import { AuthButton } from "./AuthStyled";

const Login = () => {
  const email = useRef();
  const password = useRef();
  const { login } = useAuth();

  const submitHandler = async (e) => {
    e.preventDefault();
    await login(email.current.value, password.current.value);
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input ref={email} placeholder="Email Address" type="email" />
        <input ref={password} placeholder="Password" type="password" />
        <AuthButton light="true" type="submit">
          Sign In
        </AuthButton>
      </form>
    </div>
  );
};

export default Login;
