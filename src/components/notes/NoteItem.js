import { StyledNote } from "./Notes.styled";
import { Button } from "../styles/Button.styled";

const NoteItem = () => {
  return (
    <StyledNote>
      <div>
        <h2>Mon 19 Apr</h2>
        <Button>Edit</Button>
      </div>
      <div>
        <p>
          Why do we quit? Everytime we exert effort, noradrenaline is released.
          At some point, enough is released that we quit. Dopamine can lower
          those levels, increasing our tolerance for pain and ability to push
          further. Self-rewarding can be used to achieve this.
        </p>
        <p>
          At some point, enough is released that we quit. Dopamine can lower
          those levels, increasing our tolerance.
        </p>
        <ul>
          <li>Interesting enough</li>
          <li>Increasing our tolerance</li>
          <li>Self-rewarding can be used</li>
        </ul>
      </div>
    </StyledNote>
  );
};

export default NoteItem;
