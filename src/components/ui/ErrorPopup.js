import { useRef } from "react";
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";

import useAuth from "../../hooks/auth";

const ErrorPopup = () => {
  const nodeRef = useRef(null);
  const { error, setError } = useAuth();

  return (
    <>
      <CSSTransition
        in={!!error}
        timeout={500}
        classNames="fadeSlideDown"
        unmountOnExit
        nodeRef={nodeRef}
      >
        <StyledAuthContainer ref={nodeRef} onClick={() => setError("")}>
          <span>{error}</span>
        </StyledAuthContainer>
      </CSSTransition>
    </>
  );
};

export default ErrorPopup;

const StyledAuthContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 2.5rem;
  background: white;
  border-bottom: 1px solid gray;
  display: flex;
  transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
  cursor: pointer;

  // enter from
  &.fadeSlideDown-enter {
    opacity: 0;
    transform: translateY(-40%);
  }
  // enter to
  &.fadeSlideDown-enter-active {
    opacity: 1;
    transform: translateY(0);
  }
  // exit from
  &.fadeSlideDown-exit {
    opacity: 1;
    transform: translateY(0);
  }
  // exit to
  &.fadeSlideDown-exit-active {
    opacity: 0;
    transform: translateY(-40%);
  }

  & span {
    margin: auto;
    color: ${({ theme }) => theme.colors.body};
    font-size: 1rem;
  }
`;
