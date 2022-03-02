import { useState, useEffect, useRef, useCallback } from "react";
import { CSSTransition } from "react-transition-group";

import {
  StyledCalendarItem,
  StyledCalendarItems,
  StyledYearSelector,
} from "./Calendar.styled";
import { StyledPopup, StyledAllNotes } from "../notes/Notes.styled";

import CalendarLeftBar from "./CalendarLeftBar";
import NoteForm from "../notes/NoteForm";
import YearSelector from "./YearSelector";
import AllNotes from "../notes/AllNotes";

const CalendarItems = ({
  allMonthNotes,
  setAllMonthNotes,
  showAllNotes,
  setShowAllNotes,
}) => {
  // @@     UI states
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [showYearSelector, setShowYearSelector] = useState(false);

  // @@     Date states
  const [date, setDate] = useState({ month: 1, year: 2022 });
  const [selectedDate, setSelectedDate] = useState(null); // for note form
  const [dummyItemsStart, setDummyStart] = useState([]);
  const [dummyItemsEnd, setDummyEnd] = useState([]);
  const [items, setItems] = useState([]);

  // @@     Date states
  const [currNote, setCurrNote] = useState(undefined); // current note being edited

  // @@     Node refs
  const nodeRef1 = useRef(null);
  const nodeRef2 = useRef(null);
  const nodeRef3 = useRef(null);

  // @@     Create Calendar
  // @@     Creates 3 arrays, dummy start, actual items (with notes/habits if exists), dummy end
  const createCalendar = useCallback(
    (year, month) => {
      let mon = month;
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
        if (start + mid + end !== 35) {
          end += 7;
        }
        end += 7;
      }
      let midArr = [];

      // create [{date: 1}, {date: 2}, {date: 3} ...]
      for (var i = 0; i < mid; i++) {
        midArr.push({
          date: i + 1,
        });
      }

      const d1 = new Date(year, month);
      const currentMonthNote = allMonthNotes?.find((n) => +n.created === +d1);

      if (currentMonthNote) {
        currentMonthNote.notes.forEach((note) => {
          midArr[note.date.getDate() - 1].note = note;
        });
      }

      setDummyStart(Array.from(Array(start).keys()));
      setDummyEnd(Array.from(Array(end).keys()));
      setItems(midArr);
    },
    [allMonthNotes]
  );

  function getDay(date) {
    // get day number from 0 (monday) to 6 (sunday)
    let day = date.getDay();
    if (day == 0) day = 7; // make Sunday (0) the last day
    return day - 1;
  }

  useEffect(() => {
    createCalendar(date.year, date.month);
  }, [createCalendar, date.year, date.month, allMonthNotes]);

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

  function showNoteFormHandler(year = null, month = null, day, note) {
    const d = new Date(year || date.year, month || date.month, day);
    setCurrNote(note);
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
            onClose={() => {
              setShowNoteForm(false);
              setCurrNote(null);
            }}
            currNote={currNote}
            setAllMonthNotes={setAllMonthNotes}
            date={date}
            selectedDate={selectedDate}
          />
        </StyledPopup>
      </CSSTransition>

      <CSSTransition
        in={showAllNotes}
        timeout={200}
        classNames="fadeSlideDown"
        unmountOnExit
        nodeRef={nodeRef3}
      >
        <StyledAllNotes ref={nodeRef3}>
          <AllNotes
            showNoteFormHandler={showNoteFormHandler}
            onClose={() => setShowAllNotes(false)}
            allMonthNotes={allMonthNotes}
          />
        </StyledAllNotes>
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
              onClick={() => showNoteFormHandler(null, null, i + 1, item.note)}
              hasNote={!!item.note}
            >
              <span>{item.date}</span>
            </StyledCalendarItem>
          );
        })}

        {dummyItemsEnd?.map((x, i) => (
          <StyledCalendarItem key={i + "end"} dummy={true}>
            <span>&nbsp;</span>
          </StyledCalendarItem>
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
