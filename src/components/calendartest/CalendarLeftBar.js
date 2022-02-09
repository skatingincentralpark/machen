import React from "react";

import { StyledCalendarLeftBar } from "./Test.styled";
import { LeftBarButton } from "../styles/Button.styled";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const CalendarLeftBar = ({ onClick, changeMonth, date }) => {
  return (
    <StyledCalendarLeftBar>
      {months.map((m, i) => (
        <LeftBarButton
          noBorderRadius
          key={m}
          isSelected={date.month === i}
          onClick={() => {
            changeMonth(i);
          }}
        >
          {m[0]}
        </LeftBarButton>
      ))}

      <LeftBarButton onClick={onClick} noBorderRadius>
        <span>2022</span>
      </LeftBarButton>
    </StyledCalendarLeftBar>
  );
};

export default CalendarLeftBar;
