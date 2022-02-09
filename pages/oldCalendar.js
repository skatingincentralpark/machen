import { useState } from "react";

import Calendar from "../src/components/calendar/Calendar";

import { StyledTempButton } from "../src/components/styles/Button.styled";
import { StyledHabitList } from "../src/components/styles/Container.styled";

const OldCalendarPage = () => {
  const [isHabitMode, setIsHabitMode] = useState(false);

  return (
    <>
      <StyledTempButton onClick={() => setIsHabitMode((x) => !x)}>
        {isHabitMode ? "Habits Mode" : "Daily Notes"}
      </StyledTempButton>

      {isHabitMode && (
        <StyledHabitList>
          <li>Habits:</li>
          <li>Study</li>
          <li>Exercise</li>
          <li>Healthy Eating</li>
          <li>Morning Priming</li>
        </StyledHabitList>
      )}

      <Calendar isHabitMode={isHabitMode} />
    </>
  );
};

export default OldCalendarPage;
