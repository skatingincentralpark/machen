import styled from "styled-components";

import { Button, StyledButton } from "../styles/Button.styled";

export const ShowNavButton = styled(Button)`
  position: fixed;
  padding: 0.65rem;
  margin: 0.35rem;
  top: 0;
  right: 0;
  z-index: 8;

  &:active * {
    transform: scale(0.5);
  }
`;

export const StyledLogo = styled.img`
  position: fixed;
  top: ${({ isLoggedOn }) => (!isLoggedOn ? "5rem" : "1rem")};
  left: ${({ isLoggedOn }) => (!isLoggedOn ? "50%" : "1rem")};
  z-index: 9;
  width: 7rem;
  min-width: 70px;
  opacity: ${({ isLoggedOn }) => (!isLoggedOn ? "0.5" : "1")};
  transition: opacity 0.5s, filter 0.25s, transform 0.5s ease-out, top 0.05s,
    left 0.5s ease-out;
  transform: ${({ isLoggedOn }) => (!isLoggedOn ? "translateX(-50%)" : "")};
  filter: ${({ open }) => (open ? "brightness(2)" : "brightness(1)")};
  animation: fadein 0.5s;

  @keyframes fadein {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  // Below desktop
  @media (max-width: 800px) {
    opacity: 0.5;
    transition: opacity 0.5s;
  }
`;

export const MobileNav = styled.nav`
  position: fixed;
  transform: ${({ open }) => (open ? "translateY(0)" : "translateY(-110%)")};
  z-index: 7;
  top: 0;
  left: 0;
  padding: 3.5rem 0 0.5rem 1rem;
  height: 25rem;
  width: 100%;
  background: ${({ open }) => (open ? "#999999" : "white")};
  opacity: ${({ open }) => (open ? "1" : "0")};
  transition: all 0.25s cubic-bezier(0.25, 1, 0.5, 1);

  & button,
  & span {
    color: white;
    font-size: 1rem;
  }

  & button {
    text-decoration: underline;
    text-decoration-style: dotted;
    text-underline-offset: 2px;
  }

  & span {
    width: 15rem;
    line-height: 1.5;
    margin-bottom: 1rem;
  }

  & > div,
  & > div > div {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    height: 100%;
  }
`;

export const Circle = styled.div`
  height: 1.5rem;
  width: 1.5rem;
  background: ${({ open }) => (open ? "white" : "black")};
  border-radius: 50%;
  transition: 0.5s;

  &:active {
    background: white;
  }
`;

export const NavButton = styled(StyledButton)`
  margin-right: 0.35rem;
  margin-bottom: 0.5rem;
`;
