import { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";

import {
  StyledCalendarItem,
  StyledCalendarItems,
  StyledYearSelector,
} from "./Test.styled";
import { StyledPopup } from "../notes/Notes.styled";

import CalendarLeftBar from "./CalendarLeftBar";
import NoteForm from "../notes/NoteForm";
import YearSelector from "./YearSelector";

const CalendarItems = () => {
  // UI states
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [showYearSelector, setShowYearSelector] = useState(false);

  // Date states
  const [date, setDate] = useState({ month: 1, year: 2022 });
  const [selectedDate, setSelectedDate] = useState(null); // for note form
  const [dummyItemsStart, setDummyStart] = useState([]);
  const [dummyItemsEnd, setDummyEnd] = useState([]);
  const [items, setItems] = useState([]);

  // Node refs
  const nodeRef1 = useRef(null);
  const nodeRef2 = useRef(null);

  function createCalendar(year, month) {
    let mon = month; // months in JS are 0..11, not 1..12
    let d = new Date(year, mon);

    let start = 0;
    let mid = 0;
    let end = 0;

    for (let i = 0; i < getDay(d); i++) {
      start++;
    }

    while (d.getMonth() == mon) {
      mid++;
      d.setDate(d.getDate() + 1);
    }

    if (getDay(d) != 0) {
      for (let i = getDay(d); i < 7; i++) {
        end++;
      }
    }

    if (start + mid + end !== 42) {
      end += 7;
    }

    setDummyStart(Array.from(Array(start).keys()));
    setDummyEnd(Array.from(Array(end).keys()));
    setItems(Array.from(Array(mid).keys()));
  }

  function getDay(date) {
    // get day number from 0 (monday) to 6 (sunday)
    let day = date.getDay();
    if (day == 0) day = 7; // make Sunday (0) the last day
    return day - 1;
  }

  useEffect(() => {
    createCalendar(date.year, date.month);
  }, [date.year, date.month]);

  function changeMonth(month) {
    if (month === date.month) return;

    let d = new Date(date.year, month);

    setDate({ ...date, month: d.getMonth() });
  }

  function changeYear(year) {
    if (year === date.year) return;

    let d = new Date(year, 1);

    setShowYearSelector(false);
    setDate({ month: 0, year: d.getFullYear() });
  }

  function showNoteFormHandler(day) {
    const d = new Date(date.year, date.month, day);

    setShowNoteForm(true);
    setSelectedDate(d);
  }

  return (
    <>
      <CSSTransition
        in={showNoteForm}
        timeout={200}
        classNames="fadeSlideDown"
        unmountOnExit
        nodeRef={nodeRef1}
      >
        <StyledPopup ref={nodeRef1}>
          <NoteForm
            onClose={() => setShowNoteForm(false)}
            date={date}
            selectedDate={selectedDate}
          />
        </StyledPopup>
      </CSSTransition>

      <CSSTransition
        in={showYearSelector}
        timeout={200}
        classNames="fadeSlideUp"
        unmountOnExit
        nodeRef={nodeRef2}
      >
        <StyledYearSelector ref={nodeRef2}>
          <YearSelector changeYear={changeYear} />
        </StyledYearSelector>
      </CSSTransition>

      <StyledCalendarItems>
        {dummyItemsStart?.map((x, i) => (
          <StyledCalendarItem key={i + "start"} dummy={true} />
        ))}

        {items?.map((item, i) => {
          return (
            <StyledCalendarItem
              key={i + "mid"}
              onClick={() => showNoteFormHandler(i + 1)}
            >
              <span>{i + 1}</span>
            </StyledCalendarItem>
          );
        })}

        {dummyItemsEnd?.map((x, i) => (
          <StyledCalendarItem key={i + "end"} dummy={true} />
        ))}
      </StyledCalendarItems>

      <CalendarLeftBar
        date={date}
        changeMonth={changeMonth}
        onClick={() => {
          setShowYearSelector((prev) => !prev);
        }}
      />
    </>
  );
};

export default CalendarItems;
