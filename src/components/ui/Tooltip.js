import React from "react";

import { StyledTooltip } from "../calendar/Calendar.styled";

const Tooltip = ({ tooltipData, showTooltip, isHabitMode }) => {
  // place={place}
  // type={type}
  // effect={effect}

  return (
    <StyledTooltip showTooltip={showTooltip} className="tooltip">
      <div>{tooltipData?.date} Jan Thu</div>
      <hr />
      <div>
        Notes:
        <br />
        {tooltipData?.notes}
      </div>
    </StyledTooltip>
  );
};

export default Tooltip;
