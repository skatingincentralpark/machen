import styled from "styled-components";

export const Button = styled.button`
  display: block;
  background: none;
  border: none;
  border-radius: ${({ noBorderRadius }) => (noBorderRadius ? "0" : "6px")};

  transition: 0.5s;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.body};

  &:active {
    transition: 0.1s;
    background: ${({ theme }) => theme.colors.body};
  }

  &:active * {
    transition: 0.1s;
  }
`;

export const StyledTempButton = styled.button`
  position: fixed;
  bottom: 1em;
  left: 1em;
`;

export const StyledTempButtonTopRight = styled.button`
  position: fixed;
  top: 1em;
  right: 1em;
`;

export const StyledButton = styled.button`
  border-radius: 6px;
  border: none;
  padding: 0.5em 1em;
  background: ${({ theme }) => theme.colors.body};
  color: white;
  cursor: pointer;
  transition: 0.5s;

  &:hover {
    transition: 0.1s;
    background: gray;
    color: white;
  }

  &:active {
    background: ${({ theme, highlight }) =>
      highlight ? highlight : theme.colors.highlight};
  }

  &:active * {
    transition: 0.1s;
    transform: scale(0.5);
  }
`;

export const StyledCloseButton = styled(Button)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  height: 2.5rem;
  width: 2.5rem;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;

  & img {
    padding: 0.25rem;
  }
`;

export const NoteFormButton = styled.button`
  height: 2rem;
  width: 2rem;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
`;

export const LeftBarButton = styled(Button)`
  background: ${({ isSelected }) => isSelected && "lightgray"};
`;
