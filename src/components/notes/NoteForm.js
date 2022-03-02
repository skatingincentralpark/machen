import {
  doc,
  arrayUnion,
  arrayRemove,
  writeBatch,
  updateDoc,
  getDocs,
  addDoc,
  collection,
  Timestamp,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../utils/firebase";
import useAuth from "../../hooks/auth";

import TextEditor from "./TextEditor";
import { StyledNoteForm } from "./Notes.styled";

const NoteForm = ({
  onClose,
  date,
  selectedDate,
  currNote,
  setAllMonthNotes,
}) => {
  const { user } = useAuth();

  const firstDayOfMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    1
  );

  // @@     Save Note
  const onSave = async (rawContentState) => {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    try {
      // 1) Create new note (single)
      const newNote = {
        rawContent: rawContentState,
        date: Timestamp.fromDate(selectedDate).toDate(),
        created: Timestamp.fromDate(today).toDate(),
      };

      // 2) Check if monthNotes exists for selected month
      const q = query(
        collection(db, "monthNotes"),
        where("created", "==", firstDayOfMonth)
      );
      const querySnapshot = await getDocs(q);
      const ids = querySnapshot.docs.map((doc) => doc.id);
      const docs = querySnapshot.docs.map((doc) => doc.data());

      // 2.1) If note for that date exists => update that note (remove and add)
      const existingNote = docs[0]?.notes?.find(
        (note) => +note.date === +Timestamp.fromDate(selectedDate)
      );

      if (existingNote) {
        const monthNotesRef = doc(db, "monthNotes", ids[0]);
        const batch = writeBatch(db);

        batch.update(monthNotesRef, { notes: arrayRemove(existingNote) });
        batch.update(monthNotesRef, { notes: arrayUnion(newNote) });

        await batch.commit();

        setAllMonthNotes((prevAllMonthNotes) => {
          let noteIndex;
          let newState = prevAllMonthNotes.map((monthNote) => {
            if (+monthNote.created === +firstDayOfMonth) {
              noteIndex = monthNote.notes.findIndex(
                (note) => +note.date === +selectedDate
              );
            }
            return monthNote;
          });

          const monthNoteIndex = newState.findIndex(
            (monthNote) =>
              monthNote.created.toString() === firstDayOfMonth.toString()
          );

          newState[monthNoteIndex].notes[noteIndex] = newNote;

          return newState;
        });

        return;
      }

      // 2.2) If monthNotes exists => push new note to array
      if (ids.length > 0 && !existingNote) {
        const monthNotesRef = doc(db, "monthNotes", ids[0]);

        await updateDoc(monthNotesRef, {
          notes: arrayUnion(newNote),
        });

        setAllMonthNotes((prevAllMonthNotes) => {
          let newState = prevAllMonthNotes.map((x) => x);
          const monthNoteIndex = prevAllMonthNotes.findIndex(
            (monthNote) =>
              monthNote.created.toString() === firstDayOfMonth.toString()
          );

          newState[monthNoteIndex].notes.push(newNote);
          return newState;
        });

        return;
      }

      // 3) Create new month note (group of notes)
      if (ids.length === 0) {
        const newMonthNotes = {
          user: user.uid,
          notes: [newNote],
          created: Timestamp.fromDate(firstDayOfMonth).toDate(),
        };

        await addDoc(collection(db, "monthNotes"), newMonthNotes);

        setAllMonthNotes((prevAllMonthNotes) => [
          ...prevAllMonthNotes,
          newMonthNotes,
        ]);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  console.log(currNote);

  // @@     Delete Note
  const onDelete = async () => {
    alert("Are you sure you want to delete this note?");

    if (!currNote) return;

    try {
      // 1) Find monthNote for selected month
      const q = query(
        collection(db, "monthNotes"),
        where("created", "==", firstDayOfMonth)
      );

      const querySnapshot = await getDocs(q);
      const ids = querySnapshot.docs.map((doc) => doc.id);
      const docs = querySnapshot.docs.map((doc) => doc.data());

      // 2) Find note to delete
      const noteToDelete = docs[0]?.notes?.find(
        (note) => +note.date === +Timestamp.fromDate(selectedDate)
      );

      const monthNotesRef = doc(db, "monthNotes", ids[0]);

      // 3) Delete from array
      await updateDoc(monthNotesRef, {
        notes: arrayRemove(noteToDelete),
      });

      // 4) Remove note from the state
      setAllMonthNotes((prevAllMonthNotes) => {
        let noteIndex;
        let newState = prevAllMonthNotes.map((monthNote) => {
          if (+monthNote.created === +firstDayOfMonth) {
            noteIndex = monthNote.notes.findIndex(
              (note) => +note.date === +selectedDate
            );
          }
          return monthNote;
        });

        const monthNoteIndex = newState.findIndex(
          (monthNote) =>
            monthNote.created.toString() === firstDayOfMonth.toString()
        );

        newState[monthNoteIndex].notes.splice([noteIndex], 1);

        return newState;
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <StyledNoteForm>
        <TextEditor
          currNote={currNote}
          onClose={onClose}
          onSave={onSave}
          onDelete={onDelete}
          date={date}
          selectedDate={selectedDate}
        />
      </StyledNoteForm>
    </>
  );
};

export default NoteForm;
