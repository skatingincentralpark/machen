import { useRef } from "react";

import useAuth from "../../hooks/auth";

import { AuthButton, StyledLink } from "./AuthStyled";

const Login = () => {
  const email = useRef();
  const password = useRef();
  const { login } = useAuth();

  const submitHandler = async (e) => {
    e.preventDefault();
    await login(email.current.value, password.current.value);
  };

  const submitTestCredentials = async (e) => {
    e.preventDefault();
    await login("bart@g.com", "123456");
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        To quickly test the app,{" "}
        <StyledLink onClick={submitTestCredentials}>click here</StyledLink>
        .
        <br />
        <br />
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
