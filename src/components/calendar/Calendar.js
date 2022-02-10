import { useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";

import { CalendarGrid, StyledCalendarTopBar } from "./Calendar.styled";
import { StyledAllNotes } from "../notes/Notes.styled";

import CalendarItems from "./CalendarItems";
import CalendarRightBar from "./CalendarRightBar";
import AllNotes from "../notes/AllNotes";

import useAuth from "../../hooks/auth";

const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const Calendar = () => {
  // Popup window states
  const [showAllNotes, setShowAllNotes] = useState(false);

  // Calendar State
  const [habits, setHabits] = useState([]);
  const [notes, setNotes] = useState([]);
  const [currNote, setCurrNote] = useState({}); // current note being edited

  // UseAuth
  const { user } = useAuth();

  // To prevent findDOMNode depreciation warnings from react-transition-group
  const nodeRef1 = useRef(null);

  return (
    <CalendarGrid>
      <StyledCalendarTopBar>
        {weekdays.map((d) => (
          <span key={d + 3}>{d}</span>
        ))}
      </StyledCalendarTopBar>

      <CSSTransition
        in={showAllNotes}
        timeout={200}
        classNames="fadeSlideDown"
        unmountOnExit
        nodeRef={nodeRef1}
      >
        <StyledAllNotes ref={nodeRef1}>
          <AllNotes onClose={() => setShowAllNotes(false)} />
        </StyledAllNotes>
      </CSSTransition>

      <CalendarRightBar onClick={() => setShowAllNotes(true)} />

      <CalendarItems />
    </CalendarGrid>
  );
};

export default Calendar;
