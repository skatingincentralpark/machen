import styled from "styled-components";

export const StyledCalendarOuter = styled.div`
  position: relative;
  margin: auto;
  margin-top: 2rem;
  max-width: 60em;
`;

export const Flex = styled.div`
  display: flex;
`;

export const StyledCalendar = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: calc(7 * 6em);
  grid-gap: 1px;

  // Above desktop
  @media (min-width: ${({ theme }) => theme.viewport.largedesktop}) {
    max-width: 1400px;
  }
`;

export const StyledCalendarRight = styled.div`
  width: 8rem;
  background: red;
  flex-grow: 1;
`;

export const StyledCalendarHeader = styled.div`
  position: absolute;
  bottom: 100%;
  display: flex;
  width: 100%;
  margin: auto;
  text-align: center;
  background: lightblue;

  & span {
    font-family: ${({ theme }) => theme.font.serif};
    font-size: ${({ theme }) => theme.fontSize.xl};
    padding: ${({ theme }) => theme.spacing.sm};
    display: block;
    color: ${({ theme }) => theme.colors.body};
    width: 6rem;
  }
`;

export const StyledLeftHeader = styled.div`
  height: 100%;
  background: blue;
  width: 2.5rem;
  position: absolute;
  left: -2.5rem;
`;

export const StyledCalendarItem = styled.div`
  height: 6rem;
  width: 100%;
  box-sizing: content-box;
  background: ${({ hasNotes, theme }) =>
    hasNotes ? theme.colors.highlight : "#f7f7f7"};
  transition: 0.2s;
  outline: 1px solid #bbbbbb;

  &:hover {
    cursor: pointer;
    background: #f0f0f0;
    transition: 0.05s;
    outline-color: red;
    z-index: 2;
  }

  & span {
    font-family: ${({ theme }) => theme.font.serif};
    font-size: ${({ theme }) => theme.fontSize.xl};
    padding: ${({ theme }) => theme.spacing.sm};
    position: absolute;
    z-index: 3;
    display: block;
    color: ${({ theme }) => theme.colors.body};
  }
`;

export const StyledTooltip = styled.div`
  position: fixed;
  width: 20rem;
  height: auto;
  z-index: 9;
  min-height: 20rem;
  max-height: 30rem;
  background: #f7f7f7;
  border: 1px solid #cecece;
  display: ${({ showTooltip }) => (showTooltip ? "block" : "none")};
  animation: fadein 0.5s;

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  & div:first-child {
    font-family: ${({ theme }) => theme.font.serif};
    font-size: ${({ theme }) => theme.fontSize.xl};
    color: ${({ theme }) => theme.colors.body};
  }

  & div {
    padding: ${({ theme }) => theme.spacing.sm};
    color: ${({ theme }) => theme.colors.body};
  }
`;

export const StyledHabitTab = styled.div`
  height: 100%;
  outline: 1px solid #bbbbbb;
  background: ${({ isHightlighted, theme }) =>
    isHightlighted ? theme.colors.highlight : "#f7f7f7"};
  /* animation: ${({ isHightlighted }) =>
    isHightlighted ? "fadescalein 0.5s" : ""}; */

  @keyframes fadescalein {
    0% {
      /* opacity: 0; */
      /* transform: scale(100%); */
    }
    20% {
      /* transform: scale(110%); */
    }
    100% {
      /* opacity: 1; */
      /* transform: scale(100%); */
    }
  }

  &:hover {
    transition: 0.05s;
    outline-color: red;
    z-index: 2;
  }
`;

export const StyledCalendarHabitItem = styled(StyledCalendarItem)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
`;

export const StyledNoteForm = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 1rem;
  background: #f7f7f7;
  z-index: 9;
  outline: 1px solid #bbbbbb;
  animation: fadescalein 0.25s;

  @keyframes fadescalein {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  & h1 {
    text-align: center;
    margin-bottom: 1rem;
  }

  & form {
    height: calc(100% - 10rem);
  }

  & button {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
  }
`;
