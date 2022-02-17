import styled from "styled-components";

import { Button } from "../styles/Button.styled";

export const StyledPopup = styled.div`
  position: absolute;
  width: calc(100% - 2.5rem);
  height: calc(100% - 2.5rem);
  bottom: 0;
  right: 0;
  background: #f7f7f7;
  margin: 0 0 0 -1px;
  border: 1px solid #bbbbbb;
  border-left: none;
  border-top: none;
  border-radius: 0 0 15px 0;
  z-index: 2;
  transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);

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

  //////

  // enter from
  &.fadeSlideUp-enter {
    opacity: 0;
    transform: translateY(40%);
  }

  // enter to
  &.fadeSlideUp-enter-active {
    opacity: 1;
    transform: translateY(0);
  }

  // exit from
  &.fadeSlideUp-exit {
    opacity: 1;
    transform: translateY(0);
  }

  // exit to
  &.fadeSlideUp-exit-active {
    opacity: 0;
    transform: translateY(40%);
  }
`;

export const StyledAllNotes = styled(StyledPopup)`
  z-index: 1;

  & > div {
    overflow: auto;
    padding: 0 1.5rem 5rem 1.5rem;
    width: 100%;
    height: 100%;
  }
`;

export const StyledNote = styled.div`
  max-width: 37.5rem;
  margin: 3rem auto 0 auto;
  /* animation: fadein 0.5s;

  @keyframes fadein {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  } */

  & > div:first-child {
    display: flex;
    justify-content: space-between;
    align-items: end;
    margin-bottom: 1rem;
  }
  & > div:nth-child(2) {
    background: white;
    padding: 1rem 2rem;
  }
`;

export const StyledNoteForm = styled.div`
  max-width: 37.5rem;
  margin: 3rem auto 0 auto;
  padding: 1rem;
  display: flex;
  height: 70%;
  min-height: 35rem;
`;

export const EditorWrapper = styled.div`
  width: 30rem;
  padding: 1rem;
  background: white;
  position: relative;

  & > div:first-child {
    height: 3rem;
    border-bottom: 1px dashed lightgray;
  }
  & > div > h2 {
    font-weight: 400;
  }

  & > div:nth-child(2) {
    /* padding: 0 1rem; */
    margin-top: 1rem;
    height: calc(100% - 3rem);
    overflow-y: auto;
  }

  & > img {
    bottom: 1rem;
    position: absolute;
    width: 25%;
  }
`;

export const EditorButtons = styled.div`
  padding: 1rem 0.25rem;
  min-width: 3rem;
  z-index: 4;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  border-radius: 15px 0 0 15px;
  height: 100%;
  background: ${({ theme }) => theme.colors.body};

  & > div {
    display: flex;
    flex-direction: row;
    justify-content: center;
    position: relative;
  }

  & > div > button {
    width: 100%;
  }
`;

export const EditorBtn = styled(Button)`
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0.5rem;
  margin-right: ${({ horizontal }) => horizontal && "0.5rem"};
  padding: 0.25rem 0.5rem;
  background: ${({ active }) => active && "white"};
  background: ${({ light, theme }) => (light ? theme.colors.body : "")};
  background: ${({ light, active }) => (light && active ? "red" : "")};

  & > span {
    writing-mode: vertical-rl;
    transform: rotate(180deg);
    text-orientation: mixed;
    color: ${({ active, theme }) => (active ? theme.colors.body : "white")};
    color: ${({ light, active }) => (light && active ? "white" : "")};
  }

  &:active {
    color: ${({ theme }) => theme.colors.body};
    background: white;
  }
`;

export const NoteFormRight = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 1rem;

  & * {
    transition: 0.5s;
  }

  & > button:first-child {
    margin-bottom: 1rem;
  }

  & button:active * {
    transition: 0.1s;
    transform: scale(0.5);
  }
`;
