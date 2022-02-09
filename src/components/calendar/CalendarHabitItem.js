import React from "react";

import HabitTab from "./HabitTab";

import { StyledCalendarHabitItem } from "./Calendar.styled";

const CalendarHabitItem = ({ day, toggleHabit }) => {
  const { habits, date } = day;

  const getIndexHandler = (habitIndex) => {
    toggleHabit({ date, habitIndex });
  };

  return (
    <StyledCalendarHabitItem>
      <span>{date}</span>
      {habits.map((habit, i) => {
        return (
          <HabitTab
            isHightlighted={habit}
            index={i}
            key={date + i + 10}
            getIndexHandler={getIndexHandler}
          />
        );
      })}
    </StyledCalendarHabitItem>
  );
};

export default CalendarHabitItem;
