import React, { useState, useEffect } from "react";
import axios from "axios";

import CalendarItem from "./CalendarItem";
import CalendarHabitItem from "./CalendarHabitItem";
import NewNoteForm from "./NewNoteForm";
import Tooltip from "../ui/Tooltip";

import {
  StyledCalendar,
  StyledCalendarHeader,
  StyledLeftHeader,
  StyledCalendarOuter,
  StyledCalendarRight,
  Flex,
} from "./Calendar.styled";

const data = [
  {
    hasNotes: true,
    notes:
      "Why do we quit?  Everytime we exert effort, noradrenaline is released.  At some point, enough is released that we quit.  Dopamine can lower those levels, increasing our tolerance for pain and ability to push further.  Self-rewarding can be used to achieve this.",
    id: 12345,
    date: 1,
  },
  {
    hasNotes: true,
    notes: "Lorem bla bla",
    date: 3,
    id: 123455,
  },
  {
    hasNotes: true,
    notes: "Gets all 'notes' 6mo before/after",
    date: 5,
    id: 1234555,
  },
  {
    hasNotes: true,
    notes: "Date highlight something something",
    date: 9,
    id: 12345555,
  },
  {
    hasNotes: true,
    notes: "BZZZZZ this is a note lol",
    date: 10,
    id: 1234512345,
  },
  {
    hasNotes: true,
    notes: "BZZZZZ this is a, learnt a lot of new shit today",
    date: 13,
    id: 12345123451,
  },
  {
    hasNotes: true,
    notes: "The code is getting a bit confusing .... lolz",
    date: 14,
    id: 1234512345111,
  },
  {
    hasNotes: true,
    notes: "The code is getting a bit confusing .... lolz",
    date: 15,
    id: 12345123451111,
  },
  {
    hasNotes: true,
    notes: "The code is getting a bit confusing .... lolz",
    date: 16,
    id: 123451234511111,
  },
  {
    hasNotes: true,
    notes: "The code is getting a bit confusing .... lolz",
    date: 17,
    id: 1234512345111111,
  },
  {
    hasNotes: true,
    notes: "The code is getting a bit confusing .... lolz",
    date: 18,
    id: 123451234544111,
  },
];

const dataHabitNames = [
  "Study",
  "Exercise",
  "Healthy Eating",
  "Morning Priming",
];

let dataHabits = [
  {
    habits: [false, false, true, true],
    date: 4,
    id: 123125399,
  },
  {
    habits: [true, true, true, false],
    date: 7,
    id: 123451234511112599,
  },
  {
    habits: [true, false, true, true],
    date: 8,
    id: 10991299,
  },
  {
    habits: [true, true, false, true],
    date: 9,
    id: 10910591199,
  },
];

