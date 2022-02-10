import { forwardRef } from "react";

import styled from "styled-components";

import { Button } from "../styles/Button.styled";

const Dropdown = forwardRef((props, ref) => (
  <StyledDropdown ref={ref}>{props.children}</StyledDropdown>
));

export default Dropdown;

const StyledDropdown = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  position: absolute;
  left: 3.5rem;
  bottom: -0.65rem;

  transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);

  // enter from
  &.fadeSlideDown-enter {
    opacity: 0;
    transform: translateX(-20%);
  }

  // enter to
  &.fadeSlideDown-enter-active {
    opacity: 1;
    transform: translateX(0);
  }

  // exit from
  &.fadeSlideDown-exit {
    opacity: 1;
    transform: translateX(0);
  }

  // exit to
  &.fadeSlideDown-exit-active {
    opacity: 0;
    transform: translateX(-20%);
  }
`;
