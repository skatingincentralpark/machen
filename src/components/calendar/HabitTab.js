import React from "react";

import { StyledHabitTab } from "./Calendar.styled";

const HabitTab = ({ isHightlighted, getIndexHandler, index }) => {
  return (
    <StyledHabitTab
      data-index={index}
      isHightlighted={isHightlighted}
      onClick={() => getIndexHandler(index)}
    />
  );
};

export default HabitTab;