const Calendar = ({ isHabitMode }) => {
  // @@    To-Do
  // @@    Data for calendar
  //            1) Gets all 'notes' 6mo before/after
  //            2) Remap over data on each page to highlight specific days

  const [tooltipData, setTooltipData] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);

  const [monthArrNotes, setMonthArrNotes] = useState([]);
  const [monthArrHabits, setMonthArrHabits] = useState([]);
  const [dummyItems, setDummyItems] = useState({});

  const [newFormData, setNewFormData] = useState(null);
  const [showNoteForm, setShowNoteForm] = useState(false);

  const date = new Date();
  const currMonth = date.getMonth();
  const currYear = date.getFullYear();
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  useEffect(() => {
    if (isHabitMode) setShowNoteForm(false);
  }, [isHabitMode]);

  // BLANK SLOTS: Create array of days of month depending on current date
  const createMonthArray = () => {
    const getDaysInMonth = function (month, year) {
      return new Date(year, month, 0).getDate();
    };

    const monthArrBlank = Array.from(
      Array(getDaysInMonth(currMonth, currYear)).keys()
    );

    const monthArrWithIds = monthArrBlank.map((day) => {
      return { id: currMonth + currYear + day };
    });

    return monthArrWithIds;
  };

  // Create blank CalendarItems for start/end
  const createDummyItems = () => {
    const firstDay = new Date(currYear, currMonth, 1).toString().slice(0, 3);
    const dayIndex = weekdays.findIndex((d) => d === firstDay);

    let endDays;
    if (dayIndex === 0) endDays = 4;
    if (dayIndex === 1) endDays = 3;
    if (dayIndex === 2) endDays = 2;
    if (dayIndex === 3) endDays = 1;
    if (dayIndex === 4) endDays = 0;
    if (dayIndex === 5) endDays = 6;
    if (dayIndex === 6) endDays = 5;

    const itemsAtStart = Array.from(Array(dayIndex).keys());
    const itemsAtEnd = Array.from(Array(endDays).keys());

    setDummyItems({ itemsAtStart, itemsAtEnd });
  };

  // NOTES SLOTS: Fills BLANK SLOTS with notes objects
  const createNotesArr = () => {
    let monthArrBlank = createMonthArray();

    monthArrBlank.map((_, i) => {
      monthArrBlank[i].hasNotes = false;
      monthArrBlank[i].date = i + 1;
    });

    data.map((item) => {
      monthArrBlank[item.date - 1].hasNotes = true;
      monthArrBlank[item.date - 1].notes = item.notes;
    });

    setMonthArrNotes(monthArrBlank);
  };

  // HABIT SLOTS: Fills BLANK SLOTS with habit objects
  const createHabitsArr = () => {
    const monthArrBlank = createMonthArray();

    monthArrBlank.map((_, i) => {
      monthArrBlank[i].habits = [false, false, false, false];
      monthArrBlank[i].date = i + 1;
    });

    dataHabits.map((item) => {
      monthArrBlank[item.date - 1].habits = item.habits;
    });

    setMonthArrHabits(monthArrBlank);
  };

  useEffect(() => {
    // @@    To-Do
    // @@    Prevent habit tabs from using animation on first load
    //            1) Add a state (isLoaded) for the habit tabs
    //            2) When isLoaded is false, animation: none
    //            3) * think about when it's invoked

    createDummyItems();
    createNotesArr();
    createHabitsArr();
  }, []);

  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // setDayHandler: set selected data for tooltip display
  const setDayHandler = (day) => {
    if (!isHabitMode) setTooltipData(day);
  };

  // positionTooltipHandler: get cursor coords for tooltip display
  const positionTooltipHandler = (x, y) => {
    const tooltip = document.querySelector(".tooltip");
    tooltip.style.top = `${y + 25}px`;
    tooltip.style.left = `${x + 25}px`;
  };

  // toggleHabit: highlight/un-highlight habit
  const toggleHabit = (habit) => {
    const { date, habitIndex } = habit;

    const selectedHabit = dataHabits.find((habit) => habit.date === date);

    if (!selectedHabit) {
      let newHabit = {
        habits: [false, false, false, false],
        date: date,
        id: date + currMonth + currYear,
      };
      newHabit.habits[habitIndex] = true;
      dataHabits.push(newHabit);
    } else {
      selectedHabit.habits[habitIndex] = !selectedHabit.habits[habitIndex];
    }

    createHabitsArr();
  };

  return (
    <>
      <Tooltip
        tooltipData={tooltipData}
        showTooltip={showTooltip}
        isHabitMode={isHabitMode}
      />
      <div>
        <StyledCalendarOuter>
          <StyledCalendarHeader>
            {weekdays.map((d) => (
              <span key={d + 3}>{d.toLowerCase()}</span>
            ))}
          </StyledCalendarHeader>

          <StyledLeftHeader></StyledLeftHeader>
          <Flex>
            <StyledCalendar id="calendar">
              {showNoteForm && (
                <NewNoteForm
                  newFormData={newFormData}
                  setShowNoteForm={setShowNoteForm}
                />
              )}
              {dummyItems.itemsAtStart?.map((x, i) => (
                <CalendarItem key={x + i} dummy={true} />
              ))}

              {isHabitMode && monthArrNotes && monthArrHabits
                ? monthArrHabits.map((day) => {
                    return (
                      <CalendarHabitItem
                        key={day.id}
                        day={day}
                        toggleHabit={toggleHabit}
                      />
                    );
                  })
                : monthArrNotes.map((day) => {
                    return (
                      <CalendarItem
                        day={day}
                        key={day.id}
                        setDayHandler={setDayHandler}
                        positionTooltipHandler={positionTooltipHandler}
                        setShowTooltip={setShowTooltip}
                        setNewFormData={setNewFormData}
                        setShowNoteForm={setShowNoteForm}
                      />
                    );
                  })}

              {dummyItems.itemsAtEnd?.map((x, i) => (
                <CalendarItem key={x + i} dummy={true} />
              ))}
            </StyledCalendar>
            <StyledCalendarRight></StyledCalendarRight>
          </Flex>
        </StyledCalendarOuter>
      </div>
    </>
  );
};

export default Calendar;
