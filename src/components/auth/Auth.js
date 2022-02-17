import { useState } from "react";
import { withPublic } from "../../hooks/route";

import Register from "./Register";
import Login from "./Login";
import { StyledAuthContainer, AuthButton } from "./AuthStyled";

const Auth = () => {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <StyledAuthContainer>
      {isRegister ? <Register /> : <Login />}
      <hr />
      <AuthButton
        light="true"
        onClick={() => {
          setIsRegister((prev) => !prev);
        }}
      >
        {isRegister
          ? "Have an account?  Sign In"
          : "Don't have an account?  Register"}
      </AuthButton>
    </StyledAuthContainer>
  );
};

export default withPublic(Auth);
