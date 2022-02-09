import React from "react";

import { StyledCalendarItem } from "./Calendar.styled";

const CalendarItem = ({
  day,
  setDayHandler,
  positionTooltipHandler,
  setShowTooltip,
  setNewFormData,
  setShowNoteForm,
  dummy,
}) => {
  if (dummy) return <StyledCalendarItem dummy className="calendar-item" />;

  const { date, hasNotes, notes } = day;

  // Tooltip Feature
  const onMouseMoveHandler = (e) => {
    if (!hasNotes) return;
    positionTooltipHandler(e.pageX, e.pageY);
  };

  const onMouseEnterHandler = (e) => {
    if (!hasNotes) return;
    setShowTooltip(true);
    setDayHandler({ date, notes });
  };

  const onMouseLeaveHandler = () => {
    if (!hasNotes) return;
    setShowTooltip(false);
  };

  // New Note Form Handler
  const newNoteFormHandler = () => {
    setNewFormData({ date, notes });
    setShowNoteForm((x) => !x);
  };

  return (
    <StyledCalendarItem
      onMouseMove={onMouseMoveHandler}
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}
      onClick={newNoteFormHandler}
      data-hasnotes={hasNotes}
      data-tip={notes}
      hasNotes={hasNotes}
      className="calendar-item"
    >
      <span>{date}</span>
    </StyledCalendarItem>
  );
};

export default CalendarItem;
