import NoteItem from "./NoteItem";
import CloseButton from "../ui/CloseButton";
import { useState } from "react";

const AllNotes = ({ onClose, allMonthNotes, showNoteFormHandler }) => {
  const [allNotes, setAllNotes] = useState(
    allMonthNotes.map((mN) => mN.notes).flat()
  );

  return (
    <div>
      <CloseButton onClick={onClose} />
      {allNotes.map((note) => (
        <NoteItem note={note} key={+note.date} onEdit={showNoteFormHandler} />
      ))}
    </div>
  );
};

export default AllNotes;
