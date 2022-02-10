import { useState } from "react";
import Switch from "react-switch";
import { withProtected } from "../src/hooks/route";

import Calendar from "../src/components/calendar/Calendar";

import styled from "styled-components";

const CalendarPage = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = (checked) => {
    setChecked(checked);
  };

  return (
    <>
      <Calendar />
      <SwitchContainer>
        <Switch onChange={handleChange} checked={checked} />
      </SwitchContainer>
    </>
  );
};

export default withProtected(CalendarPage);

export const SwitchContainer = styled.label`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
`;
