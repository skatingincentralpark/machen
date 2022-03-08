import React from "react";

import { StyledCalendarRightBar, AllNotesButton } from "./Calendar.styled";

const CalendarRightBar = ({ onClick }) => {
  return (
    <StyledCalendarRightBar>
      <div>
        <h2>Mon 19 Apr</h2>
        <p>~ This is a WIP section!</p>
        <p>
          Dopamine can lower those levels, increasing our tolerance for pain and
          ability to push further. Self-rewarding can be used to achieve this.
        </p>
        <p>
          Dopamine can lower those levels, increasing our tolerance for pain and
          ability to push further. Self-rewarding can be used to achieve this.
        </p>
        <p>
          <b>Dopamine can lower those levels</b>, increasing our tolerance for
          pain and ability to push further. Self-rewarding can be used to
          achieve this.
        </p>
        <ul>
          <li>Something</li>
          <li>Apple</li>
          <li>Oranges and Bananas</li>
          <li>Coffee</li>
        </ul>
        <p>
          Marvelously clear-fretted in the unsmoked air, the Abbey rose,
          <i>silver-grey</i>. It stood detached by the serenity of age from the
          ephemeral growths around it. It was solid on a foundation of
          centuries, destined, perhaps, for centuries yet to preserve within it
          the monuments to those whose work was now all destroyed
        </p>
      </div>
      <AllNotesButton onClick={onClick}>All Notes</AllNotesButton>
    </StyledCalendarRightBar>
  );
};

export default CalendarRightBar;
