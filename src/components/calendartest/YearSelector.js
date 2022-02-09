import React from "react";

import { StyledButton } from "../styles/Button.styled";

const YearSelector = ({ changeYear }) => {
  const years = [2022, 2021, 2020, 2019];
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
