import Image from "next/image";
import { useRouter } from "next/router";
import styled from "styled-components";

import { Tween, Timeline, ScrollTrigger } from "react-gsap";

import TextEditor from "../notes/TextEditor";
import { Button } from "../styles/Button.styled";

import screenshot from "../../../public/images/screenshot.png";

const Landing = () => {
  const router = useRouter();

  return (
    <>
      <LandingHeader>
        <StyledButton
          onClick={() => {
            router.push("/auth");
          }}
        >
          Enter
        </StyledButton>
      </LandingHeader>

      <StyledLanding>
        <LandingSection pt="10rem" px="1rem" fadeIn overflowHidden>
          <Flex>
            <FlexLeft>
              <StyledLogo src="/svg/machenLogoAltBlack.svg" alt="" />
              <h2>
                Record daily thoughts and track your habits through a simple UI.
              </h2>
              <h3>
                Found an interesting quote? Learnt something new? Write a
                reflection to look back to in the future.
              </h3>
              <div>
                <StyledButton
                  onClick={() => {
                    router.push("/auth");
                  }}
                >
                  Enter
                </StyledButton>
              </div>
            </FlexLeft>
            <ImageWrap1>
              <Image
                src={screenshot}
                alt="Screenshot of Machen UI"
                placeholder="blur"
              />
            </ImageWrap1>
          </Flex>
        </LandingSection>

        <LandingSection pt="5rem" center height="250vh">
          <ScrollTrigger start="top center" end="bottom" scrub={0.5}>
            <StickyContainer>
              <Tween
                from={{
                  top: "10%",
                  opacity: "0",
                  transform: "scale(1.2)",
                }}
                to={{ top: "25%", opacity: "1", transform: "scale(1)" }}
              >
                <ScalingText>
                  <h2>
                    Rich Text Formatting
                    <br />
                    <b>Bold</b>, <i>Italic</i>,{" "}
                    <span style={{ color: "red" }}>Colors</span> &amp; More
                  </h2>
                  <h3>
                    <span>
                      Draft.js implementation to deliver customisable text.
                      Write how you like with lists and highlighting to improve
                      readability.
                    </span>
                  </h3>
                </ScalingText>
              </Tween>

              <Tween
                from={{
                  background: `linear-gradient(18deg, rgba(255, 255, 255, 0) 85%, rgba(255, 255, 255, 1) 105%`,
                }}
                to={{
                  background: `linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 0%`,
                }}
              >
                <GradientOverlay />
              </Tween>

              <Tween
                from={{ x: "0%", top: "5rem" }}
                to={{ x: "0", top: "0rem" }}
              >
                <FullVwContainer overflowXHidden>
                  <ImageWrap2>
                    <Image
                      src={screenshot}
                      alt="Screenshot of Machen UI"
                      priority
                      placeholder="blur"
                    />
                  </ImageWrap2>
                </FullVwContainer>
              </Tween>
            </StickyContainer>
          </ScrollTrigger>
        </LandingSection>

        <LandingSection
          ogFont
          flexColumn
          pt="5rem"
          height="100vh"
          overflowHidden
        >
          <ScrollTrigger start="top center" end="center" scrub={0.5}>
            <Tween
              from={{ opacity: "0", x: "10%" }}
              to={{ opacity: "1", x: "0%" }}
            >
              <TryText>Give it a try</TryText>
              <LandingEditorWrapper
                style={{
                  height: "30rem",
                  boxShadow: "rgb(0 0 0 / 35%) 1px 7px 40px",
                }}
              >
                <TextEditor isLanding={true} initialFocus={false} />
              </LandingEditorWrapper>
            </Tween>
          </ScrollTrigger>
        </LandingSection>
      </StyledLanding>
    </>
  );
};

export default Landing;

export const StyledLanding = styled.div`
  max-width: 100vw;
  height: 100%;
`;

export const LandingHeader = styled.div`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: flex-end;
  padding: 1rem;
  z-index: 7;
`;

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 1rem;
`;

const FlexLeft = styled.div`
  width: 30rem;
  z-index: 1;
  transition: transform 0.5s, width 0.5s;

  & > div {
    margin-top: 2rem;
  }

  @media (max-width: 1000px) {
    width: 25rem;
  }
`;

const StyledLogo = styled.img`
  max-width: 7rem;
  margin-bottom: 1rem;
