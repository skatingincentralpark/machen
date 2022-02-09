import { useRef } from "react";

import useAuth from "../../hooks/auth";

import { AuthButton } from "./AuthStyled";

const Register = () => {
  const email = useRef();
  const name = useRef();
  const password = useRef();
  const passwordConfirm = useRef();
  const { signUp } = useAuth();

  const submitHandler = async (e) => {
    e.preventDefault();
    await signUp({
      email: email.current.value,
      password: password.current.value,
      passwordConfirm: passwordConfirm.current.value,
      name: name.current.value,
    });
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input ref={name} placeholder="Name" type="text" />
        <input ref={email} placeholder="Email Address" type="email" />
        <input ref={password} placeholder="Password" type="password" />
        <input
          ref={passwordConfirm}
          placeholder="Confirm Password"
          type="password"
        />
        <AuthButton light="true" type="submit">
          Sign Up
        </AuthButton>
      </form>
    </div>
  );
};

export default Register;
