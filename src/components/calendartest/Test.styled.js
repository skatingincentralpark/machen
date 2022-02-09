//
//
// To - Do: Safari is fucked
//
//

import styled from "styled-components";

import { Button } from "../styles/Button.styled";
import { StyledPopup } from "../notes/Notes.styled";

export const Test = styled.div`
  position: relative;
  margin: auto;
  margin-top: 2rem;
  max-width: 60em;
`;

export const CalendarGrid = styled.div`
  position: relative;
  display: grid;
  margin: 3rem auto 0 auto;
  border-radius: 15px 15px 15px 15px;
  overflow: hidden;
  box-shadow: 17px 15px 20px #00000036;
  max-width: calc(10 * ${({ theme }) => theme.calendarItemSize});
  grid-template-columns:
    2.5rem minmax(2rem, calc(7 * ${({ theme }) => theme.calendarItemSize}))
    1fr;
  grid-template-areas:
    ". topbar topbar"
    "leftbar calendar rightbar";
  animation: fadein 0.5s;

  @keyframes fadein {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @media (max-width: ${({ theme }) => theme.viewport.mobile}) {
    grid-template-columns: 2.5rem 7fr 0;
    grid-template-areas:
      ". topbar topbar"
      "leftbar calendar calendar"
      "leftbar rightbar rightbar";
  }
`;

export const StyledCalendarTopBar = styled.div`
  grid-area: topbar; // Grid-Area
  display: grid;
  text-align: center;
  height: 2.5rem;
  border: 1px solid #bbbbbb;
  border-radius: 15px 15px 0 0;
  margin: 0 0 -1px -1px;
  z-index: 4;
  background: ${({ theme }) => theme.colors.body};
  grid-template-columns: repeat(7, ${({ theme }) => theme.calendarItemSize});

  @media (max-width: ${({ theme }) => theme.viewport.mobile}) {
    grid-template-columns: repeat(7, 1fr);
  }

  & span {
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: ${({ theme }) => theme.font.main};
    font-size: ${({ theme }) => theme.fontSize.base};
    padding: ${({ theme }) => theme.spacing.sm};
    color: white;
  }
`;

export const StyledCalendarLeftBar = styled.div`
  grid-area: leftbar; // Grid-Area
  height: 100%;
  border: 1px solid #bbbbbb;
  border-radius: 15px 0 0 15px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 4;

  & button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 2.5rem;
    border-bottom: 1px solid #bbbbbb;
    font-weight: 600;
  }

  & button:last-child {
    flex-grow: 1;
    border-bottom: none;
  }

  & span {
    writing-mode: vertical-rl;
    text-orientation: mixed;
  }
`;

export const StyledCalendarRightBar = styled.div`
  grid-area: rightbar; // Grid-Area
  position: relative;
  background: #f7f7f7;
  border: 1px solid #bbbbbb;
  margin: 0 0 0 -1px;
  box-sizing: initial;
  min-height: 7.5rem;
  max-height: calc(6 * ${({ theme }) => theme.calendarItemSize});
  border-radius: 0 0 15px 0;

  & div {
    overflow: auto;
    max-height: calc(100% - 3.2rem);
  }

  /* &:hover&::-webkit-scrollbar-thumb {
    background: lightgray;
  }
  &::-webkit-scrollbar {
    width: 0.75rem;
  } */

  & h2 {
    padding: ${({ theme }) => theme.spacing.base};
    font-weight: 400;
    border-bottom: 1px dashed #bbbbbb;
  }
  & p {
    padding: 0 ${({ theme }) => theme.spacing.base};
  }

  @media (max-width: ${({ theme }) => theme.viewport.mobile}) {
    max-height: calc(3 * ${({ theme }) => theme.calendarItemSize});
  }
`;

export const AllNotesButton = styled(Button)`
  width: 100%;
  font-weight: 600;
  border-top: 1px solid gray;
  position: sticky;
  border-radius: 0;
  bottom: 0;
  padding: 1rem;
  background: #f7f7f7;
`;

export const StyledCalendarItems = styled.div`
  grid-area: calendar; // Grid-Area
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  border: 1px solid #bbbbbb;
  margin-left: -1px;
  height: 100%;
  animation: fadein 0.5s;

  @keyframes fadein {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

export const StyledCalendarItem = styled.div`
  aspect-ratio: 1;
  width: 100%;
  box-sizing: content-box;
  outline: 1px solid #bbbbbb;
  background: ${({ hasNotes, theme }) =>
    hasNotes ? theme.colors.highlight : "#f7f7f7"};
  transition: background 0.5s, color 0.5s;

  background: ${({ dummy }) => dummy && "lightgray"};

  /* background: ${({ dummy }) =>
    dummy && "linear-gradient(270deg, #cc86e1, #4419ca, #a0e80e)"};
  animation: ${({ dummy }) => dummy && "gradientanimation 10s ease infinite"};
  background-size: 700% 700%;

  @keyframes gradientanimation {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  } */

  & > span {
    padding: ${({ theme }) => theme.spacing.sm};
    font-size: ${({ theme }) => theme.fontSize.base};
    display: block;
    user-select: none;
  }

  &:hover {
    transition: 0.1s;
    background: ${({ theme, dummy }) => !dummy && theme.colors.body};
    color: white;
    cursor: ${({ dummy }) => !dummy && "pointer"};
  }

  &:active {
    background: ${({ dummy }) => !dummy && "darkgray"};
    transition: 0.1s;
  }
`;

export const StyledYearSelector = styled(StyledPopup)`
  border-top: 1px solid #bbbbbb;
  height: calc(20rem - 2.5rem);

  & > div {
    padding: 1rem;
    display: flex;
    flex-direction: column;

    & > button {
      margin-bottom: 0.5rem;
      max-width: 5rem;
    }
  }
`;