`;

const StyledButton = styled(Button)`
  display: inline;
  color: black;
  border: 1px solid black;
  padding: 0.75rem 3rem;
  font-family: helvetica;
  font-size: 1.2rem;
  margin-right: 1rem;
  background: white;

  &:active {
    background: black;
    color: white;
  }
`;

const LandingSection = styled.div`
  height: ${({ height }) => (height ? height : "80vh")};
  position: relative;
  width: 100%;
  padding-left: ${({ px }) => px};
  padding-right: ${({ px }) => px};
  padding-top: ${({ pt }) => pt};
  display: flex;
  flex-direction: ${({ flexColumn }) => flexColumn && `column`};
  align-items: flex-start;
  justify-content: ${({ center }) => center && `center`};
  background: ${({ bg }) => bg && bg};
  overflow: ${({ overflowHidden }) => overflowHidden && "hidden"};

  font-family: ${({ ogFont }) => !ogFont && "baskerville"};
  color: ${({ ogFont }) => !ogFont && "black"};

  & h2 {
    font-weight: ${({ ogFont }) => !ogFont && "500"};
    font-size: ${({ ogFont }) => !ogFont && "3rem"};
    line-height: ${({ ogFont }) => !ogFont && "1.3em"};
  }

  & h3 {
    font-weight: ${({ ogFont }) => !ogFont && "300"};
    font-size: ${({ ogFont }) => !ogFont && "2rem"};
    margin-top: ${({ ogFont }) => !ogFont && "1.6rem"};
    line-height: ${({ ogFont }) => !ogFont && "1.3em"};
  }

  animation: ${({ fadeIn }) => fadeIn && "fadein 1s"};

  @keyframes fadein {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const ImageWrap = styled.span`
  width: 70rem;
  transform: translateX(-2rem);
  position: absolute;
  z-index: 0;
  right: 0;
  margin-left: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: transform 0.5s, width 0.5s;
`;

const ImageWrap1 = styled(ImageWrap)`
  @media (max-width: 1200px) {
    transform: translateX(35%);
  }
  @media (max-width: 1000px) {
    transform: translateX(55%);
    margin-top: -2rem;
  }
  @media (max-width: 600px) {
    transform: translateX(75%);
  }
  @media (max-width: 420px) {
    transform: translateX(85%);
  }
`;

const ImageWrap2 = styled(ImageWrap)`
  top: 5rem;
  margin: 0;
  left: 0;
  padding: 0 5rem 0 5rem;
  transition: transform 0s, width 0s;
  width: 100rem;

  & img {
    object-fit: contain;
  }
`;

const StickyContainer = styled.div`
  height: ${({ height }) => (height ? height : "100vh")};
  width: 100vw;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: sticky;
`;

const FullVwContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow-x: ${({ overflowXHidden }) => overflowXHidden && "hidden"};
`;

const GradientOverlay = styled.div`
  top: 5rem;
  position: absolute;
  width: 100%;
  height: 100vh;
  z-index: 3;
  background: rgb(255, 255, 255);
`;

const ScalingText = styled.div`
  position: absolute;
  text-align: center;
  width: 80%;
  max-width: 32.5rem;
  padding: 1rem;
  opacity: 1;
  z-index: 4;

  & * {
    animation: ${({ position }) => (position >= 34 ? `colors 1s` : ``)};
  }

  @keyframes colors {
    0% {
      color: chartreuse;
    }
    50% {
      color: black;
    }
    75% {
      color: chartreuse;
    }
    100% {
      color: black;
    }
  }

  background-image: linear-gradient(
    -225deg,
    #231557 0%,
    #44107a 29%,
    #ff1361 57%,
    violet 65%,
    #231557 100%
  );
  background-size: auto auto;
  background-clip: border-box;
  background-size: 200% auto;
  color: #fff;
  background-clip: text;
  text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: textclip 3s linear infinite;
  display: inline-block;
  font-size: 190px;

  @keyframes textclip {
    to {
      background-position: 200% center;
    }
  }
`;

const TryText = styled.h2`
  font-family: baskerville;
  text-decoration: underline 1px;
  text-underline-offset: 0.65rem;
  color: ${({ theme }) => theme.colors.body};
  font-weight: 500;
  font-size: 3rem;
  line-height: 1.3em;
  text-align: center;
  width: 100%;
`;

export const LandingEditorWrapper = styled.div`
  max-width: 37.5rem;
  margin: 3rem auto 0 auto;
  display: flex;
  height: 70%;
  min-height: 35rem;
  border-radius: 25px;
`;
