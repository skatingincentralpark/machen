import React from "react";

import { StyledButton } from "../styles/Button.styled";

const YearSelector = ({ changeYear }) => {
  const d = new Date();
  const currYear = d.getFullYear();

  let years = [];

  // Create array of years up to 2021
  for (var i = currYear; i >= 2021; i--) {
    years.push(i);
  }

  return (
    <div>
      {years.map((year) => (
        <StyledButton onClick={() => changeYear(year)} key={year}>
          {year}
        </StyledButton>
      ))}
    </div>
  );
};

export default YearSelector;
