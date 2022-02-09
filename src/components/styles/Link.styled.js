import styled from "styled-components";

export const StyledLink = styled.a`
  display: block;
  transition: 0.4s;
  padding: 0.65rem;
  margin: 0.35rem;
  background: none;
  border: none;
  border-radius: 6px;

  &:active {
    transition: 0s;
    transform: scale(0.95);
    color: ${({ color }) => (color ? color : "chartreuse")};
    background: ${({ color }) => (color ? color : "chartreuse")};
  }
`;

export const StyledLinkNoPadding = styled.a`
  transition: 0.4s;
  display: block;
  padding: 0rem;
  margin: 0rem;
  background: none;
  border: none;
  border-radius: 6px;
  cursor: alias;
  display: inline;
  text-decoration: underline;

  &:active {
    transition: 0s;
    transform: scale(0.95);
    color: ${({ color }) => (color ? color : "chartreuse")};
    background: ${({ color }) => (color ? color : "chartreuse")};
  }
`;

// Props => accepts "color" for active color and background
export const StyledNavLink = styled.div`
  & a {
    transition: 0.4s;
    display: block;
    padding: 0.65rem;
    margin: 0.35rem;
    background: none;
    border: none;
    border-radius: 6px;
    cursor: alias;

    &:active {
      transition: 0s;
      transform: scale(0.95);
      color: ${({ color }) => (color ? color : "chartreuse")};
      background: ${({ color }) => (color ? color : "chartreuse")};
    }
  }
`;

export const StyledAnchor = styled.a`
  text-decoration: underline;
  border-radius: 6px;
  cursor: alias;

  &:active {
    transition: 0s;
    transform: scale(0.95);
    color: ${({ color }) => (color ? color : "chartreuse")};
    background: ${({ color }) => (color ? color : "chartreuse")};
  }
`;
