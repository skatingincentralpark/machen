import styled from "styled-components";
import { Button } from "../styles/Button.styled";

const Alert = ({ onClick }) => {
  return (
    <>
      <StyledAlert>
        <span>
          <h2>Machen is intended for use on desktop</h2>
          <p>
            Please note that the experience on mobile and smaller viewports is
            still in development and is incomplete at this time.
          </p>
          <Button onClick={onClick}>Okay</Button>
        </span>
      </StyledAlert>
    </>
  );
};

export const StyledAlert = styled.div`
  z-index: 11;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  padding: 2rem;
  background: #f1f1f1;

  & > span {
    padding-top: 40%;
    width: 80%;
    display: flex;
    flex-direction: column;
    align-content: center;

    & > * {
      text-align: center;
    }
    & > h2 {
      font-size: 2rem;
    }
    & > p {
      font-size: 1.6rem;
    }
    & > button {
      font-size: 1.6rem !important;
      background: gray;
      padding: 0.75rem 3rem;
      color: white;
    }
  }
`;

// export const StyledBackdrop = styled.div`
//   z-index: 10;
//   position: fixed;
//   width: 100vw;
//   height: 100vh;
//   top: 0;
//   left: 0;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   padding: 1rem;
//   background: white;
//   opacity: 0.8;
// `;

export default Alert;
