import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  html {
    font-size: 13px;
    overflow-y: scroll;
    scroll-behavior: smooth;
  }
  body {
    background: white;
    font-family: ${({ theme }) => theme.font.main};
    margin: 0;
    padding: 1em;
    color: ${({ theme }) => theme.colors.body};
  }
  ::selection {
  background: chartreuse;
  }
  p {
    line-height: 1.5;
  }
  h1, h2, h3, h4, h5 {
    margin: 0;
  }
  h1 {
    font-family: ${({ theme }) => theme.font.serif};
    font-size: ${({ theme }) => theme.fontSize.xxl};
    color: ${({ theme }) => theme.colors.body};
    font-weight: 400;
  }
  h2 {
    margin: 0;
  }
  li {
    line-height: 1.4;
  }
  button {
    font-family: ${({ theme }) => theme.font.main};
    font-size: 13px;
  }
  small {
    font-size: 0.8rem;
  }
  img {
    max-width: 100%;
  }
  a {
    text-decoration: none;
    color: black;
  }

  *::-webkit-scrollbar-thumb {
    background-color: rgb(184, 184, 184);
  }
  *::-webkit-scrollbar {
    width: 0.5rem;
  }
  *::-webkit-scrollbar-track {
    background: lightgray;
  }
  
`;

export default GlobalStyles;
