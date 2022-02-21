import { useState } from "react";
import { useRouter } from "next/router";

import {
  ShowNavButton,
  StyledLogo,
  MobileNav,
  Circle,
  NavButton,
} from "./Header.styled";

import useAuth from "../../hooks/auth";

const Header = () => {
  const [showNav, setShowNav] = useState(false);
  const { user, logout, isLanding } = useAuth();
  const router = useRouter();

  const showNavHandler = () => {
    setShowNav((prev) => !prev);
  };

  const hideNavHandler = () => {
    setShowNav(false);
  };

  return (
    <>
      {router.pathname !== "/" && (
        <StyledLogo
          open={showNav}
          src="/svg/logoSmall.svg"
          alt=""
          isLoggedOn={user}
          showNav={showNav}
          onClick={() => {
            router.push("/");
          }}
        />
      )}

      {user && (
        <>
          <ShowNavButton open={showNav} onClick={showNavHandler}>
            <Circle open={showNav} />
          </ShowNavButton>

          <MobileNav open={showNav}>
            <div>
              <span>
                Machen helps you <b>track your monthly habits</b>, and{" "}
                <b>record your thoughts</b> through an unobtrusive interface.
              </span>
              <div>
                {/* <NavButton
                  highlight="white"
                  onClick={hideNavHandler}
                  color="white"
                >
                  Delete Account
                </NavButton> */}
                <NavButton
                  highlight="white"
                  onClick={() => {
                    hideNavHandler();
                    logout();
                  }}
                  color="white"
                >
                  Sign Out
                </NavButton>
              </div>
            </div>
          </MobileNav>
        </>
      )}
    </>
  );
};

export default Header;
