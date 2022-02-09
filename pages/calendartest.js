import { useState } from "react";
import Switch from "react-switch";
import { withProtected } from "../src/hooks/route";

import CalendarTest from "../src/components/calendartest/CalendarTest";

import styled from "styled-components";

const Calendartest = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = (checked) => {
    setChecked(checked);
  };

  return (
    <>
      <CalendarTest />
      <SwitchContainer>
        <Switch onChange={handleChange} checked={checked} />
      </SwitchContainer>
    </>
  );
};

export default withProtected(Calendartest);

export const SwitchContainer = styled.label`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
`;
