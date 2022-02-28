import { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebase";

import { CalendarGrid, StyledCalendarTopBar } from "./Calendar.styled";

import CalendarItems from "./CalendarItems";
import CalendarRightBar from "./CalendarRightBar";

import useAuth from "../../hooks/auth";

const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const Calendar = () => {
  // Popup window states
  const [showAllNotes, setShowAllNotes] = useState(false);

  // Calendar State
  const [habits, setHabits] = useState([]);
  const [allMonthNotes, setAllMonthNotes] = useState([]);

  // UseAuth
  const { user } = useAuth();

  // Firestore (getting all monthNotes)
  useEffect(() => {
    (async () => {
      try {
        const monthNotesRef = query(
          collection(db, "monthNotes"),
          where("user", "==", user.uid)
        );

        const querySnapshot = await getDocs(monthNotesRef);

        let arr = [];

        querySnapshot.forEach((doc) => {
          // Create array of all monthNotes and converting Timestamp to Date obj
          let monthNote = doc.data();

          monthNote.created = monthNote.created.toDate();

          monthNote.notes.forEach((note, i) => {
            monthNote.notes[i].created = note.created.toDate();
            monthNote.notes[i].date = note.date.toDate();
          });
          arr.push(monthNote);
        });

        setAllMonthNotes(arr);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <CalendarGrid>
      <StyledCalendarTopBar>
        {weekdays.map((d) => (
          <span key={d + 3}>{d}</span>
        ))}
      </StyledCalendarTopBar>

      <CalendarRightBar onClick={() => setShowAllNotes(true)} />

      <CalendarItems
        allMonthNotes={allMonthNotes}
        setAllMonthNotes={setAllMonthNotes}
        showAllNotes={showAllNotes}
        setShowAllNotes={setShowAllNotes}
      />
    </CalendarGrid>
  );
};

export default Calendar;
