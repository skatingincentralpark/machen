import styled from "styled-components";

import { StyledButton } from "../styles/Button.styled";

export const StyledAuthContainer = styled.div`
  margin: 15rem auto 0 auto;
  height: auto;
  max-width: 25rem;
  text-align: center;

  & input[type="password"],
  & input[type="email"],
  & input[type="text"] {
    border-radius: 6px;
    border: 1px solid lightgray;
    margin-bottom: 1rem;
    padding: 0.5rem;
    width: 100%;
  }

  hr {
    margin: 1.5rem 0;
    border: none;
    border-top: 1px solid lightgray;
  }

  & * {
    animation: fadein 0.5s;
  }

  @keyframes fadein {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

export const AuthButton = styled(StyledButton)`
  border-radius: 6px;
  padding: 0.5rem 2.5rem;
  background: ${({ theme, light }) => (light ? "white" : theme.colors.body)};
  color: ${({ theme, light }) => (light ? theme.colors.body : "white")};
  border: ${({ theme, light }) => light && `1px solid ${theme.colors.body}`};

  &:active {
    border: 1px solid white;
  }
`;

export const StyledLink = styled.span`
  color: blue;
  cursor: pointer;
  transition: 0.5s;
  border-radius: 3px;

  &:active {
    background: blue;
    transition: 0.1s;
  }
`;
