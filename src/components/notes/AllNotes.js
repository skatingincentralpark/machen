import NoteItem from "./NoteItem";
import CloseButton from "../ui/CloseButton";

const AllNotes = ({ onClose }) => {
  return (
    <div>
      <CloseButton onClick={onClose} />
      <NoteItem />
      <NoteItem />
      <NoteItem />
      <NoteItem />
      <NoteItem />
      <NoteItem />
    </div>
  );
};

export default AllNotes;
