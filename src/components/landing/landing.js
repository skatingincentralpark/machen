import { useState } from "react";
import Image from "next/image";
import styled from "styled-components";

import screenshot from "../../../public/images/screenshot.png";

const Landing = () => {
  return (
    <StyledLanding>
      <div>
        <div>
          <h2>
            Record daily thoughts and track your habits through a simple UI.
          </h2>
          <h3>
            Found an interesting quote? Learnt something new? Write a reflection
            to look back to in the future.
          </h3>
        </div>
        <ImageWrap>
          <Image
            src={screenshot}
            alt="Screenshot of Machen UI"
            // width={500} automatically provided
            // height={500} automatically provided
            // blurDataURL="data:..." automatically provided
            // placeholder="blur" // Optional blur-up while loading
          />
        </ImageWrap>
      </div>
    </StyledLanding>
  );
};

export default Landing;

export const StyledLanding = styled.div`
  padding-top: 10rem;

  & > div:first-child {
    display: flex;
    flex-direction: row;
    padding: 0 4rem;
    flex-wrap: wrap;
  }

  & h2 {
    font-weight: 500;
    font-size: 2.5rem;
  }

  & h3 {
    font-weight: 300;
    font-size: 2rem;
  }
`;

const ImageWrap = styled.span`
  margin-left: 3rem;
  box-sizing: content-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid black;

  & > div {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border-radius: 5px;
  }
`;
